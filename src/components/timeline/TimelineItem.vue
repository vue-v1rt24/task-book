<script setup lang="ts">
import { ref, watch } from 'vue';

import TimelineHour from '@/components/timeline/TimelineHour.vue';
import UiSelect from '@/components/ui/UiSelect.vue';
import UiButton from '@/components/ui/UiButton.vue';
import TimelineStopwatch from '@/components/timeline/TimelineStopwatch.vue';

import CloseSvg from '@/components/imagesSvg/CloseSvg.vue';

import type { TypeTimeline } from '@/types/timeline.type';
import type { TypePeriodSelectOptions } from '@/types/activity.type';

//
const { timelineItem, options } = defineProps<{
  timelineItem: TypeTimeline;
  options: TypePeriodSelectOptions[];
}>();

// emits
const emit = defineEmits<{
  selectActivity: [id: string | number | null];
  scrollToHour: [hour: number];
}>();

// Выбранный вариант задачи
const selectedActivityId = ref<string | number | null>(timelineItem.activityId);

watch(selectedActivityId, (id) => {
  emit('selectActivity', id);
});
</script>

<template>
  <li class="line">
    <!-- Время -->
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />

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
    <TimelineStopwatch :timelineItem />
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

/* Блок select */
.select_wrap {
  flex: 1;
  display: flex;
  column-gap: 10px;
}
</style>
