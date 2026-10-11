import { useState } from "react";
import { movies, moodLabels, typeLabels } from "../data/movies";
import EmptyState from "../components/EmptyState";
import PageTitle from "../components/PageTitle";
import Chip from "../components/Chip";
import Reveal from "../components/Reveal";

function ChipRow({ title, options, value, onChange }) {
  return (
    <div>
      <div className="mb-3 text-sm text-muted">{title}</div>
      <div className="flex flex-wrap gap-2">
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
    <div className="space-y-12 py-16 md:space-y-16 md:py-24">
      <PageTitle
        title="Что посмотреть"
        subtitle="Выбери тип и настроение — получишь идею для вечера"
      />

      <div className="space-y-7">
        <ChipRow title="Тип" options={typeLabels} value={type} onChange={setType} />
        <ChipRow
          title="Настроение"
          options={moodLabels}
          value={mood}
          onChange={setMood}
        />
      </div>

      <div className="-mb-4 text-sm text-muted">Найдено: {filtered.length}</div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Ничего не нашли"
          subtitle="Попробуй другое настроение или тип"
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((m, i) => (
            <Reveal key={m.id} i={i}>
              <article className="card card-hover h-full p-7 md:p-8">
                <div className="mb-4 flex items-center gap-3 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-base leading-none" aria-hidden="true">
                      {m.type === "series" ? "📺" : "🎬"}
                    </span>
                    {m.type === "series" ? "Сериал" : "Фильм"}
                  </span>
                  <span className="rounded-full border border-line px-3 py-0.5 text-xs">
                    {moodLabels[m.mood]}
                  </span>
                </div>
                <h3 className="font-display text-[1.5rem] font-semibold leading-[1.2]">
                  {m.title}
                </h3>
                <div className="mb-3 mt-1 text-sm text-muted">{m.year}</div>
                <p className="text-[15px] text-muted">{m.why}</p>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
