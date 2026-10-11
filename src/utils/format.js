export const timeLabel = {
  quick: "до 30 мин",
  evening: "2–4 часа",
  day: "весь день",
  any: "любое",
};

export const budgetLabel = {
  free: "бесплатно",
  low: "до 50 BYN",
  high: "безлимит",
  any: "любой",
};

export const moodLabel = {
  fun: "весело",
  romantic: "романтично",
  intimate: "близко",
  calm: "спокойно",
  adventure: "приключение",
  any: "любое",
};

// plural(5, "идея", "идеи", "идей") → "идей"
export function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}