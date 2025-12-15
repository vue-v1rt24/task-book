<script setup lang="ts">
import type { TypeActivity } from '@/types/activity.type';

//
const { index } = defineProps<{
  index: number;
  activity: TypeActivity;
}>();

//
const color = ['red', '#ffc300', 'blue', 'green'][index];
const progress = [10, 50, 70, 100][index];
const timeProgress = ['03:00 / 30:00', '15:00 / 30:00', '21:00 / 30:00', '30:00 / 30:00'][index];
</script>

<template>
  <li class="item">
    <div class="truncate-text">{{ activity.name }}</div>

    <!-- Шкала -->
    <div class="line">
      <div class="line__progress" :style="`--line_width: ${progress}%; --line_bg: ${color}`"></div>
    </div>

    <!--  -->
    <div class="data">
      <span>{{ progress }}%</span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>

<style lang="css" scoped>
.item {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding-bottom: 15px;

  /*  */
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
}

/*  */

.line {
  height: 15px;
  background-color: #ccc;
  border-radius: 10px;
  overflow: hidden;

  /* line__progress */
  .line__progress {
    width: var(--line_width);
    height: 100%;
    background-color: var(--line_bg);
  }
}

/*  */

.data {
  display: flex;
  justify-content: space-between;
}
</style>
