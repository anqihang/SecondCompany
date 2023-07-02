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
  __name: "article",
  setup(__props) {
    const showTabBar = getApp().globalData.showTabBar;
    const appId = common_vendor.inject("appId");
    let tabBarId = common_vendor.ref(null);
    const BS = common_vendor.ref(true);
    function getTabBarId(item) {
      tabBarId.value = getApp().globalData.tabBarId;
      f_getPage({
        appId: appId.value
      });
    }
    const navList = common_vendor.ref([]);
    let select = common_vendor.ref(-1);
    const search = common_vendor.ref("");
    function f_getItems(o) {
      utils_api.getItems(o).then((res) => {
        navList.value = res.articleCateList;
      });
    }
    function f_changeSelect(item) {
      select.value = item.id;
      if (item.id == -1) {
        newsObject.value.cid = "";
      }
      if (item.type == 2) {
        newsObject.value.cid = item.id;
      }
      newsObject.value.title = search.value;
      isRefresh.value = true;
      newsObject.value.page = 1;
      f_getNewList(newsObject.value);
    }
    function f_search(e) {
      newsObject.value.page = 1;
      search.value = e.detail.value;
      f_getNewList({
        appId: appId.value,
        page: newsObject.value.page,
        title: e.detail.value,
        cid: newsObject.value.cid
      });
    }
    function f_clear() {
      newsObject.value.page = 1;
      search.value = "";
      newsObject.value.title = "";
      isRefresh.value = true;
      f_getNewList(newsObject.value);
    }
    const list = common_vendor.ref([]);
    const newsObject = common_vendor.ref({
      appId: appId.value,
      page: 1,
      cid: "",
      title: ""
    });
    const buttom = common_vendor.ref(false);
    const isRefresh = common_vendor.ref(true);
    function f_getNewList(o) {
      utils_api.homeNewList(o).then((data) => {
        if (data.articleList.length > 0) {
          data.articleList.forEach((item) => {
            if (item.picPath) {
              item.picPath = item.picPath.split(",")[0];
            }
          });
        }
        if (buttom.value) {
          list.value = list.value.concat(data.articleList);
          buttom.value = false;
        } else {
          list.value = data.articleList;
        }
        if (data.articleList.length < 1) {
          isRefresh.value = false;
        }
      });
    }
    function f_touchBottom(e) {
      if (isRefresh.value) {
        buttom.value = true;
        newsObject.value.page += 1;
        f_getNewList(newsObject.value);
      }
    }
    const topTitle = common_vendor.ref(null);
    const showFlash = common_vendor.ref(false);
    function f_getPage(o) {
      utils_api.getTabBarList(o).then((data) => {
        data.xcxPageList.forEach((element) => {
          if (element.pageType == "3" && element.id == tabBarId.value) {
            topTitle.value = element.xcxPage.siteTitle;
            showFlash.value = element.xcxPage.isShow == "0" ? false : true;
            if (element.xcxPage.adConfig == "1") {
              BS.value = false;
            } else if (element.xcxPage.adConfig == "2") {
              BS.value = true;
            }
          }
        });
      });
    }
    const adv = common_vendor.ref({
      status: null,
      every: null,
      //间隔
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
          if (element.title == "config_adv") {
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
          console.log("arti");
          try {
            data.xcxPageList.forEach((element) => {
              if (element.pageType == "3") {
                let shareTabBarId = element.id;
                console.log(element, "ele");
                const info = "path=/pages/article/article&type=tabBar&share=true&can=true&tabBarId=" + shareTabBarId;
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
      console.log("aaa");
      f_getNewList(newsObject.value);
      f_getItems({
        appId: appId.value
      });
      f_getPage({
        appId: appId.value
      });
    });
    common_vendor.onShow(() => {
      common_vendor.index.hideTabBar({
        animation: false
      });
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
    function f_go(item) {
      common_vendor.index.navigateTo({
        url: "/pages_details/article_details/article_details?id=" + item.id + "&tabBarId=" + tabBarId.value + "&can=true"
      });
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: topTitle.value,
        // path: '/pages/index/index?' + 'path=/pages/article/article' + '&share=true',
        path: "/pages/index/index?path=/pages/article/article&tabBarId=" + getApp().globalData.tabBarId
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
          return common_vendor.e(BS.value ? {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.createTime),
            c: "5820234e-2-" + i0,
            d: common_vendor.p({
              src: "https://xcx.wujingchuanmei.com/api" + item.picPath,
              mode: "aspectFill",
              width: "72",
              height: "72",
              shape: "round",
              ariaLabel: "img"
            })
          } : {
            e: "5820234e-3-" + i0,
            f: common_vendor.p({
              src: "https://xcx.wujingchuanmei.com/api" + item.picPath,
              mode: "aspectFill",
              shape: "round",
              ariaLabel: "img"
            }),
            g: common_vendor.t(item.title)
          }, {
            h: common_vendor.o(($event) => f_go(item), index),
            i: adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 1
          }, adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 1 ? {
            j: adv.value.advId
          } : {}, {
            k: adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 3
          }, adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 3 ? {
            l: adv.value.advId
          } : {}, {
            m: index
          });
        }),
        i: BS.value,
        j: BS.value ? "266rpx" : "428rpx",
        k: BS.value ? "1px solid #d8d8d8" : "",
        l: common_vendor.p({
          dashed: true,
          content: "已无更多数据"
        }),
        m: common_vendor.o(f_touchBottom),
        n: topH.value,
        o: bottomH.value,
        p: common_vendor.unref(showTabBar)
      }, common_vendor.unref(showTabBar) ? {
        q: common_vendor.o(getTabBarId),
        r: common_vendor.unref(tabBarId),
        s: common_vendor.p({
          id: common_vendor.unref(tabBarId)
        })
      } : {}, {
        t: showFlash.value
      }, showFlash.value ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages/article/article.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
