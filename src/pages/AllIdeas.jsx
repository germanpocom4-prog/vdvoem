import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { ideas } from "../data/ideas";
import { categories } from "../data/categories";
import { plural } from "../utils/format";
import PageTitle from "../components/PageTitle";
import CategoryBadge from "../components/CategoryBadge";

const tile =
  "flex items-start gap-4 rounded-tile border border-line bg-paper p-5 transition-colors hover:border-ink/40";

export default function AllIdeas() {
  const countByCat = (id) => ideas.filter((i) => i.category === id).length;
  const ideaWord = (n) => plural(n, "идея", "идеи", "идей");

  return (
    <div className="space-y-8 py-8 md:py-12">
      <PageTitle
        title="Все идеи"
        subtitle="Выбери категорию — откроется отдельная страница"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <Link to="/ideas/all" className={tile}>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-white">
            <Layers size={26} />
          </div>
          <div>
            <div className="font-display text-xl">Все идеи</div>
            <p className="text-sm text-ink-soft">
              Полный список — от весёлых до 18+
            </p>
            <div className="mt-2 text-sm font-semibold">
              {ideas.length} {ideaWord(ideas.length)}
            </div>
          </div>
        </Link>

        {categories.map((c) => {
          const count = countByCat(c.id);
          return (
            <Link key={c.id} to={`/category/${c.id}`} className={tile}>
              <CategoryBadge category={c} />
              <div>
                <div className="font-display text-xl">{c.name}</div>
                <p className="text-sm text-ink-soft">{c.description}</p>
                <div className="mt-2 text-sm font-semibold">
                  {count} {ideaWord(count)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
