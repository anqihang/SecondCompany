"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  name: "ax-topNav",
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: ["back", "name", "isShare", "backPage", "color", "backId"],
  setup(__props) {
    const props = __props;
    let type = common_vendor.ref("");
    const menuButtonInfo = common_vendor.ref(null);
    const top = common_vendor.ref("0px");
    const bottom = common_vendor.ref("0px");
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success(e) {
          type.value = e.osName;
        }
      });
      menuButtonInfo.value = common_vendor.index.getMenuButtonBoundingClientRect();
      top.value = menuButtonInfo.value.top + "px";
      bottom.value = menuButtonInfo.value.bottom + 10 + "px";
    });
    function f_navBack() {
      if (props.isShare) {
        if (props.backPage) {
          getApp().globalData.tabBarId = props.backId;
          common_vendor.index.switchTab({
            url: props.backPage
          });
        }
      } else {
        common_vendor.index.navigateBack({
          fail: () => {
            if (props.backPage) {
              getApp().globalData.tabBarId = props.backId;
              common_vendor.index.switchTab({
                url: props.backPage
              });
            }
          }
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.name),
        b: common_vendor.unref(type) == "ios" ? "34rpx" : "34rpx",
        c: props.back + "" != "undefined"
      }, props.back + "" != "undefined" ? {
        d: props.color ? "/static/svg/s-left_gold.svg" : "/static/svg/s-left.svg",
        e: props.color ? "gold" : "white",
        f: props.color ? "#F43530" : "rgba(0,0,0,0.5)",
        g: top.value,
        h: common_vendor.o(f_navBack)
      } : {}, {
        i: props.color ? props.color : "#F43530",
        j: bottom.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/components/ax-topNav/ax-topNav.vue"]]);
wx.createComponent(Component);
