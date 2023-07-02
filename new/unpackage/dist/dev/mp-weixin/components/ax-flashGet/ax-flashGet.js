"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  name: "ax-flashGet",
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: ["index", "appId", "href", "isApp", "img"],
  setup(__props) {
    const props = __props;
    const { proxy } = common_vendor.getCurrentInstance();
    const list = common_vendor.ref([{ id: 0 }]);
    const h = common_vendor.ref(null);
    const w = common_vendor.ref(null);
    const screenWidth = common_vendor.ref(null);
    const screenHeight = common_vendor.ref(null);
    const topHeight = common_vendor.ref(null);
    common_vendor.ref(null);
    const offsetLeft = common_vendor.ref(null);
    const offsetTop = common_vendor.ref(null);
    common_vendor.ref(null);
    common_vendor.ref(null);
    const startPoint = common_vendor.ref({});
    function f_start(e) {
      offsetLeft.value = e.currentTarget.offsetLeft;
      offsetTop.value = e.currentTarget.offsetTop;
      startPoint.value = e.changedTouches[0];
    }
    function f_move(e) {
      let x, y;
      x = e.changedTouches[0].clientX - startPoint.value.clientX;
      y = e.changedTouches[0].clientY - startPoint.value.clientY;
      offsetLeft.value += x;
      offsetTop.value += y;
      if (offsetLeft.value < 0) {
        offsetLeft.value = 0;
      }
      if (offsetTop.value - topHeight.value + h.value * 1.1 * props.index < 0) {
        offsetTop.value = topHeight.value - h.value * 1.1 * props.index;
      }
      if (offsetLeft.value + w.value > screenWidth.value) {
        offsetLeft.value = screenWidth.value - w.value;
      }
      if (offsetTop.value + h.value + h.value * 1.1 * props.index > screenHeight.value) {
        offsetTop.value = screenHeight.value - h.value - h.value * 1.1 * props.index;
      }
      startPoint.value = e.changedTouches[0];
    }
    function f_end(e) {
      startPoint.value = e.changedTouches[0];
    }
    common_vendor.onMounted(() => {
      common_vendor.index.getSystemInfo({
        success(data) {
          screenWidth.value = data.windowWidth;
          screenHeight.value = data.windowHeight;
        }
      });
      let menuButton = common_vendor.index.getMenuButtonBoundingClientRect();
      topHeight.value = menuButton.bottom + 10;
      common_vendor.index.createSelectorQuery().in(proxy).select("#flashGet").boundingClientRect((data) => {
        h.value = data.height;
        w.value = data.width;
      }).exec();
    });
    function f_navigateNewMiNi() {
      if (props.isApp) {
        console.log("isapp");
        common_vendor.index.navigateToMiniProgram({
          appId: props.appId,
          path: props.href
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages_details/webview/webview?src=" + props.href
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: index
          };
        }),
        b: "https://xcx.wujingchuanmei.com/api" + props.img,
        c: offsetLeft.value + "px!important",
        d: offsetTop.value + "px!important",
        e: "translateY(" + 110 * props.index + "%)",
        f: common_vendor.o(f_start),
        g: common_vendor.o(f_move),
        h: common_vendor.o(f_end),
        i: common_vendor.o(f_navigateNewMiNi)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/components/ax-flashGet/ax-flashGet.vue"]]);
wx.createComponent(Component);
