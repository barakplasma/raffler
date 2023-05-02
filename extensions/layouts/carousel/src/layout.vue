<template>
	<div>
		<p>Name: {{ name }}</p>
		<p>Collection: {{ collection }}</p>
		<section class="container">
			<v-card v-for="item in items">
				<img v-if="item.photo_url" :src="item.photo_url" />
				<img v-else src="https://picsum.photos/200/200" />
				<v-card-title>{{ item.full_name }}</v-card-title>
			</v-card>
		</section>
	</div>
</template>

<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useItems } from '@directus/extensions-sdk';

const collection = ref('');

export default defineComponent({
	setup: (props) => {
		collection.value = props.collection;
		const items = useItems(collection, { fields: ['*.*'] }).items;

		return {
			name: props.name,
			collection: props.collection,
			items: items,
		}
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
	}
});
</script>
