import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context";
import { generateRandomSeeds } from "../utils";

const TOTAL_IMAGES = 9;

const useImage = () => {
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
    if (pageStatus === "empty" || pageStatus === "loading") {
      setImageData(
        Array.from({ length: TOTAL_IMAGES }, () => ({
          status: "idle",
          url: null,
          message: "",
        }))
      );
    }
  }, [pageStatus]);

  useEffect(() => {
    let isMounted = true;

    if (pressEnter) {
      let flag = 1;
      let index = 0;

      const fetchImageWithDelay = async () => {
        const currentIndex = index;

        if (!isMounted || currentIndex >= TOTAL_IMAGES) return;

        setImageData((prev) =>
          prev.map((img, idx) =>
            idx === currentIndex ? { ...img, status: "loading" } : img
          )
        );

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

          index += 1;

          if (index < TOTAL_IMAGES) {
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
          index += 1;

          if (index < TOTAL_IMAGES) {
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
