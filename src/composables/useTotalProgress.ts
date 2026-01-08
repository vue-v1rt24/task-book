import { computed } from 'vue';
import { useActivitiesStore } from '@/stores/activities.store';

//
export const useTotalProgress = () => {
  // Хранилище
  const activitiesStore = useActivitiesStore();

  //
  const totalTrackedSeconds = computed(() => {
    return activitiesStore.trackedActivities.reduce((total, activity) => {
      let trackedSeconds = activitiesStore.calculateTrackedActivitySeconds(activity);

      trackedSeconds =
        trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete;

      return total + trackedSeconds;
    }, 0);
  });

  const percentage = computed(() => {
    return activitiesStore.calculateCompletionPercentage(totalTrackedSeconds.value);
  });

  const colorClass = computed(() => {
    return;
  });

  //
  return {
    percentage,
    colorClass,
  };
};
