export default function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-paper text-ink-soft hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
