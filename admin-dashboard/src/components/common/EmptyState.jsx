// Empty state component
export default function EmptyState({
  title = "No data found",
}) {
  return (
    <div className="panel p-12 text-center muted">
      {title}
    </div>
  );
}