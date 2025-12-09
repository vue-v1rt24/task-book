<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';

import TimelineItem from '@/components/timeline/TimelineItem.vue';
import { useTimelineStore } from '@/stores/timeline.store';

import type { TypeTimeline } from '@/types/timeline.type';

// Хранилище
const timelineStore = useTimelineStore();

//
const selectActivity = (activityId: string | number, timelineItem: TypeTimeline) => {
  timelineItem.activityId = activityId;
};

// Перемещение к задаче, у которой час соответствует текущему часу
const timelineItemRefs = useTemplateRef('timelineItemRefs');

const scrollToHour = (hour: number | null = null, isSmooth?: boolean) => {
  hour ??= new Date().getHours();

  (timelineItemRefs.value![hour!]?.$el as HTMLElement).scrollIntoView({
    behavior: isSmooth ? 'instant' : 'smooth',
  });
};

//
onMounted(() => {
  scrollToHour(null, true);
});

//
watch(
  () => timelineStore.currentPage,
  (val) => {
    if (timelineStore.currentPage === 'timeline') {
      scrollToHour();
    }
  },
);
</script>

<template>
  <ul class="line_wrap">
    <TimelineItem
      v-for="timelineItem in timelineStore.timelineItems"
      :key="timelineItem.hour"
      ref="timelineItemRefs"
      v-bind="timelineItem"
      @select-activity="selectActivity($event, timelineItem)"
      @scroll-to-hour="scrollToHour"
    />
  </ul>
</template>

<style lang="css" scoped>
.line_wrap {
  padding-top: 64px;
}
</style>
