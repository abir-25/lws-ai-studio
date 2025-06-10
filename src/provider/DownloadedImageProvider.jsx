import { useState } from "react";
import { DownloadedImageContext } from "../context";
import { toast } from "react-toastify";

const DownloadedImageProvider = ({ children }) => {
  const [downloadedImages, setDownloadedImages] = useState([]);

  const addToDownloadList = (url) => {
    if (downloadedImages.includes(url)) {
      return;
    }
    setDownloadedImages((prev) => [...prev, url]);
  };

  const removeFromDownloadList = (url) => {
    setDownloadedImages((prev) => prev.filter((imgUrl) => imgUrl !== url));
    toast.success("Image removed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <DownloadedImageContext.Provider
      value={{ addToDownloadList, removeFromDownloadList, downloadedImages }}
    >
      {children}
    </DownloadedImageContext.Provider>
  );
};

export default DownloadedImageProvider;
