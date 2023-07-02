"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_login = require("../../utils/login.js");
require("../../utils/request.js");
const __default__ = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {}
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  setup(__props) {
    const appId = common_vendor.inject("appId");
    const path = common_vendor.ref(null);
    const type = common_vendor.ref(null);
    let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    getApp().globalData.top = menuButtonInfo.bottom + 10 + "px";
    common_vendor.index.getSystemInfo({
      success(e) {
        type.value = e.osName;
        if (type.value == "ios") {
          getApp().globalData.bottom = "164rpx";
        } else {
          getApp().globalData.bottom = "130rpx";
        }
      }
    });
    common_vendor.onLoad((options) => {
      console.log(options, "options");
      if (options.tabBarId) {
        getApp().globalData.tabBarId = options.tabBarId;
      }
      appId.value = common_vendor.wx$1.getAccountInfoSync().miniProgram.appId;
      let s = JSON.stringify(options).replace(/,/g, "&").replace(/"/g, "").replace(/:/g, "=").replace(/{/, "").replace(/}/, "");
      path.value = options.path || null;
      type.value = options.type || "tabBar";
      if (!path.value)
        ;
      utils_login.login(appId.value).then((res) => {
        utils_api.getTabBarList({
          appId: appId.value
        }).then((data) => {
          getApp().globalData.flashList = data.xcxFloatings;
          let tabType = data.xcxPageList[0].pageType;
          const _list = common_vendor.ref([]);
          data.xcxPageList.forEach((res2) => {
            if (res2.bottomStatus == "1") {
              _list.value.push(res2);
            }
          });
          tabType = _list.value[0].pageType;
          getApp().globalData.tabBarId = _list.value[0].id;
          switch (tabType) {
            case "1":
              {
                path.value = "/pages/homeIndex/homeIndex";
              }
              break;
            case "2":
              {
                path.value = "/pages/video/video";
              }
              break;
            case "3":
              {
                path.value = "/pages/article/article";
              }
              break;
            case "4":
              {
                path.value = "/pages/category/category";
              }
              break;
          }
          if (_list.value.length <= 1) {
            getApp().globalData.showTabBar = false;
            getApp().globalData.bottom = 0;
          }
          if (options.path) {
            console.log(options);
            getApp().globalData.tabBarId = options.tabBarId;
            if (type.value == "tabBar") {
              getApp().globalData.options = s;
              common_vendor.index.switchTab({
                url: options.path
              });
            } else {
              common_vendor.index.redirectTo({
                url: options.path + "?" + s
              });
            }
          } else {
            getApp().globalData.options = "can=true";
            common_vendor.index.switchTab({
              url: path.value
            });
          }
        });
      });
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
