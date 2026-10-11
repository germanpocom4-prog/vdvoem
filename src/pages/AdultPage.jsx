import { useState } from "react";
import { Link } from "react-router-dom";
import { ideas } from "../data/ideas";
import { useAppStore } from "../store/useAppStore";
import { getUnlockedLevel, getLevelProgress } from "../utils/levels";
import IdeaCard from "../components/IdeaCard";
import { ArrowLeft, Lock, Check } from "lucide-react";

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
      <div className="py-8 space-y-6">
        <button
          onClick={() => setSelectedLevel(null)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm"
        >
          <ArrowLeft size={16} /> К уровням
        </button>
        <h1 className="font-display text-3xl">
          {currentLevel.emoji} Уровень {currentLevel.id} — {currentLevel.name}
        </h1>
        <div className="grid gap-4 md:grid-cols-2">
          {levelIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-6">
      <Link
        to="/ideas"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm"
      >
        <ArrowLeft size={16} /> Все идеи
      </Link>

      <div>
        <h1 className="font-display text-3xl md:text-4xl">🔥 18+</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Уровни открываются постепенно. Выполняйте задания, чтобы открыть
          следующий.
        </p>
      </div>

      <div className="space-y-3">
        {LEVELS.map((lvl) => {
          const isUnlocked = lvl.id <= unlocked;
          const progress = getLevelProgress(history, lvl.id);

          return (
            <button
              key={lvl.id}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && setSelectedLevel(lvl.id)}
              className={`w-full text-left rounded-3xl border p-6 transition relative overflow-hidden ${
                isUnlocked
                  ? "bg-card border-border hover:border-amber/50 cursor-pointer"
                  : "bg-card/50 border-border/50 cursor-not-allowed opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{lvl.emoji}</span>
                    <div className="font-display text-lg">
                      Уровень {lvl.id} — {lvl.name}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{lvl.description}</p>

                  {!isUnlocked && progress && (
                    <div className="mt-3 text-xs text-gray-500">
                      🔒 Выполни {progress.remaining} из {progress.need} на
                      уровне {lvl.id - 1} ({progress.have}/{progress.need})
                    </div>
                  )}
                </div>
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${
                    isUnlocked
                      ? "bg-amber/10 border-amber text-amber"
                      : "border-border text-gray-500"
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