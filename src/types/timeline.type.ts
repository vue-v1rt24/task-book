import type { TypeRange } from './shared.type';

//
export type TypeHour = TypeRange<23>;

export type TypeTimeline = {
  hour: TypeHour;
  activityId: string | number;
  activitySeconds: number;
};
