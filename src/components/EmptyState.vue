<script setup lang="ts">
defineProps<{
  title: string;
  imgPath: string;
}>();
</script>

<template>
  <div class="activities_not">
    <img :src="imgPath" alt="" />
    <span>{{ title }}</span>
  </div>
</template>

<style lang="css" scoped>
.activities_not {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  padding-top: 30px;

  /* img */
  img {
    height: 300px;
  }

  /* span */
  span {
    font-size: 30px;
  }
}
</style>
