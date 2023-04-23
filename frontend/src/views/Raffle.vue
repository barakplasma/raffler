<script lang="ts">
import { ref } from 'vue'
import Raffle from "@/components/Raffle.vue";

import { directus } from '../api/client'
import type { Gifts, Meetup, Participants } from "@/api/types"

let meetup = ref(0);
let gifts = ref<Gifts[]>([]);
let participants = ref<Participants[]>([]);
let meetups = ref<Meetup[]>([]);

export default {
    setup() {
        directus.items("meetup").readByQuery({ fields: ['*'] }).then((response) => {
            if (response.data) {
                meetups.value = response.data;
            }
        });

        function getGiftsForMeetup() {
            directus.items("gifts").readByQuery({
                limit: -1,
                filter: {
                    assigned_to: {
                        id: {
                            _eq: meetup.value
                        }
                    }
                },
                fields: ['*', 'assigned_to.Title', 'assigned_to.id']
            }).then((response) => {
                if (response.data) {
                    gifts.value = response.data;
                }
            });
        }

        function getParticipantsInMeetup() {
            directus.items("Participants").readByQuery({ fields: ['*'] }).then((response) => {
                if (response.data) {
                    participants.value = response.data;
                }
            });
        }

        return {
            meetups,
            gifts,
            meetup,
            participants,
            getParticipantsInMeetup,
            getGiftsForMeetup,
        };
    },
    watch: {
        meetup: {
            handler: function (val, oldVal) {
                if (val !== oldVal) {
                    this.getGiftsForMeetup()
                    this.getParticipantsInMeetup()
                }
            },
            deep: true
        }
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
            <select v-model="meetup" name="meetup">
                <option v-for="item in meetups" :key="item.id" :value="item.id">{{ item.Title }}</option>
            </select>
            <label for="gift">Choose a gift</label>
            <select name="gift">
                <option v-for="item in gifts" :key="item.id" :value="item.id">{{ item.details }}</option>
            </select>
        </aside>
        <Raffle :options="participants.map(p => p.full_name)" v-if="participants.length > 0" />
    </section>
</template>

<style></style>
