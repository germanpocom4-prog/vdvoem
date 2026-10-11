// Небольшой эмодзи категории (20px) — без цветных плашек
export default function CategoryBadge({ category }) {
  return (
    <span className="text-xl leading-none" aria-hidden="true">
      {category?.emoji}
    </span>
  );
}
