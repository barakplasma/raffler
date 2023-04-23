<script lang="ts">
import { reactive } from 'vue'

import { directus } from '../api/client'
import type { Gifts } from "@/api/types";

export default {
  setup() {
    let gifts: Gifts[] = [];
    let state = reactive({ gifts })

    directus.items('gifts').readByQuery({
      limit: -1,
      fields: ['*', 'assigned_to.Title']
    }).then((response) => {
      if (response.data) {
        state.gifts = response.data
      }
    })

    return {
      state,
    }
  }
}
</script>

<template>
  <section>
    <header>
      <h2>Gifts</h2>
    </header>

    <section v-for="item in state.gifts" :key="item.id">
      <aside>
        <h3>{{ item.short_name }}</h3>
        <p>{{ item.details }}</p>
        <p v-if="item.assigned_to">Assigned to meetup:</p>
        <p v-if="item.assigned_to" class="recipient">{{ "Title" in item.assigned_to ? item?.assigned_to?.Title : "" }}</p>
      </aside>
    </section>

  </section>
</template>

<style>
.recipient {
  font-style: italic;
}
</style>
