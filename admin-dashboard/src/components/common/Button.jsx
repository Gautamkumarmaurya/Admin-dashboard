export default function Button({
  children,
  className = "",
  variant = "primary",
  ...p
}) {
  return (
    <button
      className={`btn ${
        variant === "primary"
          ? "btn-primary"
          : "btn-ghost"
      } ${className}`}
      {...p}
    >
      {children}
    </button>
  );
}