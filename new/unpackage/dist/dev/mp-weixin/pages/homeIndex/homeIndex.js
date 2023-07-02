"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
const utils_share = require("../../utils/share.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_ax_topNav2 = common_vendor.resolveComponent("ax-topNav");
  const _easycom_ax_home2 = common_vendor.resolveComponent("ax-home");
  const _easycom_ax_home12 = common_vendor.resolveComponent("ax-home1");
  const _easycom_ax_tabBar2 = common_vendor.resolveComponent("ax-tabBar");
  const _easycom_ax_Flash2 = common_vendor.resolveComponent("ax-Flash");
  (_easycom_ax_topNav2 + _easycom_ax_home2 + _easycom_ax_home12 + _easycom_ax_tabBar2 + _easycom_ax_Flash2)();
}
const _easycom_ax_topNav = () => "../../components/ax-topNav/ax-topNav.js";
const _easycom_ax_home = () => "../../components/ax-home/ax-home.js";
const _easycom_ax_home1 = () => "../../components/ax-home1/ax-home1.js";
const _easycom_ax_tabBar = () => "../../components/ax-tabBar/ax-tabBar.js";
const _easycom_ax_Flash = () => "../../components/ax-Flash/ax-Flash.js";
if (!Math) {
  (_easycom_ax_topNav + _easycom_ax_home + _easycom_ax_home1 + _easycom_ax_tabBar + _easycom_ax_Flash)();
}
const __default__ = {
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "homeIndex",
  setup(__props) {
    const appId = common_vendor.inject("appId");
    let tabBarId = common_vendor.ref(null);
    const type = common_vendor.ref(false);
    const topTitle = common_vendor.ref("");
    const that = common_vendor.getCurrentInstance();
    function getTabBarId(item) {
      tabBarId.value = getApp().globalData.tabBarId;
      f_getPage({
        appId: appId.value
      });
    }
    const showFlash = common_vendor.ref(false);
    function f_getPage(o) {
      let a = false, b = false;
      utils_api.getTabBarList(o).then((data) => {
        data.xcxPageList.forEach((element) => {
          if (element.pageType == "1" && element.id == tabBarId.value) {
            topTitle.value = element.xcxPage.siteTitle;
            if (element.xcxPage.adConfig == "1") {
              showFlash.value = element.xcxPage.isShow == "0" ? false : true;
              type.value = false;
              if (!a) {
                that.refs.home1.tf();
                a = true;
              }
            } else if (element.xcxPage.adConfig == "2") {
              showFlash.value = element.xcxPage.isShow == "0" ? false : true;
              type.value = true;
              if (!b) {
                that.refs.home.tf();
                b = true;
              }
            }
          }
        });
      });
    }
    const advC = common_vendor.ref({
      status: null,
      advId: null,
      intervalNum: null,
      interstitialAd: null,
      firstNow: false
    });
    function f_getAdv(o) {
      utils_api.Adv(o).then((res) => {
        res.advertTypes.forEach((element) => {
          if (element.type == 2) {
            advC.value.status = element.status;
            advC.value.advId = element.content.trim();
            advC.value.intervalNum = element.intervalNum - 0;
          }
        });
        if (advC.value.status) {
          utils_adv.createAdv(advC.value);
        }
      });
    }
    const topH = common_vendor.ref(null);
    const bottomH = common_vendor.ref(null);
    common_vendor.onLoad((res) => {
      topH.value = getApp().globalData.top;
      bottomH.value = getApp().globalData.bottom;
      let rre = "";
      try {
        const re = getApp().globalData.options.replace(/\&/g, '","').replace(/\=/g, '":"');
        rre = JSON.parse('{"' + re + '"}');
      } catch (err) {
      }
      if (!rre.can) {
        utils_api.getTabBarList({
          appId: appId.value
        }).then((data) => {
          try {
            data.xcxPageList.forEach((element) => {
              if (element.pageType == "1") {
                let shareTabBarId = element.id;
                console.log(element, "ele");
                const info = "path=/pages/homeIndex/homeIndex&type=tabBar&share=true&can=true&tabBarId=" + shareTabBarId;
                utils_share.share(info);
                throw new Error();
              }
            });
          } catch (e) {
          }
        });
      }
      if (getApp().globalData.firstPage) {
        advC.value.firstNow = true;
        getApp().globalData.firstPage = false;
      }
      f_getAdv({ appId: appId.value });
    });
    common_vendor.onShow(() => {
      common_vendor.index.hideTabBar({
        animation: false
      });
      tabBarId.value = getApp().globalData.tabBarId;
      f_getPage({
        appId: appId.value
      });
      if (advC.value.intervalNum) {
        utils_adv.showAdv(advC.value);
      }
    });
    common_vendor.onHide(() => {
      utils_adv.clearTimer();
    });
    common_vendor.onUnload(() => {
      utils_adv.clearTimer();
    });
    getApp().globalData.flashList;
    const showTabBar = getApp().globalData.showTabBar;
    common_vendor.onShareAppMessage(() => {
      return {
        title: topTitle.value,
        path: "/pages/index/index?path=/pages/homeIndex/homeIndex&tabBarId=" + getApp().globalData.tabBarId
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: topTitle.value
        }),
        b: common_vendor.sr("home", "b090df70-1"),
        c: type.value ? "1" : "-1",
        d: common_vendor.p({
          id: "home",
          ["is-show"]: type.value
        }),
        e: common_vendor.sr("home1", "b090df70-2"),
        f: type.value ? "-1" : "1",
        g: common_vendor.p({
          id: "home1",
          ["is-show"]: !type.value
        }),
        h: topH.value,
        i: bottomH.value,
        j: common_vendor.unref(showTabBar)
      }, common_vendor.unref(showTabBar) ? {
        k: common_vendor.unref(tabBarId),
        l: common_vendor.o(getTabBarId),
        m: common_vendor.p({
          id: common_vendor.unref(tabBarId)
        })
      } : {}, {
        n: showFlash.value
      }, showFlash.value ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages/homeIndex/homeIndex.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
