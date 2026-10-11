import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RouletteButton from "../components/RouletteButton";
import IdeaCard from "../components/IdeaCard";
import FilterBar from "../components/FilterBar";
import IdeaOfDay from "../components/IdeaOfDay";
import Reveal from "../components/Reveal";
import { pickRandom } from "../utils/random";
import { plural } from "../utils/format";
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

  return (
    <div className="space-y-16 py-16 md:space-y-24 md:py-24">
      {/* Заголовок */}
      <Reveal i={0} className="">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-[2.25rem] font-semibold leading-[1.12] md:text-[4rem]">
            Чем заняться вдвоём?
          </h1>
          <p className="mt-6 text-base text-muted">
            Жми — и получишь одну идею. Не список. Одну.
          </p>
          {streak > 0 && (
            <p className="mt-5 text-sm font-medium text-accent">
              Стрик: {streak} {plural(streak, "день", "дня", "дней")}
            </p>
          )}
        </header>
      </Reveal>

      {/* Идея дня — сразу после заголовка */}
      <Reveal i={1} className="">
        <div className="mx-auto max-w-2xl">
          <IdeaOfDay />
        </div>
      </Reveal>

      {/* Рулетка и результат */}
      <Reveal i={2} className="">
        <section className="mx-auto max-w-2xl text-center">
          <RouletteButton onClick={spin} loading={loading} hasIdea={!!idea} />

          <AnimatePresence mode="wait">
            {idea && (
              <motion.div
                key={idea.id}
                className="mt-10 text-left"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <IdeaCard idea={idea} onComplete={() => setIdea(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </Reveal>

      {/* Фильтры — просто на фоне, без контейнера */}
      <Reveal i={3} className="">
        <section className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center font-display text-[1.5rem] font-semibold">
            Хочешь конкретнее? Настрой:
          </h2>
          <FilterBar />
        </section>
      </Reveal>
    </div>
  );
}
