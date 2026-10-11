import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { ideas } from "../data/ideas";
import { getCategory } from "../data/categories";
import { plural } from "../utils/format";
import EmptyState from "../components/EmptyState";
import PageTitle from "../components/PageTitle";
import CategoryBadge from "../components/CategoryBadge";
import { Flame, Heart, Calendar } from "lucide-react";

export default function Progress() {
  const { streak, history, favorites, resetAll } = useAppStore();

  const favoriteIdeas = ideas.filter((i) => favorites.includes(i.id));
  const recent = history.slice(0, 20);

  return (
    <div className="space-y-10 py-8 md:py-12">
      <PageTitle title="Наш прогресс" subtitle="Всё, что вы сделали вместе" />

      {/* Статистика: стрик главный, поэтому он залит цветом */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-tile bg-cherry p-4 text-white md:p-5">
          <Flame size={20} className="mb-3" />
          <div className="font-display text-4xl leading-none">{streak}</div>
          <div className="mt-2 text-xs md:text-sm">
            {plural(streak, "день подряд", "дня подряд", "дней подряд")}
          </div>
        </div>

        <div className="rounded-tile border border-line bg-paper p-4 md:p-5">
          <Calendar size={20} className="mb-3 text-cobalt" />
          <div className="font-display text-4xl leading-none">
            {history.length}
          </div>
          <div className="mt-2 text-xs text-ink-soft md:text-sm">
            всего сделано
          </div>
        </div>

        <Link
          to="/favorites"
          className="rounded-tile border border-line bg-paper p-4 transition-colors hover:border-ink/40 md:p-5"
        >
          <Heart size={20} className="mb-3 text-cherry" />
          <div className="font-display text-4xl leading-none">
            {favorites.length}
          </div>
          <div className="mt-2 text-xs text-ink-soft md:text-sm">
            в избранном
          </div>
        </Link>
      </div>

      {/* Последние дела */}
      <section>
        <h2 className="mb-4 font-display text-2xl">Последние дела</h2>
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
              const cat = getCategory(idea.category);
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
                  className="flex items-center gap-3 rounded-tile border border-line bg-paper p-3 pr-4"
                >
                  <CategoryBadge category={cat} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{idea.title}</div>
                    <div className="mt-0.5 text-sm text-ink-soft">
                      {day}, {time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Избранное (предпросмотр) */}
      {favoriteIdeas.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl">Избранное</h2>
            <Link
              to="/favorites"
              className="text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              Всё избранное
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {favoriteIdeas.slice(0, 4).map((idea) => (
              <div
                key={idea.id}
                className="rounded-tile border border-line bg-paper p-4"
              >
                <div className="mb-1 font-medium">{idea.title}</div>
                <p className="line-clamp-2 text-sm text-ink-soft">
                  {idea.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Опасная зона */}
      {history.length > 0 && (
        <div className="border-t border-line pt-6">
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Точно сбросить всё? Прогресс, стрик и избранное удалятся."
                )
              ) {
                resetAll();
              }
            }}
            className="text-sm text-ink-soft underline underline-offset-4 transition-colors hover:text-cherry"
          >
            Сбросить весь прогресс
          </button>
        </div>
      )}
    </div>
  );
}
