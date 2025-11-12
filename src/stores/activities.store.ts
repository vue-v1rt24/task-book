import { ref, computed } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { secondsInHour, secondsInMinute } from '@/types/constants';
import { createRandomId } from '@/utils/createRandomId.util';
import { generatePeriodSelectOptionsLabel } from '@/utils/generatePeriodSelectOptionsLabel.util';

import type { TypeActivity, TypePeriodSelectOptions } from '@/types/activity.type';

//
export const useActivitiesStore = defineStore('activity', () => {
  // === Хранилища

  // Действия
  const activities = ref([
    {
      id: createRandomId(),
      name: 'Написание кода',
      secondsToComplete: 0 * secondsInHour,
    },
    {
      id: createRandomId(),
      name: 'Чтение',
      secondsToComplete: 1 * secondsInHour,
    },
    {
      id: createRandomId(),
      name: 'Обучение',
      secondsToComplete: 2 * secondsInHour,
    },
  ]);

  // Время, за которое нужно выполнить активность
  const periodSelectOptions = ref<TypePeriodSelectOptions[]>([]);

  // === Вычисления

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

  // Формируем время выполнения активности
  function generatePeriodSelectOptions() {
    const periodsInMinutes = [
      15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
    ];

    periodSelectOptions.value = periodsInMinutes.map((periodInMinutes) => {
      return {
        value: periodInMinutes * secondsInMinute,
        label: generatePeriodSelectOptionsLabel(periodInMinutes),
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

  // === Возвращаемые данные
  return {
    activities,
    periodSelectOptions,
    generateActivitySelectOptions,
    generatePeriodSelectOptions,
    createActivity,
    setSecondsToComplete,
    removeActivity,
  };
});

//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useActivitiesStore, import.meta.hot));
}
