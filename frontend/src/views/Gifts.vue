<script lang="ts">
import { reactive } from 'vue'
import type { DefaultItem } from "@directus/sdk";

import { directus } from '../api/client'
import type { Gifts } from "@/api/types";

export default {
  setup() {
    let gifts: DefaultItem<Gifts>[] = [];
    let state = reactive({gifts})

    directus.items('gifts').readByQuery({}).then((response) => {
      if (response.data) {
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
  <div>
    <h2>Gifts</h2>
    <ul>
      <li v-for="gift in state.gifts" :key="gift.id">
        {{ gift.short_name }} {{ gift.details }}
      </li>
    </ul>
  </div>
</template>

<style>

</style>
