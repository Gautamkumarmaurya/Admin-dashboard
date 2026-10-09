// Modal component
export default function Modal({
  open,
  onClose,
  title,
  children,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4"
      onMouseDown={onClose}
    >
      <div
        className="panel w-full max-w-lg p-6"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div className="mb-5 flex justify-between">
          <h2 className="font-bold">
            {title}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}