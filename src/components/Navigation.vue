<script setup lang="ts">
import ClockSvg from './imagesSvg/ClockSvg.vue';
import ListSvg from './imagesSvg/ListSvg.vue';
import ChartSvg from './imagesSvg/ChartSvg.vue';

// Меню
const navItems = [
  { title: 'Временная шкала', img: ClockSvg, link: '/timeline' },
  { title: 'Действия', img: ListSvg, link: '/activities' },
  { title: 'Прогресс', img: ChartSvg, link: '/' },
];
</script>

<template>
  <nav class="nav">
    <div class="container">
      <ul class="menu">
        <li v-for="{ title, img, link } in navItems" :key="title">
          <router-link :to="link">
            <component :is="img" />
            {{ title }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.nav {
  position: sticky;
  bottom: 0;
  background-color: white;
  border-top: 1px solid rgb(181, 181, 181);
  z-index: 10;
}

/*  */

.menu {
  display: flex;
  justify-content: space-around;
  align-items: center;

  /* li */
  li {
    flex: 1;
  }

  /* a */
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 6px;
    padding: 15px 0;

    /* Активная ссылка */
    &.active {
      background-color: rgb(236, 236, 236);
    }
  }
}
</style>
