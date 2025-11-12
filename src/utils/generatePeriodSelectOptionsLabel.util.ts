import { minutesInHour } from '@/types/constants';

export const generatePeriodSelectOptionsLabel = (periodInMinutes: number) => {
  const hours = Math.floor(periodInMinutes / minutesInHour)
    .toString()
    .padStart(2, '0');

  const minutes = (periodInMinutes % minutesInHour).toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
