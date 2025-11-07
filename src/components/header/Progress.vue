<script setup lang="ts">
import CheckCircleSvg from '@/components/imagesSvg/CheckCircleSvg.vue';
</script>

<template>
  <RouterLink :to="{ name: 'progress' }" class="header__complete_wrap">
    <div v-if="true" class="header__complete">
      Day complete!
      <CheckCircleSvg />
    </div>

    <!--  -->
    <div v-else class="header__complete">
      <div>Прогресс: <span class="header__complete_procent">20%</span></div>
      <div class="header__complete_indicator"></div>
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
