import { useEffect, useRef } from "react";

export const useAutoScroll = (dependencies) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, dependencies);

  return containerRef;
};

