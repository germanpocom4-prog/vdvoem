import { ideas } from "../data/ideas";

export function pickRandom(filters = {}, excludeId = null) {
  let pool = [...ideas];

  if (filters.time && filters.time !== "any") {
    pool = pool.filter((i) => i.time === filters.time);
  }
  if (filters.budget && filters.budget !== "any") {
    pool = pool.filter((i) => i.budget === filters.budget);
  }
  if (filters.mood && filters.mood !== "any") {
    pool = pool.filter((i) => i.mood === filters.mood);
  }
  if (filters.category && filters.category !== "any") {
    pool = pool.filter((i) => i.category === filters.category);
  }
  if (excludeId) {
    pool = pool.filter((i) => i.id !== excludeId);
  }

  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}