import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <div className="py-10 text-center">
      <EmptyState
        title="Страница не найдена"
        subtitle="Такой карты в колоде нет. Вернёмся к началу?"
      />
      <Link
        to="/"
        className="inline-block rounded-2xl bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-black"
      >
        На главную
      </Link>
    </div>
  );
}
