// Часы
export const hoursInDay = 24;

// Задачи
export const Task = {
  Coding: 'Написание кода',
  Reading: 'Чтение',
  Training: 'Обучение',
} as const;

export type TypeTask = (typeof Task)[keyof typeof Task];
