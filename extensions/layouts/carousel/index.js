import { ref, defineComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, Fragment, renderList, createBlock, withCtx, createVNode, createTextVNode } from 'vue';
import { useItems, defineLayout } from '@directus/extensions-sdk';

const collection = ref("");
var script = defineComponent({
  setup: (props) => {
    collection.value = props.collection;
    const items = useItems(collection, { fields: ["*.*"] }).items;
    return {
      name: props.name,
      collection: props.collection,
      items
    };
  },
  inheritAttrs: false,
  props: {
    collection: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
});

const _hoisted_1 = { class: "container" };
const _hoisted_2 = ["src"];
const _hoisted_3 = {
  key: 1,
  src: "https://picsum.photos/200/200"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_v_card = resolveComponent("v-card");

  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("p", null, "Name: " + toDisplayString(_ctx.name), 1 /* TEXT */),
    createElementVNode("p", null, "Collection: " + toDisplayString(_ctx.collection), 1 /* TEXT */),
    createElementVNode("section", _hoisted_1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
        return (openBlock(), createBlock(_component_v_card, null, {
          default: withCtx(() => [
            (item.photo_url)
              ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: item.photo_url
                }, null, 8 /* PROPS */, _hoisted_2))
              : (openBlock(), createElementBlock("img", _hoisted_3)),
            createVNode(_component_v_card_title, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(item.full_name), 1 /* TEXT */)
              ]),
              _: 2 /* DYNAMIC */
            }, 1024 /* DYNAMIC_SLOTS */)
          ]),
          _: 2 /* DYNAMIC */
        }, 1024 /* DYNAMIC_SLOTS */))
      }), 256 /* UNKEYED_FRAGMENT */))
    ])
  ]))
}

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.container[data-v-24b4a97a] {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(3, 1fr);\n\tgrid-gap: 1rem;\n}\n";
n(css,{});

script.render = render;
script.__scopeId = "data-v-24b4a97a";
script.__file = "src/layout.vue";

var index = defineLayout({
  id: "custom",
  name: "Carousel",
  icon: "view_carousel",
  component: script,
  slots: {
    options: () => null,
    sidebar: () => null,
    actions: () => null
  },
  setup() {
    const name = ref("Carousel Layout");
    return { name };
  }
});

export { index as default };
