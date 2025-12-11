<script setup lang="ts">
import { computed, ref } from 'vue';

import UiButton from '@/components/ui/UiButton.vue';

import Repeat from '@/components/imagesSvg/Repeat.vue';
import Pause from '@/components/imagesSvg/Pause.vue';
import Play from '@/components/imagesSvg/Play.vue';

import { millisecondsInSecond } from '@/types/constants';

//
const { hour, seconds = 0 } = defineProps<{
  hour: number;
  seconds?: number;
}>();

//
const emit = defineEmits<{
  updateSeconds: [val: number];
}>();

// Управление секундомером
const secondsAction = ref(seconds);
const isRunning = ref<ReturnType<typeof setTimeout> | null>(null);

const start = () => {
  isRunning.value = setInterval(() => {
    emit('updateSeconds', 1);
    secondsAction.value++;
  }, millisecondsInSecond);
};

const stop = () => {
  if (isRunning.value) {
    clearInterval(isRunning.value);
    isRunning.value = null;
  }
};

const reset = () => {
  stop();
  emit('updateSeconds', -secondsAction.value);
  secondsAction.value = 0;
};

// Преобразование миллисекунд в 00:00:00
const formatSeconds = computed(() => {
  const date = new Date();
  date.setTime(Math.abs(secondsAction.value) * millisecondsInSecond);
  const utc = date.toUTCString();
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
});

// Делаем не активной кнопку пуска секундомера, если время задачи не соответствует текущему часу
const isStartButtonDisabled = hour !== new Date().getHours();
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
