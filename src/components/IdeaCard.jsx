import { motion } from "framer-motion";
import { Clock, Wallet, Heart, Check } from "lucide-react";
import { getCategory } from "../data/categories";
import { timeLabel, budgetLabel } from "../utils/format";
import { useAppStore } from "../store/useAppStore";

export default function IdeaCard({ idea, onComplete }) {
  const cat = getCategory(idea.category);
  const { favorites, toggleFavorite, completeIdea, history } = useAppStore();
  const isFav = favorites.includes(idea.id);
  const isDone = history.some((h) => h.ideaId === idea.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-card border border-border p-6 md:p-8 relative overflow-hidden"
    >
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: cat?.color }}
      />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${cat?.color}22`, color: cat?.color }}
          >
            {cat?.emoji} {cat?.name}
          </span>
          {idea.level && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-wine/20 text-wine">
              Уровень {idea.level}
            </span>
          )}
        </div>

        <h2 className="font-display text-2xl md:text-3xl mb-3">{idea.title}</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">{idea.description}</p>

        <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            {timeLabel[idea.time]}
          </div>
          <div className="flex items-center gap-1.5">
            <Wallet size={16} />
            {budgetLabel[idea.budget]}
          </div>
        </div>

        {idea.steps && idea.steps.length > 0 && (
          <div className="mb-6 space-y-2">
            {idea.steps.map((s, i) => (
              <div key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="text-amber font-semibold shrink-0">{i + 1}.</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => {
              completeIdea(idea.id);
              onComplete?.();
            }}
            className="flex-1 py-3 rounded-2xl bg-amber text-bg font-semibold flex items-center justify-center gap-2 hover:bg-amber/90 transition"
          >
            <Check size={18} />
            {isDone ? "Сделано ещё раз" : "Мы сделали"}
          </button>
          <button
            onClick={() => toggleFavorite(idea.id)}
            className={`px-4 rounded-2xl border transition ${
              isFav
                ? "bg-wine/20 border-wine text-wine"
                : "border-border text-gray-400 hover:text-white"
            }`}
          >
            <Heart size={18} fill={isFav ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}