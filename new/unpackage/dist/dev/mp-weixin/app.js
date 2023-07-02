"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_util = require("./utils/util.js");
require("./utils/request.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/article/article.js";
  "./pages/category/category.js";
  "./pages/video/video.js";
  "./pages/homeIndex/homeIndex.js";
  "./pages/calendar/calendar.js";
  "./pages_details/article_details/article_details.js";
  "./pages_details/SearchList/SearchList.js";
  "./pages_details/video_details/video_details.js";
  "./pages_details/videoDetails/videoDetails.js";
  "./pages_details/webview/webview.js";
}
const __default__ = {
  onLaunch: function() {
    console.log("App Launch");
    common_vendor.wx$1.hideShareMenu({
      menus: ["shareTimeline"]
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onLoad: function() {
    console.log("App Load");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    top: "",
    bottom: "",
    options: "",
    timeSelect: "",
    firstPage: true,
    festivalData: null,
    tabBarId: null,
    isFirst: 0,
    //观看视频的数量
    playNum: 0,
    showTabBar: true,
    flashList: [{
      id: 0,
      appId: "wx486e5812610e7d65",
      src: "https://mp.weixin.qq.com/s/zSZ96_kHHLTV4Q-SljeIuQ",
      isApp: false
    }, {
      id: 1,
      appId: "wxd02a9f032acb12fb",
      src: "",
      isApp: true
    }, {
      id: 2,
      appId: "wxf6372777032517e5",
      src: "",
      isApp: true
    }]
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "App",
  setup(__props) {
    const model = common_vendor.ref("");
    const appId = common_vendor.ref("");
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.onLaunch(() => {
      common_vendor.index.getSystemInfo({
        success(e) {
          model.value = e.osName;
          common_vendor.provide("model", model);
        }
      });
      appId.value = common_vendor.wx$1.getAccountInfoSync().miniProgram.appId;
      common_vendor.provide("appId", appId);
      function f_fail() {
        common_vendor.index.request({
          url: "https://www.51wnl.com/WxProgram/GetAllConfig.ashx?appid=ios-wnl-free&appver=2&lastupdate=",
          data: {},
          method: "GET",
          header: {
            "Content-Type": "application/json"
          }
        }).then((res) => {
          proxy.globalData.festivalData = JSON.parse(utils_util.r.base64decode(res.data.msg.Festival_ZH_CN));
        });
      }
      function f_success() {
      }
      proxy.globalData.festivalData ? f_success() : f_fail();
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
