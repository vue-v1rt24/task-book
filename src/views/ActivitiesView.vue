<script setup lang="ts">
import { useActivitiesStore } from '@/stores/activities.store';
import ActivityItem from '@/components/activities/ActivityItem.vue';
import ActivityForm from '@/components/activities/ActivityForm.vue';

import type { TypeActivity } from '@/types/activity.type';

// Хранилище
const activitiesStore = useActivitiesStore();

// Добавление активности
const createActivity = (newActivity: string) => {
  activitiesStore.createActivity(newActivity);
};

// Удаление активности
const deleteActivity = (activity: TypeActivity) => {
  activitiesStore.removeActivity(activity);
};
</script>

<template>
  <ul v-if="activitiesStore.activities.length" class="activities">
    <activity-item
      v-for="activity in activitiesStore.activities"
      :key="activity.id"
      :activity
      @delete-activity="deleteActivity"
    />
  </ul>

  <!--  -->
  <div v-else class="activities_not">
    <img src="@/assets/img/no_activities.svg" alt="" />
    <span>Активностей пока нет</span>
  </div>

  <!-- Форма добавления активности -->
  <ActivityForm @create-activity="createActivity" />
</template>

<style lang="css" scoped>
.activities {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 30px 0;
}

/*  */

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
