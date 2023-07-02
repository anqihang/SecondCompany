"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "webview",
  setup(__props) {
    const href = common_vendor.ref(null);
    common_vendor.onLoad((res) => {
      if (res.src) {
        href.value = res.src;
        console.log(href.value);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: href.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages_details/webview/webview.vue"]]);
wx.createPage(MiniProgramPage);
