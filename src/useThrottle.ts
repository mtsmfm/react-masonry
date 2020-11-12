import { useRef, useEffect, useState } from "react";

export function useThrottle<TArgs extends readonly unknown[], TReturn>(
  func: (...args: TArgs) => TReturn,
  args: TArgs,
  ms: number
): TReturn {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const argsRef = useRef(args);

  const [currentValue, setCurrentValue] = useState<TReturn>();
  const [onceCalled, setOnceCalled] = useState(false);

  useEffect(() => {
    argsRef.current = args;

    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        setCurrentValue(func(...argsRef.current));
        timerRef.current = undefined;
      }, ms);
    }
  }, args);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!onceCalled) {
    setOnceCalled(true);
    const initialValue = func(...args);
    setCurrentValue(initialValue);

    return initialValue;
  }

  return currentValue!;
}
