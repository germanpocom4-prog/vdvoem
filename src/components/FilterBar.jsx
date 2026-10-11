import { useFiltersStore } from "../store/useFiltersStore";
import { timeLabel, budgetLabel, moodLabel } from "../utils/format";
import Chip from "./Chip";

const FILTERS = [
  { key: "time", options: ["any", "quick", "evening", "day"], labels: timeLabel, title: "Время" },
  { key: "budget", options: ["any", "free", "low", "high"], labels: budgetLabel, title: "Бюджет" },
  { key: "mood", options: ["any", "fun", "romantic", "intimate", "calm", "adventure"], labels: moodLabel, title: "Настроение" },
];

export default function FilterBar() {
  const filters = useFiltersStore();

  return (
    <div className="space-y-5">
      {FILTERS.map((f) => (
        <div key={f.key}>
          <div className="mb-2 text-sm font-semibold">{f.title}</div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
            {f.options.map((opt) => (
              <Chip
                key={opt}
                active={filters[f.key] === opt}
                onClick={() => filters.setFilter(f.key, opt)}
              >
                {f.labels[opt]}
              </Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
