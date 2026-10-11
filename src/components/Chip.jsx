export default function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
        active
          ? "border-accent bg-accent text-ivory"
          : "border-line bg-transparent text-muted hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}
