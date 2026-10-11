// color — заливка карты и значка, fg — цвет текста на этой заливке
export const categories = [
  { id: "funny", name: "Весёлые", emoji: "🎉", color: "#FFC93C", fg: "#1E1633", description: "Игры, челленджи, ржач" },
  { id: "romantic", name: "Романтика", emoji: "💕", color: "#FF9EBB", fg: "#1E1633", description: "Свидания, сюрпризы" },
  { id: "adult", name: "18+", emoji: "🔥", color: "#D92D47", fg: "#FFFFFF", description: "Только для взрослых" },
  { id: "drinks", name: "Выпивка", emoji: "🍸", color: "#BBA8FF", fg: "#1E1633", description: "Игры и коктейли" },
  { id: "movies", name: "Что посмотреть", emoji: "🎬", color: "#8EC9FF", fg: "#1E1633", description: "Кино под настроение" },
  { id: "hardcore", name: "Сложные", emoji: "🏆", color: "#7FD6A8", fg: "#1E1633", description: "Выезд и приключения" },
  { id: "distance", name: "На расстоянии", emoji: "🌍", color: "#3340E0", fg: "#FFFFFF", description: "Когда вы не вместе" },
  { id: "makeup", name: "Помириться", emoji: "🕊️", color: "#D3E56B", fg: "#1E1633", description: "Когда поссорились" },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
