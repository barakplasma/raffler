<template>
	<span v-if="isLoading">Loading</span>
  	<img v-else :src="value">
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useImage } from '@vueuse/core'

export default defineComponent({
	setup(props) {
		const { isLoading } = useImage({ src: props.value })

		return {
			isLoading,
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
