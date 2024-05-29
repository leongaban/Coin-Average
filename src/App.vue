<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import { useCoinsStore } from './stores/coins'

// const taskStore = useCoinsStore()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
