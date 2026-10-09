import { Search } from "lucide-react";

// Search input component
export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <label className="relative block">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 muted"
      />

      <input
        className="field pl-9"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />
    </label>
  );
}