<script setup lang="ts">
import { computed } from 'vue';
import { useActivitiesStore } from '@/stores/activities.store';

import { formatSeconds } from '@/utils/formatSeconds.util';

import { lowPercent, mediumPercent, hundredPercent } from '@/types/constants';

import type { TypeActivity } from '@/types/activity.type';

// Хранилище
const activitiesStore = useActivitiesStore();

//
const { activity } = defineProps<{
  activity: TypeActivity;
}>();

//
const percentage = computed(() => activitiesStore.calculateActivityCompletionPercentage(activity));

// Цвет линии прогресса в зависимости от процента прогресса
const getProgressColorClass = (percentage: number) => {
  if (percentage < lowPercent) return 'red';
  if (percentage < mediumPercent) return '#ffc300';
  if (percentage < hundredPercent) return 'blue';

  return 'green';
};
</script>

<template>
  <li class="item">
    <div class="truncate-text">{{ activity.name }}</div>

    <!-- Шкала -->
    <div class="line">
      <div
        class="line__progress"
        :style="`--line_width: ${percentage}%; --line_bg: ${getProgressColorClass(percentage)}`"
      ></div>
    </div>

    <!--  -->
    <div class="data">
      <span>{{ percentage }}%</span>
      <span>
        {{ formatSeconds(activitiesStore.calculateTrackedActivitySeconds(activity)) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>

<style lang="css" scoped>
.item {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding-bottom: 15px;

  /*  */
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
}

/*  */

.line {
  height: 15px;
  background-color: #ccc;
  border-radius: 10px;
  overflow: hidden;

  /* line__progress */
  .line__progress {
    width: var(--line_width);
    height: 100%;
    background-color: var(--line_bg);
  }
}

/*  */

.data {
  display: flex;
  justify-content: space-between;
}
</style>
