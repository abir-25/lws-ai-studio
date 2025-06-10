import { useContext } from "react";
import { DownloadedImageContext } from "../context";
import DeleteIcon from "./SVGIcons/DeleteIcon";

export default function DownloadPage() {
  const { downloadedImages, removeFromDownloadList } = useContext(
    DownloadedImageContext
  );
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {downloadedImages.length > 0 ? (
          downloadedImages.map((image, idx) => (
            <div
              key={idx}
              className="image-card rounded-xl overflow-hidden cursor-pointer relative"
            >
              <div
                className="absolute bottom-2 right-2  p-1"
                onClick={() => removeFromDownloadList(image)}
              >
                <DeleteIcon />
              </div>
              <img src={image} className="w-full h-48 object-cover" />
            </div>
          ))
        ) : (
          <div className="col-span-5 text-center text-gray-500 min-h-[400px] flex items-center justify-center">
            No downloaded images yet. Start downloading some images!
          </div>
        )}
      </div>
    </div>
  );
}
