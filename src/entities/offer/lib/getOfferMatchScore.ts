export function getOfferMatchScore(candidate: any): number {
  const matched = candidate?.matched;
  return typeof matched === 'number' ? Math.round(matched * 100) : 0;
}
