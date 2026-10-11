import HeartMark from "./HeartMark";

export default function EmptyState({ title = "Тут пока пусто", subtitle }) {
  return (
    <div className="px-4 py-16 text-center">
      <div className="card-back relative mx-auto mb-6 grid h-24 w-[4.5rem] -rotate-6 place-items-center rounded-2xl shadow-lift">
        <div className="absolute inset-1.5 rounded-xl border border-white/70" />
        <HeartMark className="h-7 w-7 text-white" />
      </div>
      <h3 className="mb-2 font-display text-2xl">{title}</h3>
      {subtitle && <p className="mx-auto max-w-xs text-ink-soft">{subtitle}</p>}
    </div>
  );
}
