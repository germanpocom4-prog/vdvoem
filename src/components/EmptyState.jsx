export default function EmptyState({ title = "Тут пока пусто", subtitle }) {
  return (
    <div className="text-center py-20 px-4">
      <div className="text-6xl mb-4">🌙</div>
      <h3 className="font-display text-xl mb-2">{title}</h3>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
  );
}