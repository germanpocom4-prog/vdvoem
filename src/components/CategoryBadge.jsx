// Квадратный значок категории: заливка цветом масти + эмодзи
export default function CategoryBadge({ category, size = "md" }) {
  const sizes = {
    sm: "h-10 w-10 rounded-xl text-xl",
    md: "h-14 w-14 rounded-2xl text-3xl",
  };
  return (
    <div
      className={`grid shrink-0 place-items-center ${sizes[size]}`}
      style={{ background: category?.color || "#DDD6EC" }}
      aria-hidden="true"
    >
      {category?.emoji}
    </div>
  );
}
