<script setup lang="ts">
import { computed } from 'vue';

import type { TypeHour } from '@/types/timeline.type';

//
const { hour } = defineProps<{
  hour: TypeHour;
}>();

// Классы для времени. Выбор задачи по текущему часу
const lineClasses = computed(() => {
  return ['line__link', hour === new Date().getHours() ? 'active' : 'default'];
});

// Вывод времени
const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
</script>

<template>
  <button type="button" :class="lineClasses">{{ formattedHour }}</button>
</template>

<style lang="css" scoped>
.line__link {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
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
</style>
