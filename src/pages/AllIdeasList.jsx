import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ideas } from "../data/ideas";
import { plural } from "../utils/format";
import IdeaCard from "../components/IdeaCard";
import PageTitle from "../components/PageTitle";

export default function AllIdeasList() {
  const ideaWord = (n) => plural(n, "идея", "идеи", "идей");

  return (
    <div className="space-y-8 py-8 md:py-12">
      <Link
        to="/ideas"
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} /> К категориям
      </Link>

      <PageTitle
        title="Все идеи"
        subtitle={`${ideas.length} ${ideaWord(ideas.length)} — от весёлых до 18+`}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}