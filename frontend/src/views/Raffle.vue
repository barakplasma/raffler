<script lang="ts">
import { reactive, watch } from 'vue'
import Raffle from "@/components/Raffle.vue";

import { directus } from '../api/client'
import type { Gifts, Meetup, Participants } from "@/api/types"

let state: {
    meetups: Meetup[],
    gifts: Gifts[],
    meetup: number,
    participants: Participants[],
} = reactive({
    meetups: [],
    gifts: [],
    meetup: 0,
    participants: [],
});

function getGiftsForMeetup() {
    directus.items("gifts").readByQuery({
        limit: -1,
        filter: {
            assigned_to: {
                id: {
                    _eq: state.meetup
                }
            }
        },
        fields: ['*', 'assigned_to.Title', 'assigned_to.id']
    }).then((response) => {
        if (response.data) {
            state.gifts = response.data;
        }
    });
}

function getParticipantsInMeetup() {
    directus.items("Participants").readByQuery({ fields: ['*'] }).then((response) => {
        if (response.data) {
            state.participants = response.data;
        }
    });
}


watch(() => state.meetup, (meetup) => {
    if (meetup > 0) {
        getGiftsForMeetup();
        getParticipantsInMeetup();
    }
});

export default {
    setup() {
        directus.items("meetup").readByQuery({ fields: ['*'] }).then((response) => {
            if (response.data) {
                state.meetups = response.data;
            }
        });

        return {
            state,
        };
    },
    components: {
        Raffle,
    }
}
</script>

<template>
    <section>
        <header>
            <h2>Raffle</h2>
        </header>
        <aside>
            <label for="meetup">Choose a meetup</label>
            <select v-model="state.meetup" name="meetup">
                <option :value="0">Choose a meetup</option>
                <option v-for="item in state.meetups" :key="item.id" :value="item.id">{{ item.Title }}</option>
            </select>
            <label for="gift">Choose a gift</label>
            <select name="gift">
                <option v-for="item in state.gifts" :key="item.id" :value="item.id">{{ item.details }}</option>
            </select>
        </aside>
        <Raffle :options="state.participants.map(p => p.full_name)" v-if="state.participants.length > 0" />
    </section>
</template>

<style></style>
