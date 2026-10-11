export default function EmptyState({ title = "Тут пока пусто", subtitle }) {
  return (
    <div className="px-4 py-16 text-center">
      <h3 className="mb-2 font-display text-2xl font-semibold">{title}</h3>
      {subtitle && <p className="mx-auto max-w-xs text-muted">{subtitle}</p>}
    </div>
  );
}
