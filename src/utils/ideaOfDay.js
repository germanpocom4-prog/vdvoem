import { ideas } from "../data/ideas";

// Детерминированный выбор идеи по дате: одна и та же в течение дня
export function getIdeaOfDay() {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  // Простая хеш-функция
  const index = seed % ideas.length;
  return ideas[index];
}

// Форматируем дату красиво
export function getTodayLabel() {
  const today = new Date();
  const day = today.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
  return day;
}