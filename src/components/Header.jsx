import { useContext } from "react";
import logo from "../assets/logo.svg";
import { PageContext } from "../context";
export default function Header() {
  const { route, setRoute } = useContext(PageContext);

  return (
    <header className="flex items-center mb-12 justify-between">
      <div className="flex items-center">
        <img
          src={logo}
          className="h-10 cursor-pointer"
          onClick={() => setRoute("create")}
        />
      </div>
      <ul className="ml-4 text-sm text-zinc-400 flex gap-8">
        <span
          className={`hover:text-zinc-200 cursor-pointer transition-all ${
            route === "create" ? "text-zinc-200" : ""
          }`}
          onClick={() => setRoute("create")}
        >
          Create Image
        </span>
        <span
          className={`hover:text-zinc-200 cursor-pointer transition-all ${
            route === "download" ? "text-zinc-200" : ""
          }`}
          onClick={() => setRoute("download")}
        >
          Downloaded
        </span>
      </ul>
    </header>
  );
}
