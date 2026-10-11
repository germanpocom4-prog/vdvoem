import { Link } from "react-router-dom";
import { getIdeaOfDay, getTodayLabel } from "../utils/ideaOfDay";
import { getCategory } from "../data/categories";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export default function IdeaOfDay() {
  const idea = getIdeaOfDay();
  const cat = getCategory(idea.category);
  const completeIdea = useAppStore((s) => s.completeIdea);
  const history = useAppStore((s) => s.history);
  const isDone = history.some((h) => h.ideaId === idea.id);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-amber/30 bg-gradient-to-br from-amber/10 via-card to-card p-6 md:p-8">
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30"
        style={{ background: cat?.color }}
      />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-amber" />
          <div className="text-xs uppercase tracking-wider text-amber font-semibold">
            Идея дня · {getTodayLabel()}
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-3xl mb-2">{idea.title}</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">{idea.description}</p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={
              idea.category === "adult"
                ? "/category/adult"
                : `/category/${idea.category}`
            }
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            {cat?.emoji} {cat?.name}
          </Link>

          <div className="flex-1" />

          {isDone ? (
            <div className="text-xs text-amber font-semibold">
              ✅ Уже сделали сегодня
            </div>
          ) : (
            <button
              onClick={() => completeIdea(idea.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber text-bg font-semibold text-sm hover:bg-amber/90 transition"
            >
              Мы сделали <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}