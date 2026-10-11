import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RouletteButton from "../components/RouletteButton";
import IdeaCard from "../components/IdeaCard";
import FilterBar from "../components/FilterBar";
import IdeaOfDay from "../components/IdeaOfDay";
import { pickRandom } from "../utils/random";
import { useFiltersStore } from "../store/useFiltersStore";
import { useAppStore } from "../store/useAppStore";

export default function Home() {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const filters = useFiltersStore();
  const streak = useAppStore((s) => s.streak);

  const spin = () => {
    setLoading(true);
    setTimeout(() => {
      const next = pickRandom(filters, idea?.id);
      setIdea(next);
      setLoading(false);
    }, 400);
  };

  const streakLabel = () => {
    if (streak === 0) return "дней";
    if (streak === 1) return "день";
    if (streak < 5) return "дня";
    return "дней";
  };

  return (
    <div className="py-8 md:py-12 space-y-8">
      {/* Заголовок */}
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl md:text-5xl tracking-tight">
          Чем заняться <span className="text-amber">вдвоём?</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Жми — и получишь одну идею. Не список. Одну.
        </p>
        {streak > 0 && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber/10 text-amber text-sm font-semibold">
            🔥 Стрик: {streak} {streakLabel()}
          </div>
        )}
      </div>

      {/* Идея дня */}
      <IdeaOfDay />

      {/* Рулетка */}
      <RouletteButton onClick={spin} loading={loading} />

      {/* Результат или фильтры */}
      <AnimatePresence mode="wait">
        {idea ? (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <IdeaCard idea={idea} onComplete={() => setIdea(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="rounded-3xl bg-card border border-border p-6">
              <div className="text-sm font-semibold text-gray-300 mb-4">
                Хочешь конкретнее? Настрой:
              </div>
              <FilterBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}