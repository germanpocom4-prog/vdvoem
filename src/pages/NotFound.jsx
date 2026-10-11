import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-4">
      <div className="text-6xl">🌙</div>
      <h1 className="font-display text-3xl">Страница не найдена</h1>
      <Link to="/" className="inline-block px-6 py-3 rounded-2xl bg-amber text-bg font-semibold">
        На главную
      </Link>
    </div>
  );
}