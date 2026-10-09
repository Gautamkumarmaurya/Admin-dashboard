import {
  useMemo,
  useState,
} from "react";

// Pagination hook
export default function usePagination(
  items,
  size = 6
) {
  const [page, setPage] = useState(1);

  const pages = Math.max(
    1,
    Math.ceil(items.length / size)
  );

  const data = useMemo(
    () =>
      items.slice(
        (page - 1) * size,
        page * size
      ),
    [items, page, size]
  );

  return {
    page,
    setPage,
    pages,
    data,
  };
}