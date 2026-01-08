<script setup lang="ts">
import { useActivitiesStore } from '@/stores/activities.store';
import ProgressItem from '@/components/progress/ProgressItem.vue';
import EmptyState from '@/components/EmptyState.vue';

// Хранилище
const activitiesStore = useActivitiesStore();
</script>

<template>
  <div class="activities">
    <ul v-if="activitiesStore.trackedActivities.length" class="list">
      <ProgressItem
        v-for="activity in activitiesStore.trackedActivities"
        :key="activity.id"
        :activity
      />
    </ul>

    <!--  -->
    <EmptyState v-else title="Нет активных задач" img-path="/img/no_tracked_activities.svg" />
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
