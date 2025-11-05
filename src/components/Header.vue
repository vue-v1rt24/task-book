<script setup lang="ts">
import CheckCircle from './imagesSvg/CheckCircle.vue';
</script>

<template>
  <header class="header_wrap">
    <div class="container">
      <div class="header">
        <RouterLink to="/" class="header__logo">
          <img src="@/assets/img/logo.png" alt="Логотип" />
        </RouterLink>

        <RouterLink to="/" class="header__complete_wrap">
          <div v-if="true" class="header__complete">
            Day complete!
            <CheckCircle />
          </div>

          <!--  -->
          <div v-else class="header__complete">
            <div>Прогресс: <span class="header__complete_procent">20%</span></div>
            <div class="header__complete_indicator"></div>
          </div>
        </RouterLink>
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

/*  */

.header__complete_wrap {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

/*  */
.header__complete {
  display: flex;
  align-items: center;
  column-gap: 10px;

  /* svg */
  svg {
    color: green;
  }
}

/*  */
.header__complete_procent {
  font-weight: 600;
}

/*  */
.header__complete_indicator {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
</style>
