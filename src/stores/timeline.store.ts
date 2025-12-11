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
      activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3]!.id : null,
      activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,

      // activityId: hour % 4 === 0 ? 0 : activities[hour % 2]!.id,
      // activitySeconds: hour % 4 === 0 ? 0 : (15 * secondsInMinute * hour) % secondsInHour,
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

  // Изменение времени у определённого timelineItems
  function changeActivitySeconds(activityId: string | number | null, activitySeconds: number) {
    const timelineItem = timelineItems.value.find((item) => item.activityId === activityId);
    timelineItem && (timelineItem.activitySeconds += activitySeconds);
  }

  // === Возвращаемые данные
  return {
    timelineItems,
    currentPage,
    generateTimelineItems,
    deleteActive,
    changeCurrentPage,
    changeActivitySeconds,
  };
});

//
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTimelineStore, import.meta.hot));
}
