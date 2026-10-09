import Modal from "./Modal";

// Confirmation dialog component
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirm action"
    >
      <p className="muted">
        Are you sure? This demo action updates
        local data.
      </p>

      <div className="mt-5 flex justify-end gap-2">
        <button
          className="btn btn-ghost"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="btn bg-red-600 text-white"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}