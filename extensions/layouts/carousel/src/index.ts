import { ref } from 'vue';
import { defineLayout } from '@directus/extensions-sdk';
import LayoutComponent from './layout.vue';

export default defineLayout({
	id: 'custom',
	name: 'Carousel',
	icon: 'view_carousel',
	component: LayoutComponent,
	slots: {
		options: () => null,
		sidebar: () => null,
		actions: () => null,
	},
	setup() {
		const name = ref('Carousel Layout');

		return { name };
	},
});
