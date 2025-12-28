import { ref, computed } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useTimelineStore } from './timeline.store';
import { secondsInHour, secondsInMinute } from '@/types/constants';
import { createRandomId } from '@/utils/createRandomId.util';
import { formatSeconds } from '@/utils/formatSeconds.util';

import type { TypeActivity, TypePeriodSelectOptions } from '@/types/activity.type';
import type { TypeTimeline } from '@/types/timeline.type';

import { hundredPercent } from '@/types/constants';

//
export const useActivitiesStore = defineStore('activity', () => {
  // Другое хранилище
  const timelineStore = useTimelineStore();

  // === Хранилища
  const activities = ref([
    {
      id: createRandomId(),
      name: 'Написание кода',
      // secondsToComplete: 0 * secondsInHour,
      secondsToComplete: 15 * 60,
    },
    {
      id: createRandomId(),
      name: 'Чтение',
      // secondsToComplete: 1 * secondsInHour,
      secondsToComplete: 15 * 60,
    },
    {
      id: createRandomId(),
      name: 'Обучение',
      // secondsToComplete: 2 * secondsInHour,
      secondsToComplete: 15 * 60,
    },
  ]);

  // Время, за которое нужно выполнить активность
  const periodSelectOptions = ref<TypePeriodSelectOptions[]>([]);

  // === Вычисления
  // Получаем только активности, у которых есть время выполнения
  const trackedActivities = computed(() => {
    return activities.value.filter(({ secondsToComplete }) => secondsToComplete);
  });

  // === Действия
  // Формируем массив для select
  const generateActivitySelectOptions = computed(() => {
    return activities.value.map((activity) => ({ label: activity.name, value: activity.id }));
  });

  // === Действия

  // Добавляем активность
  function createActivity(activity: string) {
    activities.value.push({
      id: createRandomId(),
      name: activity,
      secondsToComplete: 0,
    });
  }

  // Формируем время выполнения активности для выбора (select)
  function generatePeriodSelectOptions() {
    const periodsInMinutes = [
      15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
    ];

    periodSelectOptions.value = periodsInMinutes.map((periodInMinutes) => {
      return {
        value: periodInMinutes * secondsInMinute,
        label: formatSeconds(periodInMinutes),
      };
    });
  }

  // Установка времени выполнения активности
  function setSecondsToComplete(time: number, id: string) {
    const activity = activities.value.find((activity) => activity.id === id);

    if (activity) {
      activity.secondsToComplete = time;
    }
  }

  // Удаляем активность
  function removeActivity(activity: TypeActivity) {
    activities.value.splice(activities.value.indexOf(activity), 1);
  }

  //
  function calculateTrackedActivitySeconds(activity: TypeActivity) {
    return timelineStore.timelineItems
      .filter((timelineItem) => timelineItem.activityId === activity.id)
      .reduce(
        (totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds),
        0,
      );
  }

  // Динамический вывод процента задачи на странице "Прогресс"
  function calculateActivityCompletionPercentage(activity: TypeActivity) {
    return Math.floor(
      (calculateTrackedActivitySeconds(activity) * hundredPercent) / activity.secondsToComplete,
    );
  }

  // === Возвращаемые данные
  return {
    activities,
    periodSelectOptions,
    trackedActivities,
    generateActivitySelectOptions,
    generatePeriodSelectOptions,
    createActivity,
    setSecondsToComplete,
    removeActivity,
    calculateTrackedActivitySeconds,
    calculateActivityCompletionPercentage,
  };
});

//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useActivitiesStore, import.meta.hot));
}
