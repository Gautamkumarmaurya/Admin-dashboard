// Loader component
export default function Loader() {
  return (
    <div className="grid min-h-52 place-items-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-violet-500" />
    </div>
  );
}