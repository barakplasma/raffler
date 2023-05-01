<template>
	<span v-if="isLoading">Loading</span>
	<v-avatar v-else>
		<img :src="src">
	</v-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useImage } from '@vueuse/core'

export default defineComponent({
	setup(props) {
		const { isLoading } = useImage({ src: props.value })

		return {
			isLoading,
			src: props.value,
		}
	},
	props: {
		value: {
			type: String,
			default: null,
		},
	},
});
</script>
