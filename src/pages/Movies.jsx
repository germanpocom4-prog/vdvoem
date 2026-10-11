import { useState } from "react";
import { movies, moodLabels, typeLabels } from "../data/movies";
import EmptyState from "../components/EmptyState";
import PageTitle from "../components/PageTitle";
import Chip from "../components/Chip";

function ChipRow({ title, options, value, onChange }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
        {Object.entries(options).map(([key, label]) => (
          <Chip key={key} active={value === key} onClick={() => onChange(key)}>
            {label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default function Movies() {
  const [mood, setMood] = useState("any");
  const [type, setType] = useState("any");

  const filtered = movies.filter((m) => {
    const byMood = mood === "any" || m.mood === mood;
    const byType = type === "any" || m.type === type;
    return byMood && byType;
  });

  return (
    <div className="space-y-8 py-8 md:py-12">
      <PageTitle
        title="Что посмотреть"
        subtitle="Выбери тип и настроение — получишь идею для вечера"
      />

      <div className="space-y-5">
        <ChipRow title="Тип" options={typeLabels} value={type} onChange={setType} />
        <ChipRow
          title="Настроение"
          options={moodLabels}
          value={mood}
          onChange={setMood}
        />
      </div>

      <div className="text-sm text-ink-soft">Найдено: {filtered.length}</div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Ничего не нашли"
          subtitle="Попробуй другое настроение или тип"
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((m) => (
            <article
              key={m.id}
              className="rounded-tile border border-line bg-paper p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: m.type === "series" ? "#BBA8FF" : "#8EC9FF" }}
                >
                  {m.type === "series" ? "📺 Сериал" : "🎬 Фильм"}
                </span>
                <span className="text-sm text-ink-soft">
                  {moodLabels[m.mood]}
                </span>
              </div>
              <h3 className="font-display text-xl leading-tight">{m.title}</h3>
              <div className="mb-3 mt-1 text-sm text-ink-soft">{m.year}</div>
              <p className="text-sm">{m.why}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
