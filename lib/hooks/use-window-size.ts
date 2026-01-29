import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    // handler to call on window resize
    function handleResize() {
      // set window width/height to state
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    // add event listener
    window.addEventListener("resize", handleResize);

    // call handler right away so state gets updated with initial window size
    handleResize();

    // remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // empty array ensures that effect is only run on mount

  return {
    isDesktop: typeof windowSize?.width === "number" && windowSize?.width >= 768,
    isMobile: typeof windowSize?.width === "number" && windowSize?.width < 768,
    windowSize,
  };
}
