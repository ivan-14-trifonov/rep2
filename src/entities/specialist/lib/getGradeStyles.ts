const GRADE_STYLES = {
  junior: { bg: 'bg-gray-500', border: 'border-gray-500' },
  middle: { bg: 'bg-blue-500', border: 'border-blue-500' },
  senior: { bg: 'bg-green-500', border: 'border-green-500' },
  lead: { bg: 'bg-purple-500', border: 'border-purple-500' },
} as const;

type GradeKey = keyof typeof GRADE_STYLES;

export function getGradeStyles(grade: string | null | undefined) {
  if (!grade) {
    return { bg: 'bg-gray-400', border: 'border-gray-300' };
  }

  const normalized = grade.toLowerCase().trim();
  
  if (normalized.includes('jun')) return GRADE_STYLES.junior;
  if (normalized.includes('mid')) return GRADE_STYLES.middle;
  if (normalized.includes('senior')) return GRADE_STYLES.senior;
  if (normalized.includes('lead')) return GRADE_STYLES.lead;

  return { bg: 'bg-gray-400', border: 'border-gray-300' };
}
