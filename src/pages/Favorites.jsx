import { Link } from "react-router-dom";
import { ideas } from "../data/ideas";
import { useAppStore } from "../store/useAppStore";
import IdeaCard from "../components/IdeaCard";
import EmptyState from "../components/EmptyState";
import { ArrowLeft, Heart } from "lucide-react";

export default function Favorites() {
  const favorites = useAppStore((s) => s.favorites);
  const favIdeas = ideas.filter((i) => favorites.includes(i.id));

  return (
    <div className="py-8 space-y-6">
      <Link
        to="/progress"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm"
      >
        <ArrowLeft size={16} /> Прогресс
      </Link>

      <div className="flex items-center gap-3">
        <Heart className="text-wine" size={28} fill="currentColor" />
        <div>
          <h1 className="font-display text-3xl md:text-4xl">Избранное</h1>
          <p className="text-gray-400 text-sm mt-1">
            {favIdeas.length === 0
              ? "Ты пока ничего не сохранил"
              : `Сохранено идей: ${favIdeas.length}`}
          </p>
        </div>
      </div>

      {favIdeas.length === 0 ? (
        <EmptyState
          title="Тут пусто"
          subtitle="Нажми на сердечко у любой идеи — она появится здесь"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}