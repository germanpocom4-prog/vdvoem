// color — приглушённый оттенок категории (полоса слева у карточки),
// fg — цвет текста на этом оттенке
export const categories = [
  { id: "funny", name: "Весёлые", emoji: "🎉", color: "#E5C99A", fg: "#2A2520", description: "Игры, челленджи, ржач" },
  { id: "romantic", name: "Романтика", emoji: "💕", color: "#D9A5A0", fg: "#2A2520", description: "Свидания, сюрпризы" },
  { id: "adult", name: "18+", emoji: "🔥", color: "#8B3A3A", fg: "#FBF8F3", description: "Только для взрослых" },
  { id: "drinks", name: "Выпивка", emoji: "🍸", color: "#B8A5B0", fg: "#2A2520", description: "Игры и коктейли" },
  { id: "movies", name: "Что посмотреть", emoji: "🎬", color: "#C9B79C", fg: "#2A2520", description: "Кино под настроение" },
  { id: "hardcore", name: "Сложные", emoji: "🏆", color: "#A8B096", fg: "#2A2520", description: "Выезд и приключения" },
  { id: "distance", name: "На расстоянии", emoji: "🌍", color: "#A5B0BC", fg: "#2A2520", description: "Когда вы не вместе" },
  { id: "makeup", name: "Помириться", emoji: "🕊️", color: "#C5B5D5", fg: "#2A2520", description: "Когда поссорились" },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
