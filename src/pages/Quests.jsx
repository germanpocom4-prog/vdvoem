import { useState } from "react";
import { motion } from "framer-motion";
import { quests } from "../data/quests";
import { ideas } from "../data/ideas";
import { getCategory } from "../data/categories";
import { Check } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { plural } from "../utils/format";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";
import Reveal from "../components/Reveal";
import Stripe from "../components/Stripe";

// Цвет полосы квеста берём по категории его первой идеи
function questColor(quest) {
  const first = ideas.find((x) => x.id === quest.steps[0]?.ideaId);
  return getCategory(first?.category)?.color;
}

export default function Quests() {
  const [active, setActive] = useState(null);
  const [doneSteps, setDoneSteps] = useState({});
  const completeIdea = useAppStore((s) => s.completeIdea);

  if (active) {
    const quest = quests.find((q) => q.id === active);
    const allDone = quest.steps.every((_, i) => doneSteps[i]);

    return (
      <div className="space-y-12 py-16 md:space-y-16 md:py-24">
        <div className="space-y-8">
          <BackLink
            onClick={() => {
              setActive(null);
              setDoneSteps({});
            }}
          >
            Назад
          </BackLink>

          <PageTitle
            badge={
              <span className="text-xl leading-none" aria-hidden="true">
                {quest.emoji}
              </span>
            }
            title={quest.title}
            subtitle={quest.description}
          />
        </div>

        <ol className="space-y-4">
          {quest.steps.map((step, i) => {
            const idea = ideas.find((x) => x.id === step.ideaId);
            const done = doneSteps[i];
            return (
              <Reveal key={i} i={i} className="">
                <li
                  className={`card flex items-start gap-5 p-6 ${
                    done ? "!border-accent" : ""
                  }`}
                >
                  <button
                    type="button"
                    aria-pressed={!!done}
                    aria-label={`Шаг ${i + 1}: ${step.label}`}
                    onClick={() => {
                      setDoneSteps((prev) => ({ ...prev, [i]: !prev[i] }));
                      if (!done && idea) completeIdea(idea.id);
                    }}
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-lg transition-colors duration-300 ${
                      done
                        ? "border-accent bg-accent text-ivory"
                        : "border-line text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {done ? <Check size={18} /> : i + 1}
                  </button>
                  <div className="min-w-0 flex-1 pt-1.5">
                    <div className="mb-1 font-medium">{step.label}</div>
                    {idea && (
                      <p className="text-[15px] text-muted">{idea.description}</p>
                    )}
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>

        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card border-accent p-8 text-center"
          >
            <div className="font-display text-[1.75rem] font-semibold">
              Квест пройден!
            </div>
            <p className="mt-2 text-muted">
              Вы молодцы. Отдохните и обнимитесь.
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12 py-16 md:space-y-16 md:py-24">
      <PageTitle
        title="Квесты на вечер"
        subtitle="Готовые сценарии из 3 шагов. Просто идите по порядку."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {quests.map((q, i) => (
          <Reveal key={q.id} i={i}>
            <button
              type="button"
              onClick={() => setActive(q.id)}
              className="card card-hover relative block h-full w-full overflow-hidden p-7 pl-8 text-left md:p-8 md:pl-9"
            >
              <Stripe color={questColor(q)} />
              <div className="mb-4 flex items-center justify-between text-sm text-muted">
                <span className="text-xl leading-none" aria-hidden="true">
                  {q.emoji}
                </span>
                <span>
                  {q.steps.length}{" "}
                  {plural(q.steps.length, "шаг", "шага", "шагов")}
                </span>
              </div>
              <div className="mb-1 font-display text-[1.5rem] font-semibold">
                {q.title}
              </div>
              <p className="text-[15px] text-muted">{q.description}</p>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
