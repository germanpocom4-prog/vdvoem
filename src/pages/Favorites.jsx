import { ideas } from "../data/ideas";
import { useAppStore } from "../store/useAppStore";
import { plural } from "../utils/format";
import IdeaCard from "../components/IdeaCard";
import EmptyState from "../components/EmptyState";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";

export default function Favorites() {
  const favorites = useAppStore((s) => s.favorites);
  const favIdeas = ideas.filter((i) => favorites.includes(i.id));

  return (
    <div className="space-y-8 py-8 md:py-12">
      <BackLink to="/progress">Прогресс</BackLink>

      <PageTitle
        title="Избранное"
        subtitle={
          favIdeas.length === 0
            ? "Ты пока ничего не сохранил"
            : `Сохранено: ${favIdeas.length} ${plural(favIdeas.length, "идея", "идеи", "идей")}`
        }
      />

      {favIdeas.length === 0 ? (
        <EmptyState
          title="Тут пусто"
          subtitle="Нажми на сердечко у любой идеи — она появится здесь"
        />
      ) : (
        <div className="grid items-start gap-4 md:grid-cols-2">
          {favIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
