import { motion } from "framer-motion";
import { Clock, Wallet, Heart, Check } from "lucide-react";
import { getCategory } from "../data/categories";
import { timeLabel, budgetLabel } from "../utils/format";
import { useAppStore } from "../store/useAppStore";
import { getIdeaTimer } from "../utils/ideaTimers";
import Timer from "./Timer";
import ShareButton from "./ShareButton";
import Stripe from "./Stripe";
import CategoryBadge from "./CategoryBadge";

// Журнальная карточка: слоновая кость, тонкая рамка, цветная полоса категории
export default function IdeaCard({ idea, onComplete }) {
  const cat = getCategory(idea.category);
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const completeIdea = useAppStore((s) => s.completeIdea);
  const history = useAppStore((s) => s.history);

  const isFav = favorites.includes(idea.id);
  const isDone = history.some((h) => h.ideaId === idea.id);
  const timerMinutes = getIdeaTimer(idea);

  return (
    <article className="card card-hover relative flex h-full flex-col overflow-hidden p-7 pl-8 md:p-8 md:pl-9">
      <Stripe color={cat?.color} />

      <div className="mb-5 flex items-center justify-between gap-3 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <CategoryBadge category={cat} />
          {cat?.name}
        </span>
        {idea.level && (
          <span className="rounded-full border border-line px-3 py-0.5 text-xs">
            Уровень {idea.level}
          </span>
        )}
      </div>

      <h2 className="mb-3 font-display text-[1.75rem] font-semibold leading-[1.2]">
        {idea.title}
      </h2>
      <p className="mb-6 text-[15px] text-muted md:text-base">
        {idea.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <Clock size={15} />
          {timeLabel[idea.time]}
        </span>
        <span className="inline-flex items-center gap-2">
          <Wallet size={15} />
          {budgetLabel[idea.budget]}
        </span>
      </div>

      {idea.steps && idea.steps.length > 0 && (
        <ol className="mb-6 space-y-3 border-t border-line pt-6">
          {idea.steps.map((s, i) => (
            <li key={i} className="flex gap-4 text-[15px]">
              <span className="w-5 shrink-0 font-display text-lg leading-[1.6] text-accent">
                {i + 1}
              </span>
              <span className="text-muted">{s}</span>
            </li>
          ))}
        </ol>
      )}

      {timerMinutes && (
        <div className="mb-6">
          <Timer minutes={timerMinutes} />
        </div>
      )}

      <div className="mt-auto flex gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => {
            completeIdea(idea.id);
            onComplete?.();
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-semibold text-ivory shadow-cta transition-[background-color,box-shadow] duration-300 hover:bg-accent-strong hover:shadow-cta-hover"
        >
          <Check size={18} />
          {isDone ? "Сделано ещё раз" : "Мы сделали"}
        </motion.button>
        <button
          type="button"
          onClick={() => toggleFavorite(idea.id)}
          aria-pressed={isFav}
          aria-label={isFav ? "Убрать из избранного" : "В избранное"}
          className={`btn-quiet grid w-12 shrink-0 place-items-center ${
            isFav ? "!border-wine !text-wine" : ""
          }`}
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} />
        </button>
        <ShareButton idea={idea} />
      </div>
    </article>
  );
}
