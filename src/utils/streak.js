import { fromISODate, shiftISODate } from "./date";

function getSortedCompletedDays(tasks, today) {
  const daySet = new Set();

  tasks.forEach((task) => {
    if (!task.completed) return;
    if (task.date > today) return;
    daySet.add(task.date);
  });

  return [...daySet].sort();
}

export function calculateStreakStats(tasks, today) {
  const completedDays = getSortedCompletedDays(tasks, today);
  if (!completedDays.length) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let longest = 1;
  let running = 1;

  for (let i = 1; i < completedDays.length; i += 1) {
    const prev = fromISODate(completedDays[i - 1]);
    const curr = fromISODate(completedDays[i]);
    const dayGap = Math.round((curr - prev) / (24 * 60 * 60 * 1000));

    if (dayGap === 1) {
      running += 1;
      if (running > longest) longest = running;
    } else {
      running = 1;
    }
  }

  const completedSet = new Set(completedDays);
  const startDate = completedSet.has(today) ? today : shiftISODate(today, -1);
  if (!completedSet.has(startDate)) {
    return { currentStreak: 0, longestStreak: longest };
  }

  let current = 0;
  let cursor = startDate;

  while (completedSet.has(cursor)) {
    current += 1;
    cursor = shiftISODate(cursor, -1);
  }

  return { currentStreak: current, longestStreak: longest };
}
