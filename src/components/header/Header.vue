<script setup lang="ts">
import { nextTick } from 'vue';
import Progress from '@/components/header/Progress.vue';
import { useRouter } from 'vue-router';
import { useTimelineStore } from '@/stores/timeline.store';

// Хранилище
const timelineStore = useTimelineStore();

// Роутер
const router = useRouter();

// Переход по нажатию на логотип
const goTo = async () => {
  if (router.currentRoute.value.name === 'timeline') {
    timelineStore.changeCurrentPage('');

    await nextTick();
    timelineStore.changeCurrentPage('timeline');
  } else {
    router.push({ name: 'timeline' });
  }
};
</script>

<template>
  <header class="header_wrap">
    <div class="container">
      <div class="header">
        <!-- Логотип -->
        <a @click.prevent="goTo" href="#" class="header__logo">
          <img src="@/assets/img/logo.png" alt="Логотип" />
        </a>

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
