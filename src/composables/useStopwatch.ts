import { computed, ref, watch } from 'vue';
import { useTimelineStore } from '@/stores/timeline.store';
import { millisecondsInSecond } from '@/types/constants';

import type { TypeTimeline } from '@/types/timeline.type';

//
export const useStopwatch = (timelineItem: TypeTimeline) => {
  // Хранилище
  const timelineStore = useTimelineStore();

  // Управление секундомером
  const secondsAction = ref(timelineItem.activitySeconds);
  const isRunning = ref<ReturnType<typeof setTimeout> | null>(null);
  const temp = 120;

  //
  watch(
    () => timelineItem.activityId,
    () => {
      timelineStore.updateTimelineItemActivitySeconds(timelineItem, secondsAction.value);
    },
  );

  //
  const start = () => {
    isRunning.value = setInterval(() => {
      // timelineStore.updateTimelineItemActivitySeconds(timelineItem, timelineItem.activitySeconds + 1);
      timelineStore.updateTimelineItemActivitySeconds(
        timelineItem,
        timelineItem.activitySeconds + temp,
      );
      secondsAction.value += temp;
    }, millisecondsInSecond);
  };

  //
  const stop = () => {
    if (isRunning.value) {
      clearInterval(isRunning.value);
      isRunning.value = null;
    }
  };

  //
  const reset = () => {
    stop();
    timelineStore.updateTimelineItemActivitySeconds(
      timelineItem,
      // timelineItem.activitySeconds - secondsAction.value,
      timelineItem.activitySeconds - secondsAction.value,
    );
    secondsAction.value = 0;
  };

  // Преобразование миллисекунд в 00:00:00
  const formatSeconds = computed(() => {
    const date = new Date();
    date.setTime(Math.abs(secondsAction.value) * millisecondsInSecond);
    const utc = date.toUTCString();
    return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
  });

  // Делаем не активной кнопку пуска секундомера, если время задачи не соответствует текущему часу
  const isStartButtonDisabled = timelineItem.hour !== new Date().getHours();

  //
  return {
    secondsAction,
    isRunning,
    start,
    stop,
    reset,
    formatSeconds,
    isStartButtonDisabled,
  };
};
