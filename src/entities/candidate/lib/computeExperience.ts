export interface ExperienceDuration {
  years: number;
  months: number;
}

/**
 * Подсчитать опыт (лет и месяцев) по массиву ExperienceItem
 * @param items - массив опыта
 */
export function computeExperience(items: { start?: string; end?: string | null }[] = []): ExperienceDuration {
  if (!Array.isArray(items) || items.length === 0) return { years: 0, months: 0 };
  let totalMonths = 0;
  const now = new Date();
  for (const it of items) {
    try {
      const start = it.start ? new Date(it.start) : null;
      const end = it.end ? new Date(it.end) : now;
      if (start) {
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        totalMonths += Math.max(0, months);
      }
    } catch (e) {
      // ignore malformed dates
    }
  }
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months };
}
