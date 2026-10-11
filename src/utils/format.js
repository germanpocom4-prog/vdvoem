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
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}
