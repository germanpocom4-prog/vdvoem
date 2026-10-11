import { useState } from "react";
import { movies, moodLabels, typeLabels } from "../data/movies";
import EmptyState from "../components/EmptyState";

export default function Movies() {
  const [mood, setMood] = useState("any");
  const [type, setType] = useState("any");

  const filtered = movies.filter((m) => {
    const byMood = mood === "any" || m.mood === mood;
    const byType = type === "any" || m.type === type;
    return byMood && byType;
  });

  return (
    <div className="py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl">Что посмотреть</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Выбери тип и настроение — получишь идею для вечера
        </p>
      </div>

      {/* Тип: всё / фильмы / сериалы */}
      <div>
        <div className="text-xs uppercase text-gray-500 mb-2 tracking-wider">
          Тип
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {Object.entries(typeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setType(key)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition ${
                type === key
                  ? "bg-amber text-bg font-semibold"
                  : "bg-card border border-border text-gray-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Настроение */}
      <div>
        <div className="text-xs uppercase text-gray-500 mb-2 tracking-wider">
          Настроение
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {Object.entries(moodLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMood(key)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition ${
                mood === key
                  ? "bg-amber text-bg font-semibold"
                  : "bg-card border border-border text-gray-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Список */}
      <div className="text-sm text-gray-500">
        Найдено: {filtered.length}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Ничего не нашли"
          subtitle="Попробуй другое настроение или тип"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="rounded-3xl bg-card border border-border p-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber/10 text-amber">
                  {m.type === "series" ? "📺 Сериал" : "🎬 Фильм"}
                </span>
                <span className="text-xs text-gray-500">
                  {moodLabels[m.mood]}
                </span>
              </div>
              <h3 className="font-display text-xl mb-1">{m.title}</h3>
              <div className="text-xs text-gray-500 mb-3">{m.year}</div>
              <p className="text-gray-400 text-sm">{m.why}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}