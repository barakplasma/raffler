import { defineDisplay } from '@directus/extensions-sdk';
import { defineComponent, openBlock, createElementBlock } from 'vue';

var script = defineComponent({
    props: {
        value: {
            type: String,
            default: null,
        },
    },
});

const _hoisted_1 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("img", {
    src: _ctx.value,
    alt: ""
  }, null, 8 /* PROPS */, _hoisted_1))
}

script.render = render;
script.__file = "src/display.vue";

var index = defineDisplay({
    id: 'photo-url',
    name: 'Photo URL',
    icon: 'image',
    description: 'This displays an external photo url',
    component: script,
    options: null,
    types: ['string'],
});

export { index as default };
