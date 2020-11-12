import React, { useEffect, useRef } from "react";
import { useRectWidthHeight } from "./useRectWidthHeight";

export const MasonryItem = React.memo<{
  index: number;
  top: number;
  left: number;
  width: number;
  setSizeRatio: (index: number, ratio: number) => void;
  children: React.ReactNode;
  transition?: string;
}>(({ index, children, top, left, width, setSizeRatio, transition }) => {
  const ref = useRef(null);
  const rect = useRectWidthHeight(ref);

  useEffect(() => {
    setSizeRatio(index, rect.height / rect.width);
  }, [rect]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top,
        left,
        width: `${width}px`,
        transition,
      }}
    >
      {children}
    </div>
  );
});
