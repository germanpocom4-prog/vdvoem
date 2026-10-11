import { useFiltersStore } from "../store/useFiltersStore";
import { timeLabel, budgetLabel, moodLabel } from "../utils/format";

const FILTERS = [
  { key: "time", options: ["any", "quick", "evening", "day"], labels: timeLabel, title: "Время" },
  { key: "budget", options: ["any", "free", "low", "high"], labels: budgetLabel, title: "Бюджет" },
  { key: "mood", options: ["any", "fun", "romantic", "intimate", "calm", "adventure"], labels: moodLabel, title: "Настроение" },
];

export default function FilterBar() {
  const filters = useFiltersStore();

  return (
    <div className="space-y-4">
      {FILTERS.map((f) => (
        <div key={f.key}>
          <div className="text-xs uppercase text-gray-500 mb-2 tracking-wider">
            {f.title}
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {f.options.map((opt) => (
              <button
                key={opt}
                onClick={() => filters.setFilter(f.key, opt)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                  filters[f.key] === opt
                    ? "bg-amber text-bg font-semibold"
                    : "bg-card border border-border text-gray-400 hover:text-white"
                }`}
              >
                {f.labels[opt]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}