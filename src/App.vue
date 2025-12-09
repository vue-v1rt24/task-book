<script setup lang="ts">
import { useTimelineStore } from './stores/timeline.store';
import { useActivitiesStore } from './stores/activities.store';

import Header from './components/header/Header.vue';
import Navigation from './components/Navigation.vue';

// Формируем время выполнения активности
const activitiesStore = useActivitiesStore();
activitiesStore.generatePeriodSelectOptions();

// Создание элементов временной шкалы на странице "Временная шкала"
const timelineStore = useTimelineStore();
timelineStore.generateTimelineItems(activitiesStore.activities);
</script>

<template>
  <!-- Шапка -->
  <Header />

  <!-- Содержимое -->
  <main class="main">
    <div class="container">
      <RouterView />
    </div>
  </main>

  <!-- Меню -->
  <Navigation />
</template>

<style lang="css" scoped></style>
