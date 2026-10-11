export const categories = [
  { id: "funny", name: "Весёлые", emoji: "🎉", color: "#f59e0b", description: "Игры, челленджи, ржач" },
  { id: "romantic", name: "Романтика", emoji: "💕", color: "#ec4899", description: "Свидания, сюрпризы" },
  { id: "adult", name: "18+", emoji: "🔥", color: "#dc2626", description: "Только для взрослых" },
  { id: "drinks", name: "Выпивка", emoji: "🍸", color: "#8b5cf6", description: "Игры и коктейли" },
  { id: "movies", name: "Что посмотреть", emoji: "🎬", color: "#06b6d4", description: "Кино под настроение" },
  { id: "hardcore", name: "Сложные", emoji: "🏆", color: "#10b981", description: "Выезд и приключения" },
  { id: "distance", name: "На расстоянии", emoji: "🌍", color: "#3b82f6", description: "Когда вы не вместе" },
  { id: "makeup", name: "Помириться", emoji: "🕊️", color: "#a78bfa", description: "Когда поссорились" },
];

export const getCategory = (id) => categories.find((c) => c.id === id);