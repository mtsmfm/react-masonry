import { useCallback, useRef, useState } from "react";
import { useRectWidthHeight } from "./useRectWidthHeight";
import { useThrottle } from "./useThrottle";

export const useMasonlyData = ({
  ref,
  minColumnWidth,
  gap,
  itemCount,
}: {
  ref: React.MutableRefObject<null>;
  minColumnWidth: number;
  gap: number;
  itemCount: number;
}) => {
  const { width: rowWidth } = useRectWidthHeight(ref);
  const columnCount = Math.max(Math.floor(rowWidth / minColumnWidth), 1);
  const columnWidth = (rowWidth - gap * (columnCount - 1)) / columnCount;

  // Use ref to avoid recreating setSizeRatio func
  const sizeRetioMapRef = useRef(new Map<number, number>());
  // To detect sizeRetioMapRef change
  const [lastChangedIndex, setLastChangedIndex] = useState<number>();

  const setSizeRatio = useCallback(
    (index: number, ratio: number) => {
      sizeRetioMapRef.current.set(index, ratio);
      setLastChangedIndex(index);
    },
    [sizeRetioMapRef, setLastChangedIndex]
  );

  const [throttledItemPositionMap, maxHeight] = useThrottle(
    (itemCount, _, columnCount, columnWidth, margin) => {
      const itemPositionMap = new Map<
        number,
        { top: number; left: number; width: number }
      >();

      const columns = Array.from({
        length: columnCount,
      }).map((_, index) => ({
        height: 0,
        index,
      }));

      Array.from({ length: itemCount }).forEach((_, index) => {
        const column = [...columns].sort((c1, c2) => c1.height - c2.height)[0];
        const top = column.height;
        const left = (columnWidth + margin) * column.index;
        itemPositionMap.set(index, { top, left, width: columnWidth });
        column.height +=
          (sizeRetioMapRef.current.get(index) || 1) * columnWidth + margin;
      });

      return [
        itemPositionMap,
        columns.sort((c1, c2) => c2.height - c1.height)[0].height,
      ] as const;
    },
    [itemCount, lastChangedIndex, columnCount, columnWidth, gap] as const,
    20
  );

  const itemPositionMap = new Map(throttledItemPositionMap);

  // throttledItemPositionMap may not have position data for item because it's throttled
  Array.from({ length: itemCount }).forEach((_, index) => {
    if (!itemPositionMap.has(index)) {
      const assumedHeight = columnWidth;

      itemPositionMap.set(index, {
        top: (assumedHeight + gap) * Math.floor(index / columnCount),
        left: (columnWidth + gap) * (index % columnCount),
        width: columnWidth,
      });
    }
  });

  return {
    setSizeRatio,
    itemPositionMap,
    maxHeight,
  };
};
