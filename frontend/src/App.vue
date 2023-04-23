<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/Gifts">Gifts</RouterLink>
        <RouterLink to="/Participants">Participants</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>
