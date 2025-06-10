import { ImageContext } from "../context";
import { useImage } from "../hooks";

const ImageProvider = ({ children }) => {
  const { imageData, setPressEnter, pageStatus, setPageStatus } = useImage();
  return (
    <ImageContext.Provider
      value={{
        imageData,
        setPressEnter,
        pageStatus,
        setPageStatus,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
