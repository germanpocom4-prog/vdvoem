import { Link } from "react-router-dom";
import { ideas } from "../data/ideas";
import { categories } from "../data/categories";

export default function AllIdeas() {
  const countByCat = (id) => ideas.filter((i) => i.category === id).length;

  return (
    <div className="py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl">Все идеи</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Выбери категорию — откроется отдельная страница
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/ideas/all"
          className="rounded-3xl bg-card border border-border p-6 hover:border-amber/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">📚</div>
            <div className="text-xs text-amber font-semibold">
              {ideas.length} идей →
            </div>
          </div>
          <div className="font-display text-xl mb-1">Все идеи</div>
          <p className="text-gray-400 text-sm">
            Полный список — от весёлых до 18+
          </p>
        </Link>

        {categories.map((c) => {
          const count = countByCat(c.id);
          return (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="rounded-3xl bg-card border border-border p-6 hover:border-amber/50 transition group relative overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition"
                style={{ background: c.color }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-4xl">{c.emoji}</div>
                  <div className="text-xs text-amber font-semibold">
                    {count} {count === 1 ? "идея" : count < 5 ? "идеи" : "идей"} →
                  </div>
                </div>
                <div className="font-display text-xl mb-1">{c.name}</div>
                <p className="text-gray-400 text-sm">{c.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}