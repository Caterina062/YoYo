<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header class="navbar">
      <RouterLink to="/" class="logo">YoYo <span>- Friends.</span> </RouterLink>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  align-items: row;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8%;
  background-color: #fdfcfc;
}

.logo {
  font-size: 30px;
  font-weight: 900;
  color: #000000;
  text-decoration: none;
}
.logo span {
  color: #773b8a;
  font-weight: 600;
}
</style>
