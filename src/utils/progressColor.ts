import { lowPercent, mediumPercent, hundredPercent } from '@/types/constants';

export const getProgressColorClass = (percentage: number) => {
  if (percentage < lowPercent) return 'red';
  if (percentage < mediumPercent) return '#ffc300';
  if (percentage < hundredPercent) return 'blue';

  return 'green';
};
