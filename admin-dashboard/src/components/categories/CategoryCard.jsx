import {
  ArrowRight,
  Footprints,
  Gem,
  House,
  Laptop,
  Package,
  Shirt,
  Sparkles,
  Watch,
} from "lucide-react";

import { Link } from "react-router-dom";

import Badge from "../common/Badge";

const categoryStyles = [
  {
    icon: Laptop,
    colors:
      "border-sky-400/20 bg-sky-400/10 text-sky-300",
    glow: "from-sky-500/10",
  },
  {
    icon: Shirt,
    colors:
      "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-300",
    glow: "from-fuchsia-500/10",
  },
  {
    icon: House,
    colors:
      "border-amber-400/20 bg-amber-400/10 text-amber-300",
    glow: "from-amber-500/10",
  },
  {
    icon: Footprints,
    colors:
      "border-violet-400/20 bg-violet-400/10 text-violet-300",
    glow: "from-violet-500/10",
  },
  {
    icon: Sparkles,
    colors:
      "border-rose-400/20 bg-rose-400/10 text-rose-300",
    glow: "from-rose-500/10",
  },
  {
    icon: Gem,
    colors:
      "border-teal-400/20 bg-teal-400/10 text-teal-300",
    glow: "from-teal-500/10",
  },
  {
    icon: Watch,
    colors:
      "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
    glow: "from-indigo-500/10",
  },
];

function getCategoryStyle(name, index) {
  const normalizedName = name.toLowerCase();

  if (
    normalizedName.includes("electronic") ||
    normalizedName.includes("tech")
  ) {
    return categoryStyles[0];
  }

  if (
    normalizedName.includes("fashion") ||
    normalizedName.includes("cloth")
  ) {
    return categoryStyles[1];
  }

  if (
    normalizedName.includes("home") ||
    normalizedName.includes("living")
  ) {
    return categoryStyles[2];
  }

  if (
    normalizedName.includes("shoe") ||
    normalizedName.includes("footwear")
  ) {
    return categoryStyles[3];
  }

  if (
    normalizedName.includes("beauty") ||
    normalizedName.includes("skin")
  ) {
    return categoryStyles[4];
  }

  if (
    normalizedName.includes("accessor") ||
    normalizedName.includes("jewel")
  ) {
    return categoryStyles[5];
  }

  return categoryStyles[
    index % categoryStyles.length
  ];
}

export default function CategoryCard({
  category,
  index,
}) {
  const style = getCategoryStyle(
    category.name,
    index
  );

  const Icon = style?.icon || Package;

  const productCount =
    category.productCount ?? 0;

  return (
    <Link
      to={`/products?category=${encodeURIComponent(
        category.id
      )}`}
      aria-label={`View ${category.name} products`}
      className="panel category-card group relative block min-w-0 overflow-hidden p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <div
        className={`pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-gradient-to-bl ${style.glow} to-transparent opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl border shadow-lg shadow-black/10 transition-transform duration-300 group-hover:-translate-y-0.5 ${style.colors}`}
        >
          <Icon
            size={22}
            strokeWidth={1.8}
          />
        </span>

        <Badge>
          {category.status || "Active"}
        </Badge>
      </div>

      <div className="relative mt-5 min-h-16">
        <h2
          className="truncate text-lg font-semibold tracking-tight text-slate-100"
          title={category.name}
        >
          {category.name}
        </h2>

        <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">
          {category.description ||
            "Explore products in this collection."}
        </p>
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-slate-700/50 pt-4">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
          <Package
            size={15}
            className={style.colors
              .split(" ")
              .at(-1)}
          />

          Products
        </span>

        <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-950/30 px-2.5 py-1 text-sm font-semibold tabular-nums text-slate-200 transition-colors group-hover:border-violet-400/30 group-hover:text-violet-200">
          {productCount.toLocaleString("en-IN")}

          <ArrowRight
            size={14}
            className="text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-300"
          />
        </span>
      </div>
    </Link>
  );
}