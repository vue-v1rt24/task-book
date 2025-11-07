<script setup lang="ts" generic="T">
defineProps<{
  placeholder: string;
  options: T[];
}>();

const modelValue = defineModel<number | null>();
</script>

<template>
  <select v-model="modelValue" class="select">
    <option value="null" disabled>{{ placeholder }}</option>
    <option v-for="{ value, label } in options" :key="value" :value="value">
      {{ label }}
    </option>
  </select>
</template>

<style lang="css" scoped>
.select {
  height: 45px;
  padding: 0 10px;
}
</style>
