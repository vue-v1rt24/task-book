<script setup lang="ts">
import { KeepAlive, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useTimelineStore } from './stores/timeline.store';
import { useActivitiesStore } from './stores/activities.store';

import Header from './components/header/Header.vue';
import Navigation from './components/Navigation.vue';

//
const route = useRoute();

// Формируем время выполнения активности
const activitiesStore = useActivitiesStore();
activitiesStore.generatePeriodSelectOptions();

// Создание элементов временной шкалы на странице "Временная шкала"
const timelineStore = useTimelineStore();
timelineStore.generateTimelineItems(activitiesStore.activities);

// Перемещение на вверх страницы при переходе по страницам
watch(
  () => route.name,
  (page) => {
    if (page !== 'timeline') {
      document.body.scrollIntoView();
    }
  },
);

// Тест
</script>

<template>
  <!-- Шапка -->
  <Header />

  <!-- Содержимое -->
  <main class="main">
    <div class="container">
      <RouterView v-slot="{ Component }">
        <KeepAlive include="TimelineView, ActivitiesView">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
  </main>

  <!-- Меню -->
  <Navigation />
</template>

<style lang="css" scoped></style>
