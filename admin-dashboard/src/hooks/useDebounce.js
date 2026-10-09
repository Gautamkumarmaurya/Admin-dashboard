import {
  useEffect,
  useState,
} from "react";

// Debounce hook
export default function useDebounce(
  v,
  d = 250
) {
  const [x, setX] = useState(v);

  useEffect(() => {
    const t = setTimeout(
      () => setX(v),
      d
    );

    return () => clearTimeout(t);
  }, [v, d]);

  return x;
}