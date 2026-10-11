import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { ideas } from "../data/ideas";
import { getCategory } from "../data/categories";
import { plural } from "../utils/format";
import EmptyState from "../components/EmptyState";
import PageTitle from "../components/PageTitle";
import CategoryBadge from "../components/CategoryBadge";
import Reveal from "../components/Reveal";
import { Flame, Heart, Calendar } from "lucide-react";

export default function Progress() {
  const { streak, history, favorites, resetAll } = useAppStore();

  const favoriteIdeas = ideas.filter((i) => favorites.includes(i.id));
  const recent = history.slice(0, 20);

  return (
    <div className="space-y-16 py-16 md:space-y-20 md:py-24">
      <PageTitle title="Наш прогресс" subtitle="Всё, что вы сделали вместе" />

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-3 md:gap-5">
        <Reveal i={0}>
          <div className="card h-full p-5 md:p-7">
            <Flame size={18} className="mb-4 text-accent" />
            <div className="font-display text-4xl font-semibold leading-none">
              {streak}
            </div>
            <div className="mt-3 text-xs text-muted md:text-sm">
              {plural(streak, "день подряд", "дня подряд", "дней подряд")}
            </div>
          </div>
        </Reveal>

        <Reveal i={1}>
          <div className="card h-full p-5 md:p-7">
            <Calendar size={18} className="mb-4 text-accent" />
            <div className="font-display text-4xl font-semibold leading-none">
              {history.length}
            </div>
            <div className="mt-3 text-xs text-muted md:text-sm">
              всего сделано
            </div>
          </div>
        </Reveal>

        <Reveal i={2}>
          <Link
            to="/favorites"
            className="card card-hover block h-full p-5 md:p-7"
          >
            <Heart size={18} className="mb-4 text-wine" />
            <div className="font-display text-4xl font-semibold leading-none">
              {favorites.length}
            </div>
            <div className="mt-3 text-xs text-muted md:text-sm">
              в избранном
            </div>
          </Link>
        </Reveal>
      </div>

      {/* Последние дела */}
      <section>
        <h2 className="mb-6 font-display text-[1.75rem] font-semibold">
          Последние дела
        </h2>
        {recent.length === 0 ? (
          <EmptyState
            title="Пока ничего"
            subtitle="Сделайте что-нибудь из идей!"
          />
        ) : (
          <div className="space-y-3">
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
                <Reveal key={i} i={i} className="">
                  <div className="card flex items-center gap-4 px-5 py-4">
                    <CategoryBadge category={cat} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{idea.title}</div>
                      <div className="text-sm text-muted">
                        {day}, {time}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* Избранное (предпросмотр) */}
      {favoriteIdeas.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-display text-[1.75rem] font-semibold">
              Избранное
            </h2>
            <Link
              to="/favorites"
              className="text-sm text-accent underline-offset-4 transition-colors duration-300 hover:underline"
            >
              Всё избранное
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {favoriteIdeas.slice(0, 4).map((idea, i) => (
              <Reveal key={idea.id} i={i}>
                <div className="card h-full p-6">
                  <div className="mb-1 font-medium">{idea.title}</div>
                  <p className="line-clamp-2 text-sm text-muted">
                    {idea.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Опасная зона */}
      {history.length > 0 && (
        <div className="border-t border-line pt-8">
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
            className="text-sm text-muted underline underline-offset-4 transition-colors duration-300 hover:text-wine"
          >
            Сбросить весь прогресс
          </button>
        </div>
      )}
    </div>
  );
}
