import { ToastContainer } from "react-toastify";
import "./App.css";
import Page from "./Page";
import DownloadedImageProvider from "./provider/DownloadedImageProvider";
import ImageProvider from "./provider/ImageProvider";
import PageProvider from "./provider/PageProvider";
import SearchProvider from "./provider/SearchProvider";

function App() {
  return (
    <PageProvider>
      <SearchProvider>
        <ImageProvider>
          <DownloadedImageProvider>
            <Page />
            <ToastContainer />
          </DownloadedImageProvider>
        </ImageProvider>
      </SearchProvider>
    </PageProvider>
  );
}

export default App;
