export function getJobTypeColor(type: string) {
  switch (type) {
    case 'Full-time':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'Part-time':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Contract':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Remote':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}
