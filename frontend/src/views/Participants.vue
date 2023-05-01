<script lang="ts">
import { reactive } from 'vue'

import { directus } from '../api/client'
import type { Participants } from "@/api/types";

export default {
  setup() {
    let participants: Participants[] = [];
    let state = reactive({ participants });
    directus.items("Participants").readByQuery({ fields: ['*'] }).then((response) => {
      if (response.data) {
        state.participants = response.data;
      }
    });
    return {
      state,
    };
  }
}
</script>

<template>
  <section>
    <header>
      <h2>Participants</h2>
    </header>

    <section v-for="item in state.participants" :key="item.id">
      <aside>
        <img v-if="typeof item.photo_url === 'string'" :src="item.photo_url" />
        <h3>{{ item.full_name }}</h3>
        <a v-if="item.profile_url" :href="item.profile_url">Profile</a>
      </aside>
    </section>

  </section>
</template>

<style></style>
