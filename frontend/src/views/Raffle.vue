<script setup lang="ts">
import { reactive, watch } from 'vue'
import Raffle from "@/components/Raffle.vue";

import { directus } from '../api/client'
import type { Gifts, Meetup, Participants } from "@/api/types"

let state: {
    meetups: Meetup[],
    gifts: Gifts[],
    meetup: number,
    participants: Participants[],
    winner: Pick<Participants, "full_name" | "photo_url">,
} = reactive({
    meetups: [],
    gifts: [],
    meetup: 0,
    participants: [],
    winner: { full_name: "" },
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

function displayWinnerPhoto(winner: string) {
    state.winner.full_name = winner;
    let particpant = state.participants.find(p => p.full_name === state.winner.full_name)
    if (particpant && particpant.photo_url) {
        state.winner.photo_url = particpant.photo_url;
    } else {
        state.winner.photo_url = "winner.jpg";
    }
}

directus.items("meetup").readByQuery({ fields: ['*'] }).then((response) => {
    if (response.data) {
        state.meetups = response.data;
    }
});
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
        <aside v-if="state.winner.full_name">
            <img v-if="state.winner.photo_url" :src="state.winner.photo_url" alt="">
            <h3>Winner: {{ state.winner.full_name }}</h3>
        </aside>
        <Raffle :options="state.participants.map(p => p.full_name)" v-if="state.participants.length > 0" @spin-stop="displayWinnerPhoto" />
    </section>
</template>

<style></style>
