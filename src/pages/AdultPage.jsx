import { useState } from "react";
import { ideas } from "../data/ideas";
import { useAppStore } from "../store/useAppStore";
import { getUnlockedLevel, getLevelProgress } from "../utils/levels";
import IdeaCard from "../components/IdeaCard";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";
import { Lock, Check } from "lucide-react";

const LEVELS = [
  { id: 1, name: "Разогрев", emoji: "🌸", description: "Нежные вопросы и близость" },
  { id: 2, name: "Ближе", emoji: "💋", description: "Смелее, но без пошлости" },
  { id: 3, name: "Горячо", emoji: "🔥", description: "Для тех, кто давно вместе" },
  { id: 4, name: "Только для двоих", emoji: "🌙", description: "Полная свобода" },
];

export default function AdultPage() {
  const history = useAppStore((s) => s.history);
  const unlocked = getUnlockedLevel(history);
  const [selectedLevel, setSelectedLevel] = useState(null);

  if (selectedLevel) {
    const currentLevel = LEVELS.find((l) => l.id === selectedLevel);
    const levelIdeas = ideas.filter(
      (i) => i.category === "adult" && i.level === selectedLevel
    );
    return (
      <div className="space-y-8 py-8 md:py-12">
        <BackLink onClick={() => setSelectedLevel(null)}>К уровням</BackLink>
        <PageTitle
          title={`Уровень ${currentLevel.id}: ${currentLevel.name}`}
          subtitle={currentLevel.description}
        />
        <div className="grid items-start gap-4 md:grid-cols-2">
          {levelIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8 md:py-12">
      <BackLink to="/ideas">Все идеи</BackLink>

      <PageTitle
        title="18+"
        subtitle="Уровни открываются постепенно. Выполняйте задания, чтобы открыть следующий."
      />

      <div className="space-y-3">
        {LEVELS.map((lvl) => {
          const isUnlocked = lvl.id <= unlocked;
          const progress = getLevelProgress(history, lvl.id);

          return (
            <button
              key={lvl.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => isUnlocked && setSelectedLevel(lvl.id)}
              className={`w-full rounded-tile border p-5 text-left transition-colors ${
                isUnlocked
                  ? "cursor-pointer border-line bg-paper hover:border-ink/40"
                  : "cursor-not-allowed border-dashed border-line"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-4">
                  <span
                    className={`text-3xl leading-none ${
                      isUnlocked ? "" : "opacity-50"
                    }`}
                    aria-hidden="true"
                  >
                    {lvl.emoji}
                  </span>
                  <div>
                    <div
                      className={`font-display text-xl ${
                        isUnlocked ? "" : "text-ink-soft"
                      }`}
                    >
                      Уровень {lvl.id}: {lvl.name}
                    </div>
                    <p className="text-sm text-ink-soft">{lvl.description}</p>

                    {!isUnlocked && progress && (
                      <div className="mt-3 text-sm text-ink-soft">
                        Выполни {progress.remaining} из {progress.need} на
                        уровне {lvl.id - 1} ({progress.have}/{progress.need})
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                    isUnlocked
                      ? "bg-cherry text-white"
                      : "border border-line text-ink-soft"
                  }`}
                >
                  {isUnlocked ? <Check size={18} /> : <Lock size={16} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
