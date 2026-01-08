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
</script>

<template>
  <!-- Блоки анимации -->
  <div class="bloks_wrap">
    <div class="bloks bl_1">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </div>

    <div class="bloks bl_2">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </div>
  </div>
  <!-- /Блоки анимации -->

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

<style lang="css" scoped>
/* Блоки анимации */
.bloks_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 100;
}

.bloks {
  flex: 1;
  display: flex;
}

.block {
  flex: 1;
  background-color: #000000;
  transform: scaleY(1);
  will-change: transform;

  /* bl_1, bl_2 */
  .bl_1 & {
    transform-origin: top;
  }

  .bl_2 & {
    transform-origin: bottom;
  }
}
/* /Блоки анимации */
</style>
