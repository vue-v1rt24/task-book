<script lang="ts">
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue';
import { useActivitiesStore } from '@/stores/activities.store';
import { useTimelineStore } from '@/stores/timeline.store';

// Хранилища
const activitiesStore = useActivitiesStore();
const timelineStore = useTimelineStore();

// Варианты для задач
const periodSelectOptions = activitiesStore.periodSelectOptions;
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';

import UiButton from '@/components/ui/UiButton.vue';
import UiSelect from '@/components/ui/UiSelect.vue';
import CloseSvg from '@/components/imagesSvg/CloseSvg.vue';
import DeleteSvg from '@/components/imagesSvg/DeleteSvg.vue';

import type { TypeActivity } from '@/types/activity.type';

//
const { activity } = defineProps<{
  activity: TypeActivity;
}>();

//
const emit = defineEmits<{
  setSecondsToComplete: [time: number];
  deleteActivity: [activity: TypeActivity];
}>();

// Выбранный время задачи
const secondsToComplete = ref<number>(activity.secondsToComplete);

watch(secondsToComplete, (val) => {
  emit('setSecondsToComplete', val);
});
</script>

<template>
  <li class="activities__list">
    <div class="activities__del">
      <UiButton @click="emit('deleteActivity', activity)">
        <delete-svg />
      </UiButton>

      <!--  -->
      <span class="ellipsis">
        {{ activity.name }}
      </span>
    </div>

    <!--  -->
    <div class="activities__set">
      <UiButton @click="secondsToComplete = 0">
        <close-svg />
      </UiButton>

      <!--  -->
      <UiSelect placeholder="чч:мм" :options="periodSelectOptions" v-model="secondsToComplete" />

      <!-- Оставшееся время до завершения задачи -->
      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity
        :timeline-items="timelineStore.timelineItems"
      />
    </div>
  </li>
</template>

<style lang="css" scoped>
.activities__list {
  border-top: 1px solid var(--color-gray-400);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding-top: 20px;

  /* Первый элемент */
  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}

/*  */

.activities__del,
.activities__set {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

/*  */
.activities__del {
  /* span */
  span {
    max-width: 300px;
  }
}
</style>
