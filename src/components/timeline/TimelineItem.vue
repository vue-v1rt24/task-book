<script setup lang="ts">
import { ref } from 'vue';

import TimelineHour from '@/components/timeline/TimelineHour.vue';
import UiSelect from '@/components/ui/UiSelect.vue';
import UiButton from '@/components/ui/UiButton.vue';
import CloseSvg from '@/components/imagesSvg/CloseSvg.vue';

import { Task } from '@/shared/constants';

import type { TypeTimeline } from '@/types/timeline.type';

// Часы (0 - 23)
const { hour } = defineProps<TypeTimeline>();

// Варианты для задач
const options = [
  { value: 1, label: Task.Coding },
  { value: 2, label: Task.Reading },
  { value: 3, label: Task.Training },
];

// Выбранный вариант задачи
const selected = ref<number | null>(1);
</script>

<template>
  <li class="line">
    <!-- Время -->
    <TimelineHour :hour />

    <!--  -->
    <div class="select_wrap">
      <!-- Кнопка сброса -->
      <UiButton @click="selected = null">
        <CloseSvg />
      </UiButton>

      <!-- Варианты задач -->
      <UiSelect placeholder="Отдых" v-model="selected" :options />
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
