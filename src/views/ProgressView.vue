<script setup lang="ts">
import { useActivitiesStore } from '@/stores/activities.store';
import ProgressItem from '@/components/progress/ProgressItem.vue';

// Хранилище
const activitiesStore = useActivitiesStore();
</script>

<template>
  <div class="activities">
    <ul class="list">
      <ProgressItem
        v-for="(activity, index) in activitiesStore.trackedActivities"
        :key="activity.id"
        :index
        :activity
      />
    </ul>
  </div>
</template>

<style lang="css" scoped>
.activities {
  padding: 30px 0;
}

/*  */

.list {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}
</style>
