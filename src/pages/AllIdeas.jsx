import { Link } from "react-router-dom";
import { ideas } from "../data/ideas";
import { categories } from "../data/categories";
import { plural } from "../utils/format";
import PageTitle from "../components/PageTitle";
import Reveal from "../components/Reveal";

const tile = "card card-hover block h-full p-7 md:p-8";

export default function AllIdeas() {
  const countByCat = (id) => ideas.filter((i) => i.category === id).length;
  const ideaWord = (n) => plural(n, "идея", "идеи", "идей");

  return (
    <div className="space-y-12 py-16 md:space-y-16 md:py-24">
      <PageTitle
        title="Все идеи"
        subtitle="Выбери категорию — откроется отдельная страница"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Reveal i={0}>
          <Link to="/ideas/all" className={tile}>
            <div className="mb-4 flex items-center justify-between text-sm text-muted">
              <span className="text-xl leading-none" aria-hidden="true">
                📚
              </span>
              <span>
                {ideas.length} {ideaWord(ideas.length)}
              </span>
            </div>
            <div className="mb-1 font-display text-[1.5rem] font-semibold">
              Все идеи
            </div>
            <p className="text-[15px] text-muted">
              Полный список — от весёлых до 18+
            </p>
          </Link>
        </Reveal>

        {categories.map((c, idx) => {
          const count = countByCat(c.id);
          return (
            <Reveal key={c.id} i={idx + 1}>
              <Link to={`/category/${c.id}`} className={tile}>
                <div className="mb-4 flex items-center justify-between text-sm text-muted">
                  <span className="text-xl leading-none" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <span>
                    {count} {ideaWord(count)}
                  </span>
                </div>
                <div className="mb-1 font-display text-[1.5rem] font-semibold">
                  {c.name}
                </div>
                <p className="text-[15px] text-muted">{c.description}</p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
