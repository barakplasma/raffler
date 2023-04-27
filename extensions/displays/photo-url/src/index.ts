import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
	id: 'photo-url',
	name: 'Photo URL',
	icon: 'image',
	description: 'This displays an external photo url',
	component: DisplayComponent,
	options: null,
	types: ['string'],
});
