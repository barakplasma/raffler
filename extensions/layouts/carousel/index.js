import { defineComponent, reactive, ref, openBlock, createElementBlock, createElementVNode, toDisplayString } from 'vue';
import { useItems, defineLayout } from '@directus/extensions-sdk';

var script = defineComponent({
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
            _nnull: true
          },
          full_name: {
            _nnull: true
          }
        }),
        search: ref(),
        page: ref(1)
      }).items
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
      state
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

const _hoisted_1 = { class: "carousel" };
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "controls" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, [
    createElementVNode("section", _hoisted_1, [
      createElementVNode("img", {
        src: _ctx.state.items[_ctx.state.index]?.photo_url
      }, null, 8 /* PROPS */, _hoisted_2),
      createElementVNode("div", _hoisted_3, [
        createElementVNode("h3", null, toDisplayString(_ctx.state.items[_ctx.state.index]?.full_name), 1 /* TEXT */),
        createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.prev && _ctx.prev(...args)))
        }, "Prev"),
        createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.next && _ctx.next(...args)))
        }, "Next")
      ])
    ])
  ]))
}

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "\n.carousel[data-v-24b4a97a] {\n\tposition: relative;\n\theight: 300px;\n\twidth: 400px;\n\tmargin: auto;\n}\n.carousel img[data-v-24b4a97a] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n\tobject-fit: cover;\n}\n.controls[data-v-24b4a97a] {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n\tmargin-bottom: 10px;\n\tcolor: white;\n\tbackground-color: hsla(0, 0%, 0%, 0.5);\n}\nbutton[data-v-24b4a97a] {\n\tmargin: 0 10px;\n\tborder: 1px solid white;\n\tborder-radius: 25%;\n}\n";
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
