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
        <p>Assigned to:</p>
        <p>{{ !!item.assigned_to && "Title" in item.assigned_to ? item?.assigned_to?.Title : "" }}</p>
      </aside>
    </section>

  </section>
</template>

<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
</style>
