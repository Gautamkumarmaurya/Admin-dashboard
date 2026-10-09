// Breadcrumb component
export default function Breadcrumb({
  items = [],
}) {
  return (
    <div className="mb-3 text-xs muted">
      {items.join(" / ")}
    </div>
  );
}