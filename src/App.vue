<script setup lang="ts">
import Header from './components/header/Header.vue';
import Navigation from './components/Navigation.vue';
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

<style lang="css" scoped>
.main {
  flex: 1;
}
</style>
