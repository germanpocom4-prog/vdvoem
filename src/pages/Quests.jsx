import { useState } from "react";
import { motion } from "framer-motion";
import { quests } from "../data/quests";
import { ideas } from "../data/ideas";
import { Check } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { plural } from "../utils/format";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";

function EmojiBadge({ emoji }) {
  return (
    <div
      className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sun text-3xl"
      aria-hidden="true"
    >
      {emoji}
    </div>
  );
}

export default function Quests() {
  const [active, setActive] = useState(null);
  const [doneSteps, setDoneSteps] = useState({});
  const completeIdea = useAppStore((s) => s.completeIdea);

  if (active) {
    const quest = quests.find((q) => q.id === active);
    const allDone = quest.steps.every((_, i) => doneSteps[i]);

    return (
      <div className="space-y-8 py-8 md:py-12">
        <BackLink
          onClick={() => {
            setActive(null);
            setDoneSteps({});
          }}
        >
          Назад
        </BackLink>

        <PageTitle
          badge={<EmojiBadge emoji={quest.emoji} />}
          title={quest.title}
          subtitle={quest.description}
        />

        <ol className="space-y-3">
          {quest.steps.map((step, i) => {
            const idea = ideas.find((x) => x.id === step.ideaId);
            const done = doneSteps[i];
            return (
              <li
                key={i}
                className={`flex items-start gap-4 rounded-tile border bg-paper p-5 transition-colors ${
                  done ? "border-ink" : "border-line"
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
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-display text-lg transition-colors ${
                    done
                      ? "border-ink bg-ink text-white"
                      : "border-line text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {done ? <Check size={20} /> : i + 1}
                </button>
                <div className="min-w-0 flex-1 pt-1">
                  <div className="mb-1 font-semibold">{step.label}</div>
                  {idea && (
                    <p className="text-sm text-ink-soft">{idea.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {allDone && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-card bg-sun p-6 text-center shadow-card"
          >
            <div className="mb-2 text-4xl" aria-hidden="true">
              🎉
            </div>
            <div className="font-display text-2xl">Квест пройден!</div>
            <p className="mt-1">Вы молодцы. Отдохните и обнимитесь.</p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8 md:py-12">
      <PageTitle
        title="Квесты на вечер"
        subtitle="Готовые сценарии из 3 шагов. Просто идите по порядку."
      />

      <div className="grid gap-3 md:grid-cols-2">
        {quests.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setActive(q.id)}
            className="flex items-start gap-4 rounded-tile border border-line bg-paper p-5 text-left transition-colors hover:border-ink/40"
          >
            <EmojiBadge emoji={q.emoji} />
            <div>
              <div className="font-display text-xl">{q.title}</div>
              <p className="text-sm text-ink-soft">{q.description}</p>
              <div className="mt-2 text-sm font-semibold">
                {q.steps.length} {plural(q.steps.length, "шаг", "шага", "шагов")}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
