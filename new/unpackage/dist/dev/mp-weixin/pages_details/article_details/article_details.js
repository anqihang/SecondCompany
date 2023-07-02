"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
require("../../utils/request.js");
const utils_share = require("../../utils/share.js");
if (!Array) {
  const _easycom_ax_topNav2 = common_vendor.resolveComponent("ax-topNav");
  const _component_t_icon = common_vendor.resolveComponent("t-icon");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _easycom_ax_tabBar2 = common_vendor.resolveComponent("ax-tabBar");
  (_easycom_ax_topNav2 + _component_t_icon + _component_t_image + _easycom_ax_tabBar2)();
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
  __name: "article_details",
  setup(__props) {
    common_vendor.inject("model");
    const appId = common_vendor.inject("appId");
    const showTabBar = getApp().globalData.showTabBar;
    const title = common_vendor.ref("");
    const updataTime = common_vendor.ref("");
    const content = common_vendor.ref("");
    const num = common_vendor.ref({
      read: 0,
      like: 0
    });
    const id = common_vendor.ref(null);
    function f_getNewInfo(o) {
      if (from.value == "home") {
        utils_api.newInfoHome({ id: o.id }).then((data) => {
          title.value = data.article.title;
          updataTime.value = data.article.createTime;
          content.value = data.article.content;
          num.value.read = data.article.readCnt;
          num.value.like = data.article.likeCnt;
          isLike.value = data.article.liked;
          suggestList.value = data.recommends;
          if (suggestList.length > 0) {
            suggestList.value.forEach((item) => {
              if (item.picPath) {
                item.picPath = item.picPath.split(",")[0];
              }
            });
          }
        });
      } else {
        utils_api.newInfo(o).then((data) => {
          title.value = data.article.title;
          updataTime.value = data.article.createTime;
          content.value = data.article.content;
          num.value.read = data.article.readCnt;
          num.value.like = data.article.likeCnt;
          isLike.value = data.article.liked;
          suggestList.value = data.recommends;
          if (suggestList.length > 0) {
            suggestList.value.forEach((item) => {
              if (item.picPath) {
                item.picPath = item.picPath.split(",")[0];
              }
            });
          }
        });
      }
    }
    const isLike = common_vendor.ref(false);
    const suggestList = common_vendor.ref([]);
    const isFromShare = common_vendor.ref(false);
    const backPage = common_vendor.ref(null);
    const pagesArr = common_vendor.ref(null);
    pagesArr.value = getCurrentPages();
    const backId = common_vendor.ref(null);
    const advT = common_vendor.ref({
      status: null,
      every: null,
      advId: null,
      type: null
    });
    const advB = common_vendor.ref({
      status: null,
      every: null,
      advId: null,
      type: null
    });
    const advC = common_vendor.ref({
      status: null,
      advId: null,
      intervalNum: null,
      interstitialAd: null
    });
    function f_getAdv(o) {
      utils_api.Adv(o).then((res) => {
        let typeT = null;
        let typeB = null;
        res.advertPlaceConfigs.forEach((element) => {
          if (element.title == "top_adv") {
            typeT = element.advertTypeId;
            advT.value.status = element.status;
            advT.value.every = element.acticleCnt;
            advT.value.type = element.advertTypeId;
          }
          if (element.title == "bottom_adv") {
            typeB = element.advertTypeId;
            advB.value.status = element.status;
            advB.value.every = element.acticleCnt;
            advB.value.type = element.advertTypeId;
          }
        });
        res.advertTypes.forEach((element) => {
          if (typeT == element.type) {
            advT.value.advId = element.content.trim();
          }
          if (typeB == element.type) {
            advB.value.advId = element.content.trim();
          }
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
    const from = common_vendor.ref("");
    const topH = common_vendor.ref(null);
    const bottomH = common_vendor.ref(null);
    common_vendor.onLoad((res) => {
      topH.value = getApp().globalData.top;
      bottomH.value = getApp().globalData.bottom;
      from.value = res.from;
      console.log(res, "res");
      if (!res.can) {
        utils_api.getTabBarList({
          appId: appId.value
        }).then((data) => {
          try {
            data.xcxPageList.forEach((element) => {
              if (element.pageType == "3") {
                let shareTabBarId = element.id;
                console.log(element, "ele");
                const info = "path=/pages_details/article_details/article_details&type=noTabBar&share=true&backPage=/pages/article/article&id=" + res.id + "&can=true&tabBarId=" + shareTabBarId;
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
      backId.value = res.tabBarId;
      if (res.share) {
        isFromShare.value = true;
      } else {
        isFromShare.value = false;
      }
      backPage.value = res.backPage || "/pages/article/article";
      id.value = res.id - 0;
      f_getNewInfo({
        id: id.value,
        appId: appId.value
      });
    });
    common_vendor.onShow(() => {
      common_vendor.wx$1.hideShareMenu({
        menus: ["shareTimeline"]
      });
      f_getAdv({
        appId: appId.value
      });
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
    common_vendor.onMounted(() => {
    });
    function f_like(o) {
      utils_api.like(o).then((data) => {
        if (data.code == 200) {
          isLike.value = true;
        }
      });
    }
    function f_cancelLike(o) {
      utils_api.cancelLike(o).then((data) => {
        if (data.code == 200) {
          isLike.value = false;
        }
      });
    }
    function f_up() {
      if (isLike.value) {
        f_cancelLike({
          id: id.value,
          appId: appId.value
        });
        num.value.like -= 1;
      } else {
        f_like({
          id: id.value,
          appId: appId.value
        });
        num.value.like += 1;
      }
    }
    const showAll = common_vendor.ref(false);
    function f_showAll() {
      showAll.value = true;
    }
    const scrollTop = common_vendor.ref(null);
    const oldScrollTop = common_vendor.ref(null);
    function f_scroll(e) {
      oldScrollTop.value = e.detail.scrollTop;
    }
    function f_refresh(item) {
      f_getNewInfo({
        id: item.id,
        appId: appId.value
      });
      scrollTop.value = oldScrollTop.value;
      let timer = setTimeout(() => {
        scrollTop.value = 0;
        clearTimeout(timer);
      }, 100);
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: title.value,
        path: "/pages/index/index?path=/pages_details/article_details/article_details&type=noTabBar&share=true&backPage=/pages/article/article&id=" + id.value + "&tabBarId=" + backId.value + "&can=true"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: title.value,
          back: true,
          isShare: isFromShare.value,
          backId: backId.value,
          backPage: backPage.value
        }),
        b: advT.value.status == 1 && advT.value.advId && advT.value.type == 3
      }, advT.value.status == 1 && advT.value.advId && advT.value.type == 3 ? {
        c: advT.value.advId
      } : {}, {
        d: advT.value.status == 1 && advT.value.advId && advT.value.type == 1
      }, advT.value.status == 1 && advT.value.advId && advT.value.type == 1 ? {
        e: advT.value.advId
      } : {}, {
        f: common_vendor.t(title.value),
        g: common_vendor.t(updataTime.value),
        h: content.value,
        i: common_vendor.t(num.value.read),
        j: isLike.value ? "red" : "",
        k: common_vendor.p({
          name: "thumb-up",
          size: "40rpx"
        }),
        l: common_vendor.o(f_up),
        m: common_vendor.t(num.value.like),
        n: showAll.value ? "unset" : "500rpx",
        o: !showAll.value ? "0 4rpx 2rpx 1rpx #fcfcfc" : "unset",
        p: !showAll.value
      }, !showAll.value ? {
        q: common_vendor.o(f_showAll)
      } : {}, {
        r: common_vendor.p({
          name: "logo-wechat",
          size: "48rpx"
        }),
        s: common_vendor.p({
          name: "logo-wechat",
          size: "48rpx"
        }),
        t: advB.value.status == 1 && advB.value.advId && advB.value.type == 3
      }, advB.value.status == 1 && advB.value.advId && advB.value.type == 3 ? {
        v: advB.value.advId
      } : {}, {
        w: advB.value.status == 1 && advB.value.advId && advB.value.type == 1
      }, advB.value.status == 1 && advB.value.advId && advB.value.type == 1 ? {
        x: advB.value.advId
      } : {}, {
        y: suggestList.value.length > 0
      }, suggestList.value.length > 0 ? {
        z: common_vendor.f(suggestList.value, (item, index, i0) => {
          return {
            a: "5f0fd2d7-4-" + i0,
            b: common_vendor.p({
              src: "https://xcx.wujingchuanmei.com/api" + item.picPath,
              mode: "aspectFill",
              shape: "round",
              ariaLabel: "img"
            }),
            c: common_vendor.t(item.title),
            d: common_vendor.o(($event) => f_refresh(item), index),
            e: index
          };
        })
      } : {}, {
        A: scrollTop.value,
        B: common_vendor.o(f_scroll),
        C: topH.value,
        D: bottomH.value,
        E: common_vendor.unref(showTabBar)
      }, common_vendor.unref(showTabBar) ? {
        F: backId.value,
        G: common_vendor.p({
          id: backId.value
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages_details/article_details/article_details.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
