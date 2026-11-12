<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header class="navbar">
      <a href="#" class="logo">YoYo<span>.</span></a>
      <RouterLink to="/">
        <p>Home</p>
      </RouterLink>
      <RouterLink to="/about">
        <p>About</p>
      </RouterLink>
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
  background-color: #faf9f6;
}

.logo {
  font-size: 30px;
  font-weight: 900;
  color: #354b3c;
  text-decoration: none;
}
.logo span {
  color: #c98269;
}
</style>
