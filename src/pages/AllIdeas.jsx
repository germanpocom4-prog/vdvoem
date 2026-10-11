import { useState } from "react";
import { ideas } from "../data/ideas";
import { categories } from "../data/categories";
import IdeaCard from "../components/IdeaCard";
import EmptyState from "../components/EmptyState";

export default function AllIdeas() {
  const [activeCat, setActiveCat] = useState("all");
  const filtered =
    activeCat === "all" ? ideas : ideas.filter((i) => i.category === activeCat);

  return (
    <div className="py-8 space-y-6">
      <h1 className="font-display text-3xl md:text-4xl">Все идеи</h1>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setActiveCat("all")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition ${
            activeCat === "all"
              ? "bg-amber text-bg font-semibold"
              : "bg-card border border-border text-gray-400"
          }`}
        >
          Все ({ideas.length})
        </button>
        {categories.filter((c) => c.id !== "movies").map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition ${
              activeCat === c.id
                ? "bg-amber text-bg font-semibold"
                : "bg-card border border-border text-gray-400"
            }`}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}