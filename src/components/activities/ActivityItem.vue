<script setup lang="ts">
import { ref } from 'vue';

import UiButton from '@/components/ui/UiButton.vue';
import UiSelect from '@/components/ui/UiSelect.vue';
import CloseSvg from '@/components/imagesSvg/CloseSvg.vue';
import DeleteSvg from '@/components/imagesSvg/DeleteSvg.vue';

import type { TypeTask } from '@/shared/constants';

//
defineProps<{
  activity: TypeTask;
}>();

// Варианты для задач
const periodSelectOptions = [
  { value: 15, label: '0:15' },
  { value: 30, label: '0:30' },
  { value: 45, label: '0:45' },
];

// Выбранный вариант задачи
const secondsToComplete = ref<number | null>(15);
</script>

<template>
  <li class="activities__list">
    <div class="activities__del">
      <UiButton>
        <delete-svg />
      </UiButton>

      <!--  -->
      <span class="ellipsis">
        {{ activity }}
      </span>
    </div>

    <!--  -->
    <div class="activities__set">
      <UiButton @click="secondsToComplete = null">
        <close-svg />
      </UiButton>

      <!--  -->
      <UiSelect placeholder="ч:мм" :options="periodSelectOptions" v-model="secondsToComplete" />
    </div>
  </li>
</template>

<style lang="css" scoped>
.activities__list {
  border-top: 1px solid var(--color-gray-400);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding-top: 20px;

  /* Первый элемент */
  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}

/*  */

.activities__del,
.activities__set {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

/*  */
.activities__del {
  /* span */
  span {
    max-width: 300px;
  }
}
</style>
