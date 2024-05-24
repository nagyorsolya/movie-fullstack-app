export const isDateWithinRange = (date: Date, range: number = 2 * 60 * 1000) =>
  Date.now() - new Date(date).getTime() <= range;
