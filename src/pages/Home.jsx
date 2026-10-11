import { useState } from "react";
import { Flame } from "lucide-react";
import RouletteButton from "../components/RouletteButton";
import Deck from "../components/Deck";
import FilterBar from "../components/FilterBar";
import IdeaOfDay from "../components/IdeaOfDay";
import { pickRandom } from "../utils/random";
import { plural } from "../utils/format";
import { useFiltersStore } from "../store/useFiltersStore";
import { useAppStore } from "../store/useAppStore";

export default function Home() {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const filters = useFiltersStore();
  const streak = useAppStore((s) => s.streak);

  const spin = () => {
    if (loading) return;
    setLoading(true);
    setNothingFound(false);
    setTimeout(() => {
      const next = pickRandom(filters, idea?.id);
      if (next) {
        setIdea(next);
      } else {
        setNothingFound(true);
      }
      setLoading(false);
    }, 650);
  };

  return (
    <div className="space-y-10 py-8 md:space-y-14 md:py-14">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_24rem] md:grid-rows-[auto_1fr] md:gap-x-14 md:gap-y-8">
        {/* Заголовок */}
        <div className="space-y-4 md:col-start-1 md:row-start-1 md:pt-4">
          <h1 className="font-display text-[2.5rem] leading-[1.02] md:text-[3.5rem]">
            Чем заняться вдвоём?
          </h1>
          <p className="max-w-md text-base text-ink-soft md:text-lg">
            Жми — и получишь одну идею. Не список. Одну.
          </p>
          {streak > 0 && (
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-sm font-semibold">
              <Flame size={16} className="text-cherry" />
              Стрик: {streak} {plural(streak, "день", "дня", "дней")}
            </div>
          )}
        </div>

        {/* Колода и кнопка */}
        <div className="mx-auto w-full max-w-sm space-y-4 md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0">
          <Deck
            idea={idea}
            loading={loading}
            onDraw={spin}
            onComplete={() => setIdea(null)}
          />
          <RouletteButton onClick={spin} loading={loading} hasIdea={!!idea} />
          {nothingFound && (
            <p role="status" className="text-center text-sm text-ink-soft">
              Под такие настройки идей нет. Попробуй выбрать «любое».
            </p>
          )}
        </div>

        {/* Фильтры */}
        <div className="md:col-start-1 md:row-start-2">
          <div className="rounded-tile border border-line bg-paper p-5 md:p-6">
            <div className="mb-4 font-display text-xl">
              Хочешь конкретнее? Настрой:
            </div>
            <FilterBar />
          </div>
        </div>
      </div>

      <IdeaOfDay />
    </div>
  );
}
