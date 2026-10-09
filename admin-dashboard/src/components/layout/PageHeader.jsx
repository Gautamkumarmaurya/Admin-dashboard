// Page header component
export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm muted">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}