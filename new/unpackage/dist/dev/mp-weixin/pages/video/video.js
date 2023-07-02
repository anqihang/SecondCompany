"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
const utils_share = require("../../utils/share.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_ax_topNav2 = common_vendor.resolveComponent("ax-topNav");
  const _component_t_search = common_vendor.resolveComponent("t-search");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _component_t_divider = common_vendor.resolveComponent("t-divider");
  const _easycom_ax_tabBar2 = common_vendor.resolveComponent("ax-tabBar");
  const _easycom_ax_Flash2 = common_vendor.resolveComponent("ax-Flash");
  (_easycom_ax_topNav2 + _component_t_search + _component_t_image + _component_t_divider + _easycom_ax_tabBar2 + _easycom_ax_Flash2)();
}
const _easycom_ax_topNav = () => "../../components/ax-topNav/ax-topNav.js";
const _easycom_ax_tabBar = () => "../../components/ax-tabBar/ax-tabBar.js";
const _easycom_ax_Flash = () => "../../components/ax-Flash/ax-Flash.js";
if (!Math) {
  (_easycom_ax_topNav + _easycom_ax_tabBar + _easycom_ax_Flash)();
}
const __default__ = {
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "video",
  setup(__props) {
    const appId = common_vendor.inject("appId");
    let tabBarId = common_vendor.ref(null);
    const showTabBar = getApp().globalData.showTabBar;
    function getTabBarId(item) {
      tabBarId.value = getApp().globalData.tabBarId;
      f_getPage({
        appId: appId.value
      });
    }
    const navList = common_vendor.ref([]);
    let select = common_vendor.ref(-1);
    const list = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const newsObject = common_vendor.ref({
      appId: appId.value,
      page: page.value,
      type: null
    });
    const buttom = common_vendor.ref(false);
    const refresh = common_vendor.ref(true);
    function f_getVideoList(o) {
      utils_api.videoList(o).then((data) => {
        if (data.videoList.length > 0) {
          data.videoList.forEach((item) => {
            item.icon = item.icon.split(",")[0];
          });
        }
        if (data.videoList.length < 1) {
          refresh.value = false;
        }
        if (buttom.value) {
          list.value = list.value.concat(data.videoList);
          buttom.value = false;
        } else {
          list.value = data.videoList;
        }
      });
    }
    function f_getItems(o) {
      utils_api.getVideoItems(o).then((res) => {
        navList.value = res.xcxVideoTypeList;
      });
    }
    const search = common_vendor.ref("");
    function f_changeSelect(item) {
      select.value = item.id;
      if (item.id == -1) {
        newsObject.value.type = null;
      } else {
        newsObject.value.type = item.id;
      }
      newsObject.value.title = search.value;
      refresh.value = true;
      page.value = 1;
      f_getVideoList(newsObject.value);
    }
    function f_search(e) {
      page.value = 1;
      search.value = e.detail.value;
      const title = e.detail.value;
      f_getVideoList({
        appId: appId.value,
        page: page.value,
        title,
        type: newsObject.value.type
      });
    }
    function f_clear() {
      search.value = "";
      newsObject.value.title = "";
      refresh.value = true;
      page.value = 1;
      f_getVideoList(newsObject.value);
    }
    const topTitle = common_vendor.ref(null);
    const showFlash = common_vendor.ref(false);
    const videoInfoType = common_vendor.ref(false);
    function f_getPage(o) {
      utils_api.getTabBarList(o).then((data) => {
        data.xcxPageList.forEach((element) => {
          if (element.pageType == "2" && element.id == tabBarId.value) {
            showFlash.value = element.xcxPage.isShow == "0" ? false : true;
            topTitle.value = element.xcxPage.siteTitle;
            tabBarId.value = element.id;
          }
          if (element.pageType == "2") {
            if (element.xcxPage.adConfig == "1") {
              videoInfoType.value = false;
            } else if (element.xcxPage.adConfig == "2") {
              videoInfoType.value = true;
            }
          }
        });
      });
    }
    const adv = common_vendor.ref({
      status: null,
      every: null,
      advId: null,
      type: null
    });
    const advC = common_vendor.ref({
      status: null,
      advId: null,
      intervalNum: null,
      interstitialAd: null,
      firstNow: false
    });
    function f_getAdv(o) {
      utils_api.Adv(o).then((res) => {
        let type = null;
        res.advertPlaceConfigs.forEach((element) => {
          if (element.title == "config_vid") {
            type = element.advertTypeId;
            adv.value.status = element.status;
            adv.value.every = element.acticleCnt;
            adv.value.type = element.advertTypeId;
          }
        });
        res.advertTypes.forEach((element) => {
          if (type == element.type) {
            adv.value.advId = element.content.trim();
          }
          if (element.type == 2) {
            advC.value.status = element.status;
            advC.value.advId = element.content.trim();
            advC.value.intervalNum = element.intervalNum;
          }
        });
        if (advC.value.status) {
          console.log(advC.value);
          utils_adv.createAdv(advC.value);
        }
      });
    }
    common_vendor.onShow(() => {
      common_vendor.index.hideTabBar({ animation: false });
      common_vendor.wx$1.hideShareMenu({
        menus: ["shareTimeline"]
      });
      f_getAdv({
        appId: appId.value
      });
      tabBarId.value = getApp().globalData.tabBarId;
      f_getPage({
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
              if (element.pageType == "2") {
                let shareTabBarId = element.id;
                console.log(element, "ele");
                const info = "path=/pages/video/video&type=tabBar&share=true&can=true&tabBarId=" + shareTabBarId;
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
      f_getItems({
        appId: appId.value
      });
      f_getPage({
        appId: appId.value
      });
      f_getVideoList(newsObject.value);
    });
    function f_go(item) {
      console.log(videoInfoType.value, "12");
      if (videoInfoType.value) {
        common_vendor.index.navigateTo({
          url: "/pages_details/video_details/video_details?id=" + item.id + "&can=true&tabBarId=" + tabBarId.value
          // + '&tabBarId=' + tabBarId					.value,
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages_details/videoDetails/videoDetails?id=" + item.id + "&can=true&tabBarId=" + tabBarId.value
          // + '&tabBarId=' + tabBarId.value,
        });
      }
    }
    function f_touchBottom(e) {
      if (refresh.value) {
        buttom.value = true;
        page.value += 1;
        f_getVideoList({
          appId: appId.value,
          page: page.value,
          type: newsObject.value.type,
          title: search.value
        });
      }
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: topTitle.value,
        path: "/pages/index/index?path=/pages/video/video&tabBarId=" + getApp().globalData.tabBarId
        // + '&type=tabBar' + '&share=true' + '&id=' +				newsObject.value.type,
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: topTitle.value
        }),
        b: common_vendor.o(($event) => f_search($event)),
        c: common_vendor.o(f_clear),
        d: common_vendor.p({
          value: search.value,
          placeholder: "请输入搜索内容/关键字",
          shape: "round"
        }),
        e: common_vendor.unref(select) == -1 ? 1 : "",
        f: common_vendor.o(($event) => f_changeSelect({
          id: -1
        })),
        g: common_vendor.f(navList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id == common_vendor.unref(select) ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => f_changeSelect(item), index)
          };
        }),
        h: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: "fc7cf050-2-" + i0,
            b: common_vendor.p({
              src: "https://xcx.wujingchuanmei.com/api" + item.icon,
              mode: "aspectFill",
              shape: "round",
              ariaLabel: "img"
            }),
            c: common_vendor.t(item.title),
            d: common_vendor.o(($event) => f_go(item), index),
            e: adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 1
          }, adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 1 ? {
            f: adv.value.advId
          } : {}, {
            g: adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 3
          }, adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 3 ? {
            h: adv.value.advId
          } : {}, {
            i: index
          });
        }),
        i: common_vendor.p({
          dashed: true,
          content: "已无更多数据"
        }),
        j: common_vendor.o(f_touchBottom),
        k: topH.value,
        l: bottomH.value,
        m: common_vendor.unref(showTabBar)
      }, common_vendor.unref(showTabBar) ? {
        n: common_vendor.unref(tabBarId),
        o: common_vendor.o(getTabBarId),
        p: common_vendor.p({
          id: common_vendor.unref(tabBarId)
        })
      } : {}, {
        q: showFlash.value
      }, showFlash.value ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages/video/video.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
