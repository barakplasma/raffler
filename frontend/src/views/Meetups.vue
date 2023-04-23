<script lang="ts">
import { reactive } from 'vue'

import { directus } from '../api/client'
import type { Meetup } from "@/api/types";

export default {
    setup() {
        let meetups: Meetup[] = [];
        let state = reactive({ meetups });
        directus.items("meetup").readByQuery({ fields: ['*'] }).then((response) => {
            if (response.data) {
                state.meetups = response.data;
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
            <h2>Meetups</h2>
        </header>

        <section v-for="item in state.meetups" :key="item.id">
            <aside>
                <h3>{{ item.Title }}</h3>
                <p v-if="item.start_time">{{ new Date(item.start_time).toLocaleString() }}</p>
            </aside>
        </section>

    </section>
</template>

<style></style>
