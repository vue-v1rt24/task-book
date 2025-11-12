<script setup lang="ts">
import { nextTick, ref } from 'vue';
import UiButton from '@/components/ui/UiButton.vue';

//
const emit = defineEmits<{
  createActivity: [newActivity: string];
}>();

//
const newActivity = ref('');

//
const submitHandler = async () => {
  emit('createActivity', newActivity.value);
  newActivity.value = '';

  // Прокрутка вниз
  await nextTick();
  window.scrollTo({
    top: document.body.scrollHeight,
  });
};
</script>

<template>
  <form @submit.prevent="submitHandler" class="form_add_activity">
    <input v-model="newActivity" type="text" name="#" placeholder="Введите название активности" />
    <UiButton type="submit" :disabled="!newActivity.trim().length">+</UiButton>
  </form>
</template>

<style lang="css" scoped>
.form_add_activity {
  position: sticky;
  bottom: 77px;
  display: flex;
  column-gap: 10px;
  padding: 20px 0;

  /* input */
  input {
    width: 100%;
    padding: 0 20px;
  }
}
</style>
