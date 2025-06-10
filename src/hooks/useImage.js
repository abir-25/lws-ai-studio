import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../context";
import { generateRandomSeeds } from "../utils";

const TOTAL_IMAGES = 9;

const useImage = () => {
  const indexRef = useRef(0);
  const [pageStatus, setPageStatus] = useState("empty");
  const [imageData, setImageData] = useState(
    Array.from({ length: TOTAL_IMAGES }, () => ({
      status: "idle",
      url: null,
      message: "",
    }))
  );
  const [pressEnter, setPressEnter] = useState(false);

  const { searchParams } = useContext(SearchContext);

  useEffect(() => {
    if (pageStatus === "empty") {
      console.log(
        "Resetting image data due to page status change:",
        pageStatus
      );
      Array.from({ length: TOTAL_IMAGES }, () => ({
        status: "idle",
        url: null,
        message: "",
      }));
    }
  }, [pageStatus]);

  useEffect(() => {
    let isMounted = true;

    if (pressEnter) {
      let flag = 1;

      console.log("started fetching images");
      const fetchImageWithDelay = async () => {
        const currentIndex = indexRef.current;

        if (!isMounted || currentIndex >= TOTAL_IMAGES) return;

        setImageData((prev) =>
          prev.map((img, idx) =>
            idx === currentIndex ? { ...img, status: "loading" } : img
          )
        );
        console.log("started first image fetch", currentIndex);

        const seed = generateRandomSeeds();
        const imageUrl = `https://image.pollinations.ai/prompt/${searchParams.prompt}?model=${searchParams.model}&width=${searchParams.width}&height=${searchParams.height}&seed=${seed}`;

        try {
          const response = await fetchWithTimeout(imageUrl, {}, 10000);
          if (!response.ok) throw new Error("Network response was not ok");

          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          if (flag === 1) {
            setPageStatus("display");
          }
          flag = 0;
          setImageData((prev) => {
            const newData = [...prev];
            newData[currentIndex] = {
              ...newData[currentIndex],
              status: "loaded",
              url: objectUrl,
            };
            return newData;
          });
          console.log("Image fetched successfully", currentIndex, objectUrl);

          indexRef.current += 1;

          if (indexRef.current < TOTAL_IMAGES) {
            setTimeout(fetchImageWithDelay, 5000);
          }
        } catch (error) {
          setImageData((prev) =>
            prev.map((img, idx) =>
              idx === currentIndex
                ? { ...img, status: "error", message: error.message }
                : img
            )
          );
          indexRef.current += 1;

          if (indexRef.current < TOTAL_IMAGES) {
            setTimeout(fetchImageWithDelay, 5000);
          }
        }
      };

      fetchImageWithDelay();
    }

    return () => {
      isMounted = false;
      imageData.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
    };
  }, [pressEnter, searchParams.model, searchParams.width, searchParams.height]);

  const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    return fetch(url, { ...options, signal: controller.signal })
      .then((response) => {
        clearTimeout(id);
        return response;
      })
      .catch((error) => {
        clearTimeout(id);
        throw error;
      });
  };

  return {
    imageData,
    setPressEnter,
    pageStatus,
    setPageStatus,
  };
};

export default useImage;
