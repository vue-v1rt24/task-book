<script setup lang="ts">
import CheckCircleSvg from '@/components/imagesSvg/CheckCircleSvg.vue';
import { useTotalProgress } from '@/composables/useTotalProgress';

import { getProgressColorClass } from '@/utils/progressColor';

import { hundredPercent } from '@/types/constants';

//

//
const { percentage, colorClass } = useTotalProgress();
</script>

<template>
  <RouterLink :to="{ name: 'progress' }" class="header__complete_wrap">
    <div v-if="percentage < hundredPercent" class="header__complete">
      <div>
        Прогресс: <span class="header__complete_procent">{{ percentage }}%</span>
      </div>
      <div
        class="header__complete_indicator"
        :style="`background-color: ${getProgressColorClass(percentage)}`"
      ></div>
    </div>

    <!--  -->
    <div v-else class="header__complete">
      Day complete!
      <CheckCircleSvg />
    </div>
  </RouterLink>
</template>

<style lang="css" scoped>
.header__complete_wrap {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

/*  */
.header__complete {
  display: flex;
  align-items: center;
  column-gap: 10px;

  /* svg */
  svg {
    color: green;
  }
}

/*  */
.header__complete_procent {
  font-weight: 600;
}

/*  */
.header__complete_indicator {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
</style>
