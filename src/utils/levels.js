import { ideas } from "../data/ideas";

export const LEVEL_REQUIREMENTS = {
  1: { requires: null, count: 0 },
  2: { requires: 1, count: 3 },
  3: { requires: 2, count: 5 },
  4: { requires: 3, count: 5 },
};

export function getCompletedCountByLevel(history) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  history.forEach((h) => {
    const idea = ideas.find((i) => i.id === h.ideaId);
    if (idea && idea.category === "adult" && idea.level) {
      counts[idea.level] = (counts[idea.level] || 0) + 1;
    }
  });
  return counts;
}

export function getUnlockedLevel(history) {
  const counts = getCompletedCountByLevel(history);
  let unlocked = 1;
  for (let lvl = 2; lvl <= 4; lvl++) {
    const req = LEVEL_REQUIREMENTS[lvl];
    if (counts[req.requires] >= req.count) {
      unlocked = lvl;
    } else {
      break;
    }
  }
  return unlocked;
}

export function getLevelProgress(history, level) {
  const counts = getCompletedCountByLevel(history);
  const req = LEVEL_REQUIREMENTS[level + 1];
  if (!req) return null;
  const have = counts[level] || 0;
  return { have, need: req.count, remaining: Math.max(0, req.count - have) };
}