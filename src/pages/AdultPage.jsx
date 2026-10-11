import { useState } from "react";
import { ideas } from "../data/ideas";
import { useAppStore } from "../store/useAppStore";
import { getUnlockedLevel, getLevelProgress } from "../utils/levels";
import IdeaCard from "../components/IdeaCard";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";
import Reveal from "../components/Reveal";
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
      <div className="space-y-12 py-16 md:space-y-16 md:py-24">
        <div className="space-y-8">
          <BackLink onClick={() => setSelectedLevel(null)}>К уровням</BackLink>
          <PageTitle
            title={`Уровень ${currentLevel.id}: ${currentLevel.name}`}
            subtitle={currentLevel.description}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {levelIdeas.map((idea, i) => (
            <Reveal key={idea.id} i={i}>
              <IdeaCard idea={idea} />
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-16 md:space-y-16 md:py-24">
      <div className="space-y-8">
        <BackLink to="/ideas">Все идеи</BackLink>
        <PageTitle
          title="18+"
          subtitle="Уровни открываются постепенно. Выполняйте задания, чтобы открыть следующий."
        />
      </div>

      <div className="space-y-4">
        {LEVELS.map((lvl, idx) => {
          const isUnlocked = lvl.id <= unlocked;
          const progress = getLevelProgress(history, lvl.id);

          return (
            <Reveal key={lvl.id} i={idx} className="">
              <button
                type="button"
                disabled={!isUnlocked}
                onClick={() => isUnlocked && setSelectedLevel(lvl.id)}
                className={`w-full p-7 text-left ${
                  isUnlocked
                    ? "card card-hover cursor-pointer"
                    : "cursor-not-allowed rounded-2xl border border-dashed border-line"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-1 items-start gap-4">
                    <span
                      className={`text-xl leading-[1.9] ${
                        isUnlocked ? "" : "opacity-50"
                      }`}
                      aria-hidden="true"
                    >
                      {lvl.emoji}
                    </span>
                    <div>
                      <div
                        className={`font-display text-[1.5rem] font-semibold ${
                          isUnlocked ? "" : "text-muted"
                        }`}
                      >
                        Уровень {lvl.id}: {lvl.name}
                      </div>
                      <p className="text-[15px] text-muted">{lvl.description}</p>

                      {!isUnlocked && progress && (
                        <div className="mt-3 text-sm text-muted">
                          Выполни {progress.remaining} из {progress.need} на
                          уровне {lvl.id - 1} ({progress.have}/{progress.need})
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                      isUnlocked
                        ? "bg-accent text-ivory"
                        : "border border-line text-muted"
                    }`}
                  >
                    {isUnlocked ? <Check size={18} /> : <Lock size={16} />}
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
