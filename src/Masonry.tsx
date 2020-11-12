import React, { useRef } from "react";
import { MasonryItem } from "./MasonryItem";
import { useMasonlyData } from "./useMasonryData";

interface Props {
  children: React.ReactElement[];
  transition?: string;
  gap?: number;
  minColumnWidth?: number;
}

export const Masonry: React.FC<Props> = ({
  minColumnWidth = 300,
  transition,
  gap = 0,
  children,
}) => {
  const ref = useRef(null);
  const { itemPositionMap, maxHeight, setSizeRatio } = useMasonlyData({
    ref,
    gap,
    itemCount: children.length,
    minColumnWidth,
  });

  return (
    <div ref={ref} style={{ position: "relative", height: maxHeight }}>
      {children.map((c, index) => {
        const { top, left, width } = itemPositionMap.get(index)!;

        return (
          <MasonryItem
            width={width}
            top={top}
            left={left}
            index={index}
            key={index}
            setSizeRatio={setSizeRatio}
            transition={transition}
          >
            {c}
          </MasonryItem>
        );
      })}
    </div>
  );
};
