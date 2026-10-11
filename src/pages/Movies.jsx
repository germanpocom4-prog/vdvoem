import { useState } from "react";
import { movies, moodLabels } from "../data/movies";
import EmptyState from "../components/EmptyState";

export default function Movies() {
  const [mood, setMood] = useState("any");
  const filtered =
    mood === "any" ? movies : movies.filter((m) => m.mood === mood);

  return (
    <div className="py-8 space-y-6">
      <h1 className="font-display text-3xl md:text-4xl">Что посмотреть</h1>
      <p className="text-gray-400">Выбери настроение — получишь фильм и причину.</p>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setMood("any")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition ${
            mood === "any"
              ? "bg-amber text-bg font-semibold"
              : "bg-card border border-border text-gray-400"
          }`}
        >
          Любое
        </button>
        {Object.entries(moodLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setMood(key)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition ${
              mood === key
                ? "bg-amber text-bg font-semibold"
                : "bg-card border border-border text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="rounded-3xl bg-card border border-border p-6"
            >
              <div className="text-xs text-amber mb-2">
                {moodLabels[m.mood]} · {m.year}
              </div>
              <h3 className="font-display text-xl mb-2">{m.title}</h3>
              <p className="text-gray-400 text-sm">{m.why}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}