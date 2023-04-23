<script lang="ts">
import { reactive } from 'vue'
import type { DefaultItem } from "@directus/sdk";

import { directus } from '../api/client'
import type { Participants } from "@/api/types";

const display = (item: DefaultItem<Participants>) => {
  return item.full_name;
};

export default {
  setup() {
    let participants: DefaultItem<Participants>[] = [];
    let state = reactive({ participants });
    directus.items("Participants").readByQuery({}).then((response) => {
      if (response.data) {
        state.participants = response.data;
      }
    });
    return {
      state,
      display,
    };
  }
}
</script>

<template>
  <div>
    <h2>Participants</h2>
    <ul>
      <li v-for="item in state.participants">
        {{ display(item) }}
      </li>
    </ul>
  </div>
</template>

<style></style>
