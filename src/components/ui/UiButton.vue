<script setup lang="ts">
const { type = 'button', classBtn = 'neutral' } = defineProps<{
  type?: 'button' | 'submit';
  classBtn?: 'neutral' | 'danger';
  disabled?: boolean;
}>();
</script>

<template>
  <button :type :disabled :class="['btn', classBtn]">
    <slot />
  </button>
</template>

<style lang="css" scoped>
.btn {
  width: 45px;
  height: 45px;
  padding: 0;
  transition: background-color var(--transition);

  /* neutral */
  &.neutral {
    background-color: #eff0f1;

    /* hover */
    &:hover {
      background-color: #dadfe5;
    }

    /* Состояние disabled */
    &:disabled {
      background-color: #eff0f1;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* danger */
  &.danger {
    color: white;
    background-color: #d72525;

    /* hover */
    &:hover {
      background-color: #bd2727;
    }

    /* Состояние disabled */
    &:disabled {
      background-color: #d72525;
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
