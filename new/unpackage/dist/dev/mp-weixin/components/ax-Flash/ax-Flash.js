"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_ax_flashGet2 = common_vendor.resolveComponent("ax-flashGet");
  _easycom_ax_flashGet2();
}
const _easycom_ax_flashGet = () => "../ax-flashGet/ax-flashGet.js";
if (!Math) {
  _easycom_ax_flashGet();
}
const __default__ = {
  name: "ax-Flash",
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const flashList = getApp().globalData.flashList;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(flashList), (item, index, i0) => {
          return {
            a: "145831aa-0-" + i0,
            b: common_vendor.p({
              index,
              appId: item.jumpAppid,
              href: item.jumpPath,
              isApp: item.type == 1 ? false : true,
              img: item.icon
            }),
            c: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/components/ax-Flash/ax-Flash.vue"]]);
wx.createComponent(Component);
