export default function Badge({
  children,
  status = "",
}) {
  const s = String(
    status || children
  ).toLowerCase();

  let c =
    "bg-slate-500/15 text-slate-300";

  if (
    /active|success|paid|delivered|approved|shipped/.test(
      s
    )
  ) {
    c =
      "bg-emerald-500/15 text-emerald-400";
  } else if (
    /pending|processing|low/.test(s)
  ) {
    c =
      "bg-amber-500/15 text-amber-400";
  } else if (
    /failed|cancel|inactive|reject/.test(s)
  ) {
    c =
      "bg-red-500/15 text-red-400";
  } else if (/vip/.test(s)) {
    c =
      "bg-violet-500/15 text-violet-300";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${c}`}
    >
      {children}
    </span>
  );
}