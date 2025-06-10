import { useContext, useEffect, useState } from "react";
import { ImageContext, SearchContext } from "../context";

export default function SettingsPanel() {
  const { searchParams, setSearchParams } = useContext(SearchContext);
  const { setPageStatus } = useContext(ImageContext);
  const [models, setModels] = useState([]);
  const [aspectRatio, setAspectRatio] = useState("1:1");

  const ratio = ["1:1", "16:9", "4:3", "3:2"];

  useEffect(() => {
    let isMounted = true;

    fetch("https://image.pollinations.ai/models")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setModels(data);
          setSearchParams((prev) => ({
            ...prev,
            model: data[0],
          }));
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load models:", err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]:
        name === "height" || name === "width" || name === "seed"
          ? parseInt(value, 10)
          : value,
    }));
    setPageStatus("empty");
  };

  const handleAspectRatioClick = (ratio) => {
    setAspectRatio(ratio);
    const [w, h] = ratio.split(":").map(Number);

    const baseSize = searchParams.width;
    const scale = baseSize / Math.max(w, h);
    const width = Math.round(w * scale);
    const height = Math.round(h * scale);

    setSearchParams((prev) => ({
      ...prev,
      width,
      height,
    }));
    setPageStatus("empty");
  };

  return (
    <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Advanced Settings</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-zinc-500 mb-1"
          >
            Model
          </label>
          <select
            id="model"
            name="model"
            className="w-full px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            onChange={handleChange}
            value={searchParams.model}
          >
            {models.map((model, idx) => (
              <option key={idx} value={model} className="bg-zinc-900">
                {model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="seed"
            className="block text-sm font-medium text-zinc-500 mb-1"
          >
            Seed (for reproducible results)
          </label>
          <input
            type="number"
            id="seed"
            name="seed"
            disabled={true}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Random"
          />
        </div>

        <div>
          <label
            htmlFor="width"
            className="block text-sm font-medium text-zinc-500 mb-1"
          >
            Width
          </label>
          <input
            type="number"
            id="width"
            name="width"
            value={searchParams.width}
            onChange={handleChange}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="height"
            className="block text-sm font-medium text-zinc-500 mb-1"
          >
            Height
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={searchParams.height}
            onChange={handleChange}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-500 mb-1">
            Aspect Ratio Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {ratio.map((ratio, idx) => (
              <button
                key={idx}
                onClick={() => handleAspectRatioClick(ratio)}
                className={`w-[45px] py-3 text-xs border border-zinc-700/70 rounded-md hover:bg-zinc-800 hover:border-zinc-800 transition-colors cursor-pointer ${
                  aspectRatio === ratio ? "bg-zinc-800" : "bg-zinc-900/10 "
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
