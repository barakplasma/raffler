<script lang="ts">
import { reactive } from 'vue'
import { directus } from '../api/client'

export default {
  setup() {

    let state = reactive({participants: new Array()})

    directus.items('Participants').readByQuery({}).then((response) => {
      if (response.data) {
        state.participants = response.data
      }
    })

    return {
      state
    }
  }
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="person in state.participants" :key="person.id">
        {{ person.full_name }}
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
