import { useParams } from "react-router-dom";
import { getCategory } from "../data/categories";
import { getIdeasByCategory } from "../data/ideas";
import IdeaCard from "../components/IdeaCard";
import EmptyState from "../components/EmptyState";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";
import CategoryBadge from "../components/CategoryBadge";
import Reveal from "../components/Reveal";
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
      <div className="space-y-12 py-16 md:space-y-16 md:py-24">
        <div className="space-y-8">
          <BackLink to="/ideas">Все идеи</BackLink>
          <PageTitle
            badge={<CategoryBadge category={cat} />}
            title={cat.name}
            subtitle={cat.description}
          />
        </div>
        {ideas.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {ideas.map((idea, i) => (
              <Reveal key={idea.id} i={i}>
                <IdeaCard idea={idea} />
              </Reveal>
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
    <div className="space-y-16 py-16 md:space-y-24 md:py-24">
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
          <section key={lvl} className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-3 font-display text-[1.75rem] font-semibold">
                {isLocked && <Lock size={20} className="text-muted" />}
                Уровень {lvl}
              </h2>
              {!isLocked ? (
                <span className="inline-flex items-center gap-2 text-sm text-accent">
                  <Unlock size={16} />
                  Открыт
                </span>
              ) : (
                <span className="text-sm text-muted">
                  {progress} из {required}{" "}
                  {plural(required, "идеи", "идей", "идей")}
                </span>
              )}
            </div>

            {isLocked ? (
              <div className="rounded-2xl border border-dashed border-line p-10 text-center">
                <Lock className="mx-auto mb-4 text-muted" size={28} />
                <p className="mb-1 text-[15px]">
                  Уровень откроется, когда вы выполните {required}{" "}
                  {plural(required, "идею", "идеи", "идей")}
                </p>
                <p className="text-sm text-muted">
                  Осталось: {required - totalCompleted}
                </p>
                <div className="mx-auto mt-5 h-1 max-w-xs overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full bg-accent transition-all duration-700"
                    style={{ width: `${(progress / required) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {levelIdeas.map((idea, i) => (
                  <Reveal key={idea.id} i={i}>
                    <IdeaCard idea={idea} />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
