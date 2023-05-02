<template>
	<div>
		<section class="carousel">
			<img :src="state.items[state.index]?.photo_url || state.default_photo" />
			<div class="controls">
				<h3>{{ state.items[state.index]?.full_name || 'unknown' }}</h3>
				<button @click="prev">Prev</button>
				<button @click="next">Next</button>
			</div>
		</section>
	</div>
</template>

<style scoped>
.carousel {
	position: relative;
	height: 300px;
	width: 400px;
	margin: auto;
}

.carousel img {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	object-fit: cover;
}

.controls {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	margin-bottom: 10px;
	color: white;
	background-color: hsla(0, 0%, 0%, 0.5);
}

button {
	margin: 0 10px;
	border: 1px solid white;
	border-radius: 25%;
}
</style>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useItems } from "@directus/extensions-sdk";

export default defineComponent({
	setup: (props) => {
		const state = reactive({
			collection: props.collection,
			name: props.name,
			index: 0,
			items: useItems(ref(props.collection), {
				fields: ref(["*.*"]),
				limit: ref(-1),
				sort: ref(),
				filter: ref({
					photo_url: {
						_nnull: true,
					}
				}),
				search: ref(),
				page: ref(1),
			}).items,
			default_photo:
				"https://secure.meetupstatic.com/photos/member/9/f/2/a/highres_244660746.jpeg",
		});

		const prev = () => {
			if (state.index === 0) {
				state.index = state.items.length - 1;
				return;
			}
			state.index--;
		};

		const next = () => {
			if (state.index === state.items.length - 1) {
				state.index = 0;
				return;
			}
			state.index++;
		};

		return {
			prev,
			next,
			state,
		};
	},
	inheritAttrs: false,
	props: {
		collection: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
});
</script>
