import { useContext, useState } from "react";
import SearchIcon from "./SVGIcons/SearchIcon";
import SendIcon from "./SVGIcons/SendIcon";
import { ImageContext, SearchContext } from "../context";
import StopIcon from "./SVGIcons/StopIcon";
import TemplateIcon from "./SVGIcons/TemplateIcon";
import { generateRandomPrompt } from "../utils";

export default function SearchInput() {
  const { setSearchParams } = useContext(SearchContext);
  const { setPressEnter, setPageStatus } = useContext(ImageContext);
  const [prompt, setPrompt] = useState("");
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);

  const promptTemplates = generateRandomPrompt();
  const handleSearchInput = (e) => {
    setPrompt(e.target.value);
    if (hasTriggered) {
      setHasTriggered(false);
      setPressEnter(false);
      setPageStatus("empty");
    }
  };

  const handleSend = () => {
    if (hasTriggered) return;
    if (prompt.trim() === "") {
      return;
    }
    setSearchParams((prev) => ({
      ...prev,
      prompt: prompt,
    }));
    setPressEnter(true);
    setPageStatus("loading");
    setHasTriggered(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend();
    }
  };

  const handleStop = () => {
    setPressEnter(false);
    setPageStatus("empty");
    setHasTriggered(false);
    setPrompt("");
  };

  return (
    <div className="mb-8">
      <div className="relative rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900/10 backdrop-blur-sm h-28">
        <div className="flex items-center">
          <div className="pl-5 pe-2">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Create with Prompts"
            className="outline-none w-full py-4 px-2 bg-transparent text-white placeholder-zinc-400 text-lg"
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
            value={prompt}
          />
          <button
            className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-3 mr-1 rounded-md absolute left-0 bottom-0 w-32 flex items-center justify-center h-10 ms-6 mb-2 cursor-pointer"
            onClick={() => setShowTemplate(!showTemplate)}
          >
            <TemplateIcon />
            <span className="ps-2">Templates</span>
          </button>
          {hasTriggered ? (
            <button
              className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-3 mr-1 rounded-full absolute right-0 bottom-0 cursor-pointer"
              onClick={handleStop}
            >
              <StopIcon />
            </button>
          ) : (
            <button
              className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-3 mr-1 rounded-full absolute right-0 bottom-1 cursor-pointer"
              onClick={handleSend}
            >
              <SendIcon />
            </button>
          )}
        </div>
      </div>
      {showTemplate && (
        <div className="border border-zinc-700 transition-all duration-300 ease-in-out h-50 overflow-y-auto rounded-lg mt-2 bg-zinc-900/10 backdrop-blur-sm">
          <div className="text-white">
            {promptTemplates.map((template, idx) => (
              <div
                key={idx}
                className="cursor-pointer hover:bg-zinc-800 py-2 px-4"
                onClick={() => {
                  setPrompt(template);
                  setShowTemplate(false);
                  setPageStatus("empty");
                  setHasTriggered(false);
                  setPressEnter(false);
                }}
              >
                {template}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
