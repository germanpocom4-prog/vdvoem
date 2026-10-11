import { Clock, Wallet, Heart, Check } from "lucide-react";
import { getCategory } from "../data/categories";
import { timeLabel, budgetLabel } from "../utils/format";
import { useAppStore } from "../store/useAppStore";
import { getIdeaTimer } from "../utils/ideaTimers";
import Timer from "./Timer";
import ShareButton from "./ShareButton";

// Идея — это карта: заливка и цвет текста берутся из категории
export default function IdeaCard({ idea, onComplete }) {
  const cat = getCategory(idea.category);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const completeIdea = useAppStore((s) => s.completeIdea);
  const history = useAppStore((s) => s.history);

  const isFav = favorites.includes(idea.id);
  const isDone = history.some((h) => h.ideaId === idea.id);
  const timerMinutes = getIdeaTimer(idea);

  const fill = cat?.color || "#FFFFFF";
  const fg = cat?.fg || "#1E1633";

  return (
    <article
      className="flex flex-col rounded-card p-6 shadow-card md:p-7"
      style={{ background: fill, color: fg }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <span className="text-xl leading-none" aria-hidden="true">
            {cat?.emoji}
          </span>
          {cat?.name}
        </span>
        {idea.level && (
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: fg, color: fill }}
          >
            Уровень {idea.level}
          </span>
        )}
      </div>

      <h2 className="mb-3 font-display text-[1.75rem] leading-[1.1] md:text-3xl">
        {idea.title}
      </h2>
      <p className="mb-5 leading-relaxed" style={{ opacity: 0.92 }}>
        {idea.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2 text-sm font-medium">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ border: "1px solid currentColor" }}
        >
          <Clock size={14} />
          {timeLabel[idea.time]}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ border: "1px solid currentColor" }}
        >
          <Wallet size={14} />
          {budgetLabel[idea.budget]}
        </span>
      </div>

      {idea.steps && idea.steps.length > 0 && (
        <ol className="mb-5 space-y-3 rounded-2xl bg-paper p-4 text-ink">
          {idea.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      )}

      {timerMinutes && (
        <div className="mb-5">
          <Timer minutes={timerMinutes} />
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            completeIdea(idea.id);
            onComplete?.();
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 font-semibold text-white transition-colors hover:bg-black"
        >
          <Check size={18} />
          {isDone ? "Сделано ещё раз" : "Мы сделали"}
        </button>
        <button
          type="button"
          onClick={() => toggleFavorite(idea.id)}
          aria-pressed={isFav}
          aria-label={isFav ? "Убрать из избранного" : "В избранное"}
          className={`grid w-12 shrink-0 place-items-center rounded-2xl transition-colors ${
            isFav ? "bg-paper text-cherry" : "hover:bg-white/20"
          }`}
          style={isFav ? undefined : { border: "1.5px solid currentColor" }}
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} />
        </button>
        <ShareButton idea={idea} />
      </div>
    </article>
  );
}
