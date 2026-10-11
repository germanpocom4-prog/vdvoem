import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <section className="card card-hover p-7 md:p-8">
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-accent">
        Идея дня · {getTodayLabel()}
      </div>

      <h2 className="font-display text-[1.75rem] font-semibold leading-[1.2]">
        {idea.title}
      </h2>
      <p className="mt-3 text-[15px] text-muted md:text-base">
        {idea.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to={`/category/${idea.category}`}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent"
        >
          <CategoryBadge category={cat} />
          {cat?.name}
        </Link>

        {isDone ? (
          <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
            <Check size={16} />
            Уже сделали сегодня
          </div>
        ) : (
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => completeIdea(idea.id)}
            className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-ivory shadow-cta transition-[background-color,box-shadow] duration-300 hover:bg-accent-strong hover:shadow-cta-hover"
          >
            Мы сделали
          </motion.button>
        )}
      </div>
    </section>
  );
}
