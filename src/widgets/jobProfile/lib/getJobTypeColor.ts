export function getJobTypeColor(type: string | null | undefined) {
  switch (type) {
    case 'full':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'short':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'contract':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'remote':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}
