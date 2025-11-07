<script setup lang="ts">
import Progress from '@/components/header/Progress.vue';
</script>

<template>
  <header class="header_wrap">
    <div class="container">
      <div class="header">
        <!-- Логотип -->
        <RouterLink :to="{ name: 'timeline' }" class="header__logo">
          <img src="@/assets/img/logo.png" alt="Логотип" />
        </RouterLink>

        <!-- Прогресс -->
        <Progress />
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.header_wrap {
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid rgb(181, 181, 181);
  padding: 20px 0;
  z-index: 10;
}

/*  */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/*  */

.header__logo {
  width: 200px;
}
</style>
