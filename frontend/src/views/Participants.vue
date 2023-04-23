<script lang="ts">
import { reactive } from 'vue'
import type { DefaultItem } from "@directus/sdk";

import { directus } from '../api/client'
import type { Participants } from "@/api/types";

export default {
  setup() {
    let participants: DefaultItem<Participants>[] = [];
    let state = reactive({participants})

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
  <div>
    <h2>Participants</h2>
    <ul>
      <li v-for="person in state.participants" :key="person.id">
        {{ person.full_name }}
      </li>
    </ul>
  </div>
</template>

<style>

</style>
