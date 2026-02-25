const DAY_MS = 24 * 60 * 60 * 1000;

export function fromISODate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function toISODateLocal(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function diffInDays(dateA, dateB) {
  const a = fromISODate(toISODateLocal(dateA)).getTime();
  const b = fromISODate(toISODateLocal(dateB)).getTime();
  return Math.round((a - b) / DAY_MS);
}

export function shiftISODate(isoDate, byDays) {
  const date = fromISODate(isoDate);
  date.setDate(date.getDate() + byDays);
  return toISODateLocal(date);
}

export function monthGridDays(monthDate) {
  const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  const grid = [];
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    grid.push({
      date,
      inCurrentMonth: date.getMonth() === monthDate.getMonth(),
    });
  }
  return grid;
}
