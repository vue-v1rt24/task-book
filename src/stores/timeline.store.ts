import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { hoursInDay, secondsInHour, secondsInMinute } from '@/types/constants';

import type { TypeHour, TypeTimeline } from '@/types/timeline.type';
import type { TypeActivity } from '@/types/activity.type';

//
export const useTimelineStore = defineStore('timeline', () => {
  // === Хранилище
  const timelineItems = ref<TypeTimeline[]>([]);
  const currentPage = ref('');

  // === Вычисления

  // === Действия

  // Создание элементов временной шкалы на странице "Временная шкала"
  const generateTimelineItems = (activities: TypeActivity[]) => {
    timelineItems.value = [...Array(hoursInDay).keys()].map((hour) => ({
      hour: hour as TypeHour,
      activityId: hour % 4 === 0 ? 0 : activities[hour % 2]!.id,
      activitySeconds: hour % 4 === 0 ? 0 : (15 * secondsInMinute * hour) % secondsInHour,
    }));

    //
    /* for (let hour = 0; hour < hoursInDay; hour++) {
      timelineItems.value.push({ hour: hour as TypeHour, activityId: 0, activitySeconds: 0 });
    } */
  };

  // Обнуляем выбранную активность в выборе(select) на странице "Временная шкала"
  function deleteActive(id: string) {
    timelineItems.value.forEach((timelineItem) => {
      if (timelineItem.activityId === id) {
        timelineItem.activityId = 0;
        timelineItem.activitySeconds = 0;
      }
    });
  }

  // Изменение значения текущей страницы
  const changeCurrentPage = (page: string) => {
    currentPage.value = page;
  };

  // === Возвращаемые данные
  return {
    timelineItems,
    currentPage,
    generateTimelineItems,
    deleteActive,
    changeCurrentPage,
  };
});

//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimelineStore, import.meta.hot));
}
