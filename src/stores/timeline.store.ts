import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { hoursInDay } from '@/types/constants';

import type { TypeHour, TypeTimeline } from '@/types/timeline.type';

//
export const useTimelineStore = defineStore('timeline', () => {
  // === Хранилище
  const timelineItems = ref<TypeTimeline[]>([]);

  // === Вычисления

  // === Действия

  // Создание элементов временной шкалы на странице "Временная шкала"
  const generateTimelineItems = () => {
    for (let hour = 0; hour < hoursInDay; hour++) {
      timelineItems.value.push({ hour: hour as TypeHour, activityId: 0 });
    }
  };

  // Обнуляем выбранную активность в выборе(select) на странице "Временная шкала"
  function resetCurrentActive(id: string) {
    timelineItems.value.forEach((timelineItem) => {
      if (timelineItem.activityId === id) {
        timelineItem.activityId = 0;
      }
    });
  }

  // === Возвращаемые данные
  return {
    timelineItems,
    generateTimelineItems,
    resetCurrentActive,
  };
});

//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimelineStore, import.meta.hot));
}
