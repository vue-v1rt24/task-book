<script setup lang="ts">
import TimelineItem from '@/components/timeline/TimelineItem.vue';
import { useTimelineStore } from '@/stores/timeline.store';

import type { TypeTimeline } from '@/types/timeline.type';

// Хранилище
const timelineStore = useTimelineStore();

//
const selectActivity = (activityId: string | number, timelineItem: TypeTimeline) => {
  timelineItem.activityId = activityId;
};
</script>

<template>
  <ul class="line_wrap">
    <TimelineItem
      v-for="timelineItem in timelineStore.timelineItems"
      :key="timelineItem.hour"
      v-bind="timelineItem"
      @select-activity="selectActivity($event, timelineItem)"
    />
  </ul>
</template>

<style lang="css" scoped>
.line_wrap {
  padding-top: 64px;
}
</style>
