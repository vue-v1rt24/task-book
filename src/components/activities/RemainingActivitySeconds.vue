<script setup lang="ts">
import { computed } from 'vue';
import { useActivitiesStore } from '@/stores/activities.store';
import type { TypeActivity } from '@/types/activity.type';

// Хранилище
const activitiesStore = useActivitiesStore();

//
const { activity } = defineProps<{
  activity: TypeActivity;
}>();

//
const remainingSeconds = computed(() => {
  return activitiesStore.calculateTrackedActivitySeconds(activity) - activity.secondsToComplete;
});

const colorClasses = computed(() => (remainingSeconds.value < 0 ? 'red' : 'green'));
</script>

<template>
  <div :class="['remaining_time', colorClasses]">
    {{ activitiesStore.formatSecondsWithSign(remainingSeconds) }}
  </div>
</template>

<style lang="css" scoped>
.remaining_time {
  height: 45px;
  border-radius: 4px;
  padding: 0 2px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* green */
  &.green {
    color: rgb(10, 185, 10);
    background-color: rgb(195, 241, 195);
  }

  /* red */
  &.red {
    color: rgb(255, 10, 10);
    background-color: rgb(243, 189, 189);
  }
}
</style>
