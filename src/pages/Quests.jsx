import { useState } from "react";
import { motion } from "framer-motion";
import { quests } from "../data/quests";
import { ideas } from "../data/ideas";
import { Check } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export default function Quests() {
  const [active, setActive] = useState(null);
  const [doneSteps, setDoneSteps] = useState({});
  const completeIdea = useAppStore((s) => s.completeIdea);

  if (active) {
    const quest = quests.find((q) => q.id === active);
    const allDone = quest.steps.every((_, i) => doneSteps[i]);

    return (
      <div className="py-8 space-y-6">
        <button
          onClick={() => {
            setActive(null);
            setDoneSteps({});
          }}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Назад
        </button>

        <h1 className="font-display text-3xl">
          {quest.emoji} {quest.title}
        </h1>
        <p className="text-gray-400">{quest.description}</p>

        <div className="space-y-4">
          {quest.steps.map((step, i) => {
            const idea = ideas.find((x) => x.id === step.ideaId);
            const done = doneSteps[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-5 transition ${
                  done ? "bg-amber/5 border-amber/30" : "bg-card border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Шаг {i + 1}</div>
                    <div className="font-semibold mb-1">{step.label}</div>
                    {idea && (
                      <p className="text-sm text-gray-400">{idea.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setDoneSteps((prev) => ({ ...prev, [i]: !prev[i] }));
                      if (!done && idea) completeIdea(idea.id);
                    }}
                    className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition ${
                      done
                        ? "bg-amber border-amber text-bg"
                        : "border-border text-gray-500"
                    }`}
                  >
                    <Check size={18} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {allDone && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-6 rounded-3xl bg-gradient-to-br from-amber/20 to-wine/20 border border-amber/30"
          >
            <div className="text-5xl mb-2">🎉</div>
            <div className="font-display text-xl">Квест пройден!</div>
            <p className="text-gray-300 text-sm mt-1">
              Вы молодцы. Отдохните и обнимитесь.
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="py-8 space-y-6">
      <h1 className="font-display text-3xl md:text-4xl">Квесты на вечер</h1>
      <p className="text-gray-400">
        Готовые сценарии из 3 шагов. Просто идите по порядку.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {quests.map((q) => (
          <button
            key={q.id}
            onClick={() => setActive(q.id)}
            className="text-left rounded-3xl bg-card border border-border p-6 hover:border-amber/50 transition"
          >
            <div className="text-4xl mb-3">{q.emoji}</div>
            <div className="font-display text-xl mb-1">{q.title}</div>
            <p className="text-gray-400 text-sm">{q.description}</p>
            <div className="mt-4 text-xs text-amber">
              {q.steps.length} шага →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}