// Каждый квест — цепочка из 3 шагов. ideaId ссылается на src/data/ideas.js
export const quests = [
  {
    id: "q1",
    title: "Романтический вечер",
    emoji: "💕",
    description: "Медленный вечер вдвоём — от свечей до объятий",
    steps: [
      { ideaId: "r1", label: "Свидание при свечах" },
      { ideaId: "a2", label: "5 минут в глаза" },
      { ideaId: "r3", label: "10 причин любви" },
    ],
  },
  {
    id: "q2",
    title: "Весёлый вечер",
    emoji: "🎉",
    description: "Ржач до слёз — игры, караоке, алкоголь",
    steps: [
      { ideaId: "f1", label: "Кулинарная битва" },
      { ideaId: "f3", label: "Караоке-дуэль" },
      { ideaId: "d1", label: "Никогда не…" },
    ],
  },
  {
    id: "q3",
    title: "Горячая ночь",
    emoji: "🔥",
    description: "Только для взрослых — от разогрева до финала",
    steps: [
      { ideaId: "a1", label: "20 вопросов для близости" },
      { ideaId: "a9", label: "Оближи или укуси" },
      { ideaId: "a11", label: "Карты на раздевание" },
    ],
  },
  {
    id: "q4",
    title: "Домашний бар",
    emoji: "🍸",
    description: "Напитки + игры до утра",
    steps: [
      { ideaId: "d4", label: "Коктейль наугад" },
      { ideaId: "d1", label: "Никогда не…" },
      { ideaId: "d2", label: "Стоп-игра" },
    ],
  },
  {
    id: "q5",
    title: "Свидание-приключение",
    emoji: "🏆",
    description: "Весь день вместе — от спонтанного выезда до заката",
    steps: [
      { ideaId: "h1", label: "Спонтанный выезд" },
      { ideaId: "r5", label: "Закат вдвоём" },
      { ideaId: "r1", label: "Ужин при свечах" },
    ],
  },
  {
    id: "q6",
    title: "Домашний спа",
    emoji: "🕯️",
    description: "Расслабление, тишина, масло и забота",
    steps: [
      { ideaId: "r12", label: "Домашний спа" },
      { ideaId: "r7", label: "Массаж друг другу" },
      { ideaId: "a6", label: "Медленный поцелуй" },
    ],
  },
  {
    id: "q7",
    title: "Ленивое утро",
    emoji: "☕",
    description: "Без спешки, без планов — только вы двое",
    steps: [
      { ideaId: "r9", label: "Завтрак в постель" },
      { ideaId: "r13", label: "Танец на кухне" },
      { ideaId: "r6", label: "Плейлист для нас" },
    ],
  },
  {
    id: "q8",
    title: "Ночь без правил",
    emoji: "🌙",
    description: "Только для тех, кто давно вместе",
    steps: [
      { ideaId: "a4", label: "Скажи что хочешь" },
      { ideaId: "a15", label: "Свидание с повязкой" },
      { ideaId: "a19", label: "Ночь без правил" },
    ],
  },
];