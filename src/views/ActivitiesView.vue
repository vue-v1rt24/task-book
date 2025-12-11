<script setup lang="ts">
import { useActivitiesStore } from '@/stores/activities.store';
import { useTimelineStore } from '@/stores/timeline.store';

import ActivityItem from '@/components/activities/ActivityItem.vue';
import ActivityForm from '@/components/activities/ActivityForm.vue';

import type { TypeActivity } from '@/types/activity.type';

// Хранилища
const activitiesStore = useActivitiesStore();
const timelineStore = useTimelineStore();

// Добавление активности
const createActivity = (newActivity: string) => {
  activitiesStore.createActivity(newActivity);
};

// Установка времени выполнения активности
const setSecondsToComplete = (time: number, id: string) => {
  activitiesStore.setSecondsToComplete(time, id);
};

// Удаление активности
const deleteActivity = (activity: TypeActivity) => {
  // Обнуляем выбранную активность в выборе(select) на странице "Временная шкала"
  timelineStore.deleteActive(activity.id);

  // Удаление активности
  activitiesStore.removeActivity(activity);
};
</script>

<template>
  <ul v-if="activitiesStore.activities.length" class="activities">
    <ActivityItem
      v-for="activity in activitiesStore.activities"
      :key="activity.id"
      :activity
      @set-seconds-to-complete="setSecondsToComplete($event, activity.id)"
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
