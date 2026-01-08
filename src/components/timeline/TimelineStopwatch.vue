<script setup lang="ts">
import { useStopwatch } from '@/composables/useStopWatch';

import UiButton from '@/components/ui/UiButton.vue';

import Repeat from '@/components/imagesSvg/Repeat.vue';
import Pause from '@/components/imagesSvg/Pause.vue';
import Play from '@/components/imagesSvg/Play.vue';

import type { TypeTimeline } from '@/types/timeline.type';

//
const { timelineItem } = defineProps<{
  timelineItem: TypeTimeline;
}>();

//
const { secondsAction, isRunning, start, stop, reset, formatSeconds, isStartButtonDisabled } =
  useStopwatch(timelineItem);
</script>

<template>
  <div class="stopwatch">
    <UiButton @click="reset" title="Сброс" :disabled="!secondsAction">
      <Repeat />
    </UiButton>

    <div class="stopwatch__time">
      {{ formatSeconds }}
    </div>

    <UiButton v-show="isRunning" @click="stop" title="Приостановить">
      <Pause />
    </UiButton>

    <UiButton v-show="!isRunning" :disabled="isStartButtonDisabled" @click="start" title="Пуск">
      <Play />
    </UiButton>
  </div>
</template>

<style lang="css" scoped>
.stopwatch {
  display: flex;
  column-gap: 10px;
  align-items: center;
}

/*  */
.stopwatch__time {
  font-size: 30px;
}
</style>
