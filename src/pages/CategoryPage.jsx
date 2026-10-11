import { useParams } from "react-router-dom";
import { getCategory } from "../data/categories";
import { getIdeasByCategory } from "../data/ideas";
import IdeaCard from "../components/IdeaCard";
import EmptyState from "../components/EmptyState";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";
import CategoryBadge from "../components/CategoryBadge";
import { Lock, Unlock } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { plural } from "../utils/format";

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

  // Если это НЕ 18+, показываем обычную сетку карт
  if (!isAdult) {
    return (
      <div className="space-y-8 py-8 md:py-12">
        <BackLink to="/ideas">Все идеи</BackLink>
        <PageTitle
          badge={<CategoryBadge category={cat} />}
          title={cat.name}
          subtitle={cat.description}
        />
        {ideas.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid items-start gap-4 md:grid-cols-2">
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
    <div className="space-y-10 py-8 md:py-12">
      <div className="space-y-8">
        <BackLink to="/ideas">Все идеи</BackLink>
        <PageTitle
          badge={<CategoryBadge category={cat} />}
          title={cat.name}
          subtitle={`${cat.description}. Выполнено идей всего: ${totalCompleted}`}
        />
      </div>

      {[1, 2, 3, 4].map((lvl) => {
        const required = LEVEL_REQUIREMENTS[lvl];
        const isLocked = totalCompleted < required;
        const progress = Math.min(totalCompleted, required);
        const levelIdeas = byLevel[lvl] || [];

        if (levelIdeas.length === 0) return null;

        return (
          <section key={lvl} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 font-display text-2xl">
                {isLocked && <Lock size={20} className="text-ink-soft" />}
                Уровень {lvl}
              </h2>
              {!isLocked ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                  <Unlock size={16} className="text-cobalt" />
                  Открыт
                </span>
              ) : (
                <span className="text-sm text-ink-soft">
                  {progress} из {required} {plural(required, "идеи", "идей", "идей")}
                </span>
              )}
            </div>

            {isLocked ? (
              <div className="rounded-tile border border-dashed border-line p-8 text-center">
                <Lock className="mx-auto mb-3 text-ink-soft" size={28} />
                <p className="mb-1 text-sm">
                  Уровень откроется, когда вы выполните {required}{" "}
                  {plural(required, "идею", "идеи", "идей")}
                </p>
                <p className="text-sm text-ink-soft">
                  Осталось: {required - totalCompleted}
                </p>
                <div className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full bg-ink transition-all"
                    style={{ width: `${(progress / required) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid items-start gap-4 md:grid-cols-2">
                {levelIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
