// Error state component
export default function ErrorState({
  message = "Something went wrong",
}) {
  return (
    <div className="panel p-8 text-center text-red-400">
      {message}
    </div>
  );
}