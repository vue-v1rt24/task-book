<script setup lang="ts">
import { Task } from '@/shared/constants';
import ActivityItem from '@/components/activities/ActivityItem.vue';

//
const activities = [Task.Coding, Task.Reading, Task.Training];
</script>

<template>
  <ul class="activities">
    <activity-item v-for="activity in activities" :key="activity" :activity />
  </ul>
</template>

<style lang="css" scoped>
.activities {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 30px 0;
}
</style>
