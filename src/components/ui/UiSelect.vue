<script setup lang="ts" generic="T">
defineProps<{
  placeholder: string;
  options: T[];
}>();

//
const modelValue = defineModel<number | string | null>();
</script>

<template>
  <select v-model="modelValue" class="select" name="#">
    <option value="0" disabled>{{ placeholder }}</option>
    <option v-for="{ value, label } in options" :key="value" :value="value">
      {{ label }}
    </option>
  </select>
</template>

<style lang="css" scoped>
.select {
  width: 100%;
  height: 45px;
  padding: 0 10px;
}
</style>
