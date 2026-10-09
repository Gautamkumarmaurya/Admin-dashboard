import Sidebar from "./Sidebar";

// Mobile sidebar component
export default function MobileSidebar({
  open,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex bg-black/60 lg:hidden"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
      >
        <Sidebar
          mobile
          onClose={onClose}
        />
      </div>
    </div>
  );
}