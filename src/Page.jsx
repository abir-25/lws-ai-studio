import { useContext } from "react";
import BGGradient from "./components/BGGradient";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { PageContext } from "./context";
import DownloadPage from "./components/DownloadPage";

export default function Page() {
  const { route } = useContext(PageContext);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />
      <BGGradient />
      <main className="relative z-10">
        <h2 className="text-4xl font-bold mb-8 items-center flex">
          {route === "create"
            ? "Let's create a masterpiece, Alvian!"
            : "Downloaded"}
          <span className="text-2xl"> 👋</span>
        </h2>
        {route === "create" ? <HomePage /> : <DownloadPage />}
      </main>
    </div>
  );
}
