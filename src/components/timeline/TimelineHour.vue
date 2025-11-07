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
  <a href="#" :class="lineClasses">{{ formattedHour }}</a>
</template>

<style lang="css" scoped></style>
