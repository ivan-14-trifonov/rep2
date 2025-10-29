export function getMatchScoreColor(score: number) {
  return score >= 80 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
}
