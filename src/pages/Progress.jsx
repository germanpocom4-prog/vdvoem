import { useAppStore } from "../store/useAppStore";
import { ideas } from "../data/ideas";
import EmptyState from "../components/EmptyState";
import { Flame, Heart, Calendar } from "lucide-react";

export default function Progress() {
  const { streak, history, favorites, resetAll } = useAppStore();

  const favoriteIdeas = ideas.filter((i) => favorites.includes(i.id));
  const recent = history.slice(0, 20);

  return (
    <div className="py-8 space-y-8">
      <h1 className="font-display text-3xl md:text-4xl">Наш прогресс</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-card border border-border p-4 text-center">
          <Flame className="mx-auto mb-2 text-amber" size={22} />
          <div className="font-display text-2xl">{streak}</div>
          <div className="text-xs text-gray-500 mt-1">дней подряд</div>
        </div>
        <div className="rounded-2xl bg-card border border-border p-4 text-center">
          <Calendar className="mx-auto mb-2 text-amber" size={22} />
          <div className="font-display text-2xl">{history.length}</div>
          <div className="text-xs text-gray-500 mt-1">всего сделано</div>
        </div>
        <div className="rounded-2xl bg-card border border-border p-4 text-center">
          <Heart className="mx-auto mb-2 text-wine" size={22} />
          <div className="font-display text-2xl">{favorites.length}</div>
          <div className="text-xs text-gray-500 mt-1">в избранном</div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl mb-3">Последние дела</h2>
        {recent.length === 0 ? (
          <EmptyState
            title="Пока ничего"
            subtitle="Сделайте что-нибудь из идей!"
          />
        ) : (
          <div className="space-y-2">
            {recent.map((h, i) => {
              const idea = ideas.find((x) => x.id === h.ideaId);
              if (!idea) return null;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-card border border-border p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-sm">{idea.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {new Date(h.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="text-2xl">✅</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {favoriteIdeas.length > 0 && (
        <div>
          <h2 className="font-display text-xl mb-3">Избранное</h2>
          <div className="space-y-2">
            {favoriteIdeas.map((idea) => (
              <div
                key={idea.id}
                className="rounded-2xl bg-card border border-border p-4"
              >
                <div className="font-semibold text-sm">{idea.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {idea.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <button
          onClick={() => {
            if (confirm("Точно сбросить всю историю и стрик?")) resetAll();
          }}
          className="text-xs text-gray-500 hover:text-wine transition"
        >
          Сбросить всё
        </button>
      )}
    </div>
  );
}