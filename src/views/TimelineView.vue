<script setup lang="ts">
import { hoursInDay } from '@/types/constants';
import TimelineItem from '@/components/timeline/TimelineItem.vue';
import type { TypeHour, TypeTimeline } from '@/types/timeline.type';

// Часы
const timelineItems: TypeTimeline[] = [];

for (let hour = 0; hour < hoursInDay; hour++) {
  timelineItems.push({ hour: hour as TypeHour });
}
</script>

<template>
  <ul class="line_wrap">
    <TimelineItem
      v-for="timelineItem in timelineItems"
      :key="timelineItem.hour"
      v-bind="timelineItem"
    />
  </ul>
</template>

<style lang="css" scoped>
.line_wrap {
  padding-top: 64px;
}
</style>
