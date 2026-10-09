export default function Pagination({
  page,
  pages,
  setPage,
}) {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <button
        className="btn btn-ghost"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <span className="px-3 py-2 text-sm muted">
        {page} / {pages}
      </span>

      <button
        className="btn btn-ghost"
        disabled={page >= pages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}