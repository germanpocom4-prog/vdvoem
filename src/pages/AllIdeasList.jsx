import { ideas } from "../data/ideas";
import { plural } from "../utils/format";
import IdeaCard from "../components/IdeaCard";
import PageTitle from "../components/PageTitle";
import BackLink from "../components/BackLink";
import Reveal from "../components/Reveal";

export default function AllIdeasList() {
  const ideaWord = (n) => plural(n, "идея", "идеи", "идей");

  return (
    <div className="space-y-12 py-16 md:space-y-16 md:py-24">
      <div className="space-y-8">
        <BackLink to="/ideas">К категориям</BackLink>
        <PageTitle
          title="Все идеи"
          subtitle={`${ideas.length} ${ideaWord(ideas.length)} — от весёлых до 18+`}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {ideas.map((idea, i) => (
          <Reveal key={idea.id} i={i}>
            <IdeaCard idea={idea} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}