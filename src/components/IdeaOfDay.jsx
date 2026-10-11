import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { getIdeaOfDay, getTodayLabel } from "../utils/ideaOfDay";
import { getCategory } from "../data/categories";
import { useAppStore } from "../store/useAppStore";
import CategoryBadge from "./CategoryBadge";

export default function IdeaOfDay() {
  const idea = getIdeaOfDay();
  const cat = getCategory(idea.category);
  const completeIdea = useAppStore((s) => s.completeIdea);
  const history = useAppStore((s) => s.history);
  const isDone = history.some((h) => h.ideaId === idea.id);

  return (
    <section className="flex flex-col gap-4 rounded-tile border border-line bg-paper p-5 md:flex-row md:items-center md:gap-6 md:p-6">
      <CategoryBadge category={cat} />

      <div className="min-w-0 flex-1">
        <div className="mb-1 text-sm font-medium text-ink-soft">
          Идея дня, {getTodayLabel()}
        </div>
        <h2 className="font-display text-2xl leading-tight">{idea.title}</h2>
        <p className="mt-1.5 text-ink-soft">{idea.description}</p>
        <Link
          to={`/category/${idea.category}`}
          className="mt-3 inline-block text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Раздел «{cat?.name}»
        </Link>
      </div>

      <div className="shrink-0">
        {isDone ? (
          <div className="inline-flex items-center gap-2 text-sm font-semibold">
            <Check size={16} className="text-cobalt" />
            Уже сделали сегодня
          </div>
        ) : (
          <button
            type="button"
            onClick={() => completeIdea(idea.id)}
            className="w-full rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black md:w-auto"
          >
            Мы сделали
          </button>
        )}
      </div>
    </section>
  );
}
