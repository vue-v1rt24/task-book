<script setup lang="ts">
import { ref, watch } from 'vue';

import { useActivitiesStore } from '@/stores/activities.store';

import TimelineHour from '@/components/timeline/TimelineHour.vue';
import UiSelect from '@/components/ui/UiSelect.vue';
import UiButton from '@/components/ui/UiButton.vue';
import CloseSvg from '@/components/imagesSvg/CloseSvg.vue';

import type { TypeTimeline } from '@/types/timeline.type';
import type { TypeActivity } from '@/types/activity.type';

// Хранилище
const activitiesStore = useActivitiesStore();

// Часы (0 - 23)
const { hour, activityId } = defineProps<TypeTimeline>();

// emits
const emit = defineEmits<{
  selectActivity: [id: string | number];
}>();

// Варианты для задач
const options = activitiesStore.generateActivitySelectOptions;

// Выбранный вариант задачи
const selectedActivityId = ref<string | number>(activityId);

watch(selectedActivityId, (id) => {
  emit('selectActivity', id);
});
</script>

<template>
  <li class="line">
    <!-- Время -->
    <TimelineHour :hour />

    <!--  -->
    <div class="select_wrap">
      <!-- Кнопка сброса -->
      <UiButton @click="selectedActivityId = 0">
        <CloseSvg />
      </UiButton>

      <!-- Варианты задач -->
      <UiSelect placeholder="Отдых" v-model="selectedActivityId" :options />
    </div>
  </li>
</template>

<style lang="css" scoped>
.line {
  position: relative;
  border-top: 1px solid var(--color-gray-400);
  display: flex;
  column-gap: 16px;
  padding: 32px 16px;
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
  display: flex;
  column-gap: 10px;
}
</style>
