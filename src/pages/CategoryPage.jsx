import { useParams, Link } from "react-router-dom";
import { getCategory } from "../data/categories";
import { getIdeasByCategory } from "../data/ideas";
import IdeaCard from "../components/IdeaCard";
import EmptyState from "../components/EmptyState";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const { id } = useParams();
  const cat = getCategory(id);
  const ideas = getIdeasByCategory(id);

  if (!cat) return <EmptyState title="Категория не найдена" />;

  return (
    <div className="py-8 space-y-6">
      <Link
        to="/ideas"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm"
      >
        <ArrowLeft size={16} /> Все идеи
      </Link>

      <div className="space-y-2">
        <h1 className="font-display text-3xl md:text-4xl">
          {cat.emoji} {cat.name}
        </h1>
        <p className="text-gray-400">{cat.description}</p>
      </div>

      {ideas.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}