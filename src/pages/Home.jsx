import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RouletteButton from "../components/RouletteButton";
import IdeaCard from "../components/IdeaCard";
import FilterBar from "../components/FilterBar";
import { pickRandom } from "../utils/random";
import { useFiltersStore } from "../store/useFiltersStore";
import { useAppStore } from "../store/useAppStore";

export default function Home() {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const filters = useFiltersStore();
  const { streak } = useAppStore();

  const spin = () => {
    setLoading(true);
    setTimeout(() => {
      const next = pickRandom(filters, idea?.id);
      setIdea(next);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="py-8 md:py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="font-display text-3xl md:text-5xl tracking-tight">
          Чем заняться <span className="text-amber">вдвоём?</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Жми — и получишь одну идею. Не список. Одну.
        </p>
        {streak > 0 && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber/10 text-amber text-sm font-semibold">
            🔥 Стрик: {streak} {streak === 1 ? "день" : "дней"}
          </div>
        )}
      </div>

      <RouletteButton onClick={spin} loading={loading} />

      <AnimatePresence mode="wait">
        {idea ? (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <IdeaCard idea={idea} onComplete={() => setIdea(null)} />
            <button
              onClick={spin}
              className="mt-4 w-full max-w-md mx-auto block py-3 rounded-2xl border border-border text-gray-400 hover:text-white hover:border-amber/50 transition text-sm"
            >
              Не подходит — крутануть ещё
            </button>
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