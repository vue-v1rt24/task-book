<script setup lang="ts">
import { computed } from 'vue';
import type { TypeTimeline } from '@/types/timeline.type';

//
const { hour } = defineProps<TypeTimeline>();

//
const lineClasses = computed(() => {
  return ['line__link', hour === new Date().getHours() ? 'active' : 'default'];
});
</script>

<template>
  <li class="line">
    <a href="#" :class="lineClasses">{{ hour }}:00</a>
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
</style>
