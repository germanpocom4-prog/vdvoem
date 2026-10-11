import { useParams, Link } from "react-router-dom";
import { getCategory } from "../data/categories";
import { getIdeasByCategory } from "../data/ideas";
import IdeaCard from "../components/IdeaCard";
import EmptyState from "../components/EmptyState";
import { ArrowLeft, Lock } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

// сколько нужно выполнить идей, чтобы открыть уровень
const LEVEL_REQUIREMENTS = {
  1: 0,
  2: 5,
  3: 15,
  4: 30,
};

export default function CategoryPage() {
  const { id } = useParams();
  const cat = getCategory(id);
  const ideas = getIdeasByCategory(id);
  const history = useAppStore((s) => s.history);
  const totalCompleted = history.length;

  if (!cat) return <EmptyState title="Категория не найдена" />;

  const isAdult = id === "adult";

  // Если это НЕ 18+, показываем как раньше
  if (!isAdult) {
    return (
      <div className="py-8 space-y-6">
        <Link to="/ideas" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm">
          <ArrowLeft size={16} /> Все идеи
        </Link>
        <div className="space-y-2">
          <h1 className="font-display text-3xl md:text-4xl">
            {cat.emoji} {cat.name}
          </h1>
          <p className="text-gray-400">{cat.description}</p>
        </div>
        {ideas.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // === Логика для 18+ ===
  // группируем идеи по уровням
  const byLevel = { 1: [], 2: [], 3: [], 4: [] };
  ideas.forEach((i) => {
    const lvl = i.level || 1;
    if (byLevel[lvl]) byLevel[lvl].push(i);
  });

  return (
    <div className="py-8 space-y-8">
      <Link to="/ideas" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm">
        <ArrowLeft size={16} /> Все идеи
      </Link>

      <div className="space-y-2">
        <h1 className="font-display text-3xl md:text-4xl">
          {cat.emoji} {cat.name}
        </h1>
        <p className="text-gray-400">{cat.description}</p>
        <div className="text-xs text-amber">
          Выполнено идей всего: {totalCompleted}
        </div>
      </div>

      {[1, 2, 3, 4].map((lvl) => {
        const required = LEVEL_REQUIREMENTS[lvl];
        const isLocked = totalCompleted < required;
        const progress = Math.min(totalCompleted, required);
        const levelIdeas = byLevel[lvl] || [];

        if (levelIdeas.length === 0) return null;

        return (
          <div key={lvl} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl md:text-2xl flex items-center gap-2">
                {isLocked && <Lock size={20} className="text-gray-500" />}
                Уровень {lvl}
              </h2>
              {!isLocked ? (
                <span className="text-xs text-amber font-semibold">
                  🔓 Открыт
                </span>
              ) : (
                <span className="text-xs text-gray-500">
                  {progress} / {required} идей
                </span>
              )}
            </div>

            {isLocked ? (
              <div className="rounded-2xl bg-card border border-border p-8 text-center">
                <Lock className="mx-auto mb-3 text-gray-600" size={32} />
                <p className="text-gray-400 text-sm mb-1">
                  Уровень откроется, когда вы выполните {required} идей
                </p>
                <p className="text-xs text-gray-600">
                  Осталось: {required - totalCompleted}
                </p>
                <div className="mt-4 max-w-xs mx-auto h-2 rounded-full bg-bg overflow-hidden">
                  <div
                    className="h-full bg-amber transition-all"
                    style={{ width: `${(progress / required) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {levelIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}