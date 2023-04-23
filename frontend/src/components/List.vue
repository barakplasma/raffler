<script setup lang="ts">
defineProps<{
  list: Array<{id: string} & unknown>,
  display: string
}>()
</script>

<template>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item[display] }}
      </li>
    </ul>
</template>

<style scoped>

</style>
