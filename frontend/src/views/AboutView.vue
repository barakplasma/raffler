<script lang="ts">
import { reactive } from 'vue'
import type { DefaultItem } from "@directus/sdk";

import { directus } from '../api/client'
import type { Participants, Gifts } from "@/api/types";

export default {
  setup() {
    let participants: DefaultItem<Participants>[] = [];
    let gifts: DefaultItem<Gifts>[] = [];
    let state = reactive({participants, gifts})

    directus.items('Participants').readByQuery({}).then((response) => {
      if (response.data) {
        state.participants = response.data
      }
    })

    directus.items('gifts').readByQuery({}).then((response) => {
      if (response.data) {
        console.log(JSON.stringify(response.data))
        state.gifts = response.data
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
    <h2>Participants</h2>
    <ul>
      <li v-for="person in state.participants" :key="person.id">
        {{ person.full_name }}
      </li>
    </ul>
    <h2>Gifts</h2>
    <ul>
      <li v-for="gift in state.gifts" :key="gift.id">
        {{ gift.short_name }} {{ gift.details }}
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
