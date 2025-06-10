import { useContext } from "react";
import { DownloadedImageContext, ImageContext } from "../context";
import DownloadIcon from "./SVGIcons/DownloadIcon";
import LoadingIcon from "./SVGIcons/LoadingIcon";
import QueueIcon from "./SVGIcons/QueueIcon";
import ErrorIcon from "./SVGIcons/ErrorIcon";
import { toast } from "react-toastify";

export default function ImageContainer() {
  const { imageData, pageStatus } = useContext(ImageContext);
  const { addToDownloadList } = useContext(DownloadedImageContext);

  if (pageStatus === "empty") {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white mt-4 text-lg">
          Enter a prompt to generate images
        </p>
      </div>
    );
  }

  const handleDownload = (url) => {
    addToDownloadList(url);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Image downloaded successfully!", {
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
    <div>
      <h3 className="text-zinc-200 mb-4 font-bold text-lg">Result</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {imageData &&
          imageData.length > 0 &&
          imageData.map((image, idx) => (
            <div
              key={idx}
              className="image-card rounded-xl overflow-hidden cursor-pointer relative w-full h-full flex items-center justify-center bg-gradient-to-bl from-fuchsia-950 via-purple-950 to-fuchsia-950 text-white"
            >
              {image.status === "idle" && (
                <div className="flex flex-col items-center justify-center h-[190px]">
                  <QueueIcon />
                  <p className="mt-4">Hang tight, magic's brewin</p>
                  <p className="text-sm mt-2">Hope the AI's feelin' inspired</p>
                </div>
              )}
              {image.status === "loading" && (
                <div className="flex flex-col items-center justify-center h-[190px]">
                  <LoadingIcon />
                  <p className="mt-4">Crafting your masterpiece</p>
                  <p className="text-sm mt-2">This may take 5–10 seconds.</p>
                </div>
              )}
              {image.status === "error" && (
                <div className="flex flex-col items-center justify-center h-[190px] px-5">
                  <ErrorIcon />
                  <p className="mt-2">{image.message}</p>
                  <p className="mt-3 text-center">
                    Oops! The image elves are on strike. No masterpiece today!
                  </p>
                </div>
              )}
              {image.status === "loaded" && (
                <>
                  <div
                    className="absolute bottom-2 right-2  p-1"
                    onClick={() => handleDownload(image.url)}
                  >
                    <DownloadIcon />
                  </div>
                  <img src={image.url} className="w-full h-48 object-cover" />
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
