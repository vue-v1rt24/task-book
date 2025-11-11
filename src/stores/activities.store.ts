import { ref, computed } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { secondsInHour } from '@/types/constants';
import { createRandomId } from '@/utils/createRandomId.util';

import type { TypeActivity } from '@/types/activity.type';

//
export const useActivitiesStore = defineStore('activity', () => {
  // === Хранилище
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

  // Удаляем активность
  function removeActivity(activity: TypeActivity) {
    activities.value.splice(activities.value.indexOf(activity), 1);
  }

  //
  return {
    activities,
    generateActivitySelectOptions,
    createActivity,
    removeActivity,
  };
});

//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useActivitiesStore, import.meta.hot));
}
