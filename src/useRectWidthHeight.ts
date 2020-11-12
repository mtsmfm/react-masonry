import React, { useCallback, useEffect, useState } from "react";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";

export const useRectWidthHeight = (
  ref: React.MutableRefObject<HTMLElement | null>
) => {
  const [rect, setRect] = useState({
    width: 0,
    height: 0,
  });

  const run = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setRect({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const elem = ref.current;
    const ResizeObserver: typeof Polyfill =
      (window as any).ResizeObserver || Polyfill;

    const observer = new ResizeObserver(run);
    observer.observe(elem);

    return () => {
      observer.unobserve(elem);
    };
  }, [ref]);

  return rect;
};
