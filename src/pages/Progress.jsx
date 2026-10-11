import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { ideas } from "../data/ideas";
import EmptyState from "../components/EmptyState";
import { Flame, Heart, Calendar } from "lucide-react";

export default function Progress() {
  const { streak, history, favorites, resetAll } = useAppStore();

  const favoriteIdeas = ideas.filter((i) => favorites.includes(i.id));
  const recent = history.slice(0, 20);

  const streakLabel = () => {
    if (streak === 0) return "дней подряд";
    if (streak === 1) return "день подряд";
    if (streak < 5) return "дня подряд";
    return "дней подряд";
  };

  return (
    <div className="py-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl">Наш прогресс</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Всё, что вы сделали вместе
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-card border border-border p-4 text-center">
          <Flame className="mx-auto mb-2 text-amber" size={22} />
          <div className="font-display text-2xl">{streak}</div>
          <div className="text-xs text-gray-500 mt-1">{streakLabel()}</div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4 text-center">
          <Calendar className="mx-auto mb-2 text-amber" size={22} />
          <div className="font-display text-2xl">{history.length}</div>
          <div className="text-xs text-gray-500 mt-1">всего сделано</div>
        </div>

        <Link
          to="/favorites"
          className="rounded-2xl bg-card border border-border p-4 text-center hover:border-wine/50 transition"
        >
          <Heart className="mx-auto mb-2 text-wine" size={22} />
          <div className="font-display text-2xl">{favorites.length}</div>
          <div className="text-xs text-gray-500 mt-1">в избранном →</div>
        </Link>
      </div>

      {/* Последние дела */}
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
              const date = new Date(h.date);
              const day = date.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
              });
              const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-card border border-border p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{idea.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {day} · {time}
                    </div>
                  </div>
                  <div className="text-2xl shrink-0">
                    {idea.category === "funny" && "🎉"}
                    {idea.category === "romantic" && "💕"}
                    {idea.category === "adult" && "🔥"}
                    {idea.category === "drinks" && "🍸"}
                    {idea.category === "hardcore" && "🏆"}
                    {idea.category === "distance" && "🌍"}
                    {idea.category === "makeup" && "🕊️"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Избранное (предпросмотр) */}
      {favoriteIdeas.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl">Избранное</h2>
            <Link
              to="/favorites"
              className="text-amber text-sm hover:underline"
            >
              Все →
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {favoriteIdeas.slice(0, 4).map((idea) => (
              <div
                key={idea.id}
                className="rounded-2xl bg-card border border-border p-4"
              >
                <div className="font-medium mb-1">{idea.title}</div>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {idea.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Опасная зона */}
      {history.length > 0 && (
        <div className="pt-6 border-t border-border">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Точно сбросить всё? Прогресс, стрик и избранное удалятся."
                )
              ) {
                resetAll();
              }
            }}
            className="text-xs text-gray-500 hover:text-wine transition"
          >
            Сбросить весь прогресс
          </button>
        </div>
      )}
    </div>
  );
}