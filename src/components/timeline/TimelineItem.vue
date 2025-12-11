<script setup lang="ts">
import { ref, watch } from 'vue';

import { useActivitiesStore } from '@/stores/activities.store';

import TimelineHour from '@/components/timeline/TimelineHour.vue';
import UiSelect from '@/components/ui/UiSelect.vue';
import UiButton from '@/components/ui/UiButton.vue';
import TimelineStopwatch from '@/components/timeline/TimelineStopwatch.vue';

import CloseSvg from '@/components/imagesSvg/CloseSvg.vue';

import type { TypeTimeline } from '@/types/timeline.type';

// Хранилище
const activitiesStore = useActivitiesStore();

// Часы (0 - 23)
const { hour, activityId, activitySeconds } = defineProps<TypeTimeline>();

// emits
const emit = defineEmits<{
  selectActivity: [id: string | number | null];
  scrollToHour: [hour: number];
  updateActivitySeconds: [val: number];
}>();

// Варианты для задач
const options = activitiesStore.generateActivitySelectOptions;

// Выбранный вариант задачи
const selectedActivityId = ref<string | number | null>(activityId);

watch(selectedActivityId, (id) => {
  emit('selectActivity', id);
});
</script>

<template>
  <li class="line">
    <!-- Время -->
    <TimelineHour :hour @click.prevent="emit('scrollToHour', hour)" />

    <!--  -->
    <div class="select_wrap">
      <!-- Кнопка сброса -->
      <UiButton @click="selectedActivityId = 0">
        <CloseSvg />
      </UiButton>

      <!-- Варианты задач -->
      <UiSelect placeholder="Отдых" v-model="selectedActivityId" :options />
    </div>

    <!-- Секундомер -->
    <TimelineStopwatch
      :hour
      :seconds="activitySeconds"
      @update-seconds="emit('updateActivitySeconds', $event)"
    />
  </li>
</template>

<style lang="css" scoped>
.line {
  position: relative;
  border-top: 1px solid var(--color-gray-400);
  display: flex;
  column-gap: 16px;
  padding: 32px 16px;
  scroll-margin-top: 120px;
}

/*  */

.line__link {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  padding: 8px;
  z-index: 1;

  /* Цвет по умолчанию */
  &.default {
    background-color: rgb(210, 210, 210);
  }

  /* Активный цвет */
  &.active {
    font-weight: 900;
    color: var(--color-white);
    background-color: var(--color-purple-500);
  }
}

/* Блок select */
.select_wrap {
  flex: 1;
  display: flex;
  column-gap: 10px;
}
</style>
