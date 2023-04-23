<script lang="ts">
import { reactive } from 'vue'
import type { DefaultItem } from "@directus/sdk";

import { directus } from '../api/client'
import type { Gifts } from "@/api/types";

const display = (item: DefaultItem<Gifts>) => {
  if (!item.details || !item.short_name) {
    return 'unknown';
  }
  if (item.assigned_to instanceof "Object" && "Title" in item.assigned_to) {
    return `${item.short_name} - ${item.details} - ${item.assigned_to.title}`;
  }
  return `${item.short_name} - ${item.details}`;
};

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
      state,
      display,
    }
  }
}
</script>

<template>
  <div>
    <h2>Gifts</h2>
    <ul>
      <li v-for="item in state.gifts">
        {{ display(item) }}
      </li>
    </ul>
  </div>
</template>

<style>

</style>
