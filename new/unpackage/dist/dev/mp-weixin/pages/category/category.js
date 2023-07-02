"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
const utils_share = require("../../utils/share.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_ax_topNav2 = common_vendor.resolveComponent("ax-topNav");
  const _component_t_search = common_vendor.resolveComponent("t-search");
  const _component_t_divider = common_vendor.resolveComponent("t-divider");
  const _easycom_ax_tabBar2 = common_vendor.resolveComponent("ax-tabBar");
  (_easycom_ax_topNav2 + _component_t_search + _component_t_divider + _easycom_ax_tabBar2)();
}
const _easycom_ax_topNav = () => "../../components/ax-topNav/ax-topNav.js";
const _easycom_ax_tabBar = () => "../../components/ax-tabBar/ax-tabBar.js";
if (!Math) {
  (_easycom_ax_topNav + _easycom_ax_tabBar)();
}
const __default__ = {
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "category",
  setup(__props) {
    const appId = common_vendor.inject("appId");
    const showTabBar = getApp().globalData.showTabBar;
    let tabBarId = common_vendor.ref(null);
    function getTabBarId(item) {
      tabBarId.value = getApp().globalData.tabBarId;
      f_getPage({
        appId: appId.value
      });
    }
    const search = common_vendor.ref("");
    const categoryList = common_vendor.ref([]);
    function f_getCategoryItems(o) {
      utils_api.categoryItems(o).then((data) => {
        categoryList.value = data.articleCateList;
      });
    }
    const topTitle = common_vendor.ref(null);
    function f_getPage(o) {
      utils_api.getTabBarList(o).then((data) => {
        data.xcxPageList.forEach((element) => {
          if (element.pageType == "4" && element.id == tabBarId.value) {
            topTitle.value = element.xcxPage.siteTitle;
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
    function getAdv() {
      utils_api.Adv({
        appId: appId.value
      }).then((res) => {
        res.advertPlaceConfigs.forEach((element) => {
        });
        res.advertTypes.forEach((element) => {
          if (element.type == 2) {
            advC.value.status = element.status;
            advC.value.advId = element.content.trim();
            advC.value.intervalNum = element.intervalNum;
          }
        });
        if (advC.value.status) {
          utils_adv.createAdv(advC.value);
        }
      });
    }
    common_vendor.onShow(() => {
      common_vendor.index.hideTabBar({
        animation: false
      });
      common_vendor.wx$1.hideShareMenu({
        menus: ["shareTimeline"]
      });
      getAdv({
        appId: appId.value
      });
      tabBarId.value = getApp().globalData.tabBarId;
      if (advC.value.interstitialAd) {
        utils_adv.showAdv(advC.value);
      }
    });
    common_vendor.onHide(() => {
      utils_adv.clearTimer();
    });
    common_vendor.onUnload(() => {
      utils_adv.clearTimer();
    });
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
          console.log("arti");
          try {
            data.xcxPageList.forEach((element) => {
              if (element.pageType == "4") {
                let shareTabBarId = element.id;
                console.log(element, "ele");
                const info = "path=/pages/category/category&type=tabBar&share=true&can=true&tabBarId=" + shareTabBarId;
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
      f_getCategoryItems({
        appId: appId.value
      });
      f_getPage({
        appId: appId.value
      });
    });
    function f_goSearchList(item) {
      common_vendor.index.navigateTo({
        url: "/pages_details/SearchList/SearchList?name=" + item.title + "&id=" + item.id + "&typeId=" + item.type
      });
    }
    function f_search(e) {
      search.value = e.detail.value;
      common_vendor.index.navigateTo({
        url: "/pages_details/SearchList/SearchList?name=&id=" + null + "&search=" + search.value
      });
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: topTitle.value,
        path: "/pages/index/index?path=/pages/category/category&tabBarId=" + getApp().globalData.tabBarId
        // + '&type=tabBar' + '&share=true',
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: topTitle.value
        }),
        b: common_vendor.o(($event) => f_search($event)),
        c: common_vendor.p({
          value: search.value,
          placeholder: "请输入搜索内容/关键字",
          shape: "round"
        }),
        d: common_vendor.f(categoryList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => f_goSearchList(item), index)
          };
        }),
        e: common_vendor.p({
          dashed: true,
          content: "已无更多数据"
        }),
        f: topH.value,
        g: bottomH.value,
        h: common_vendor.unref(showTabBar)
      }, common_vendor.unref(showTabBar) ? {
        i: common_vendor.unref(tabBarId),
        j: common_vendor.o(getTabBarId),
        k: common_vendor.p({
          id: common_vendor.unref(tabBarId)
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages/category/category.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
