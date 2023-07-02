"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_ax_topNav2 = common_vendor.resolveComponent("ax-topNav");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _component_t_divider = common_vendor.resolveComponent("t-divider");
  (_easycom_ax_topNav2 + _component_t_image + _component_t_divider)();
}
const _easycom_ax_topNav = () => "../../components/ax-topNav/ax-topNav.js";
if (!Math) {
  _easycom_ax_topNav();
}
const __default__ = {
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "SearchList",
  setup(__props) {
    const appId = common_vendor.inject("appId");
    const list = common_vendor.ref([]);
    const newsObject = common_vendor.ref({
      appId: appId.value,
      page: 1,
      cityId: null,
      cid: null,
      title: null
    });
    const refresh = common_vendor.ref(true);
    function f_touchBottom() {
      if (refresh.value) {
        newsObject.value.page += 1;
        f_getNewList(newsObject.value);
      }
    }
    function f_getNewList(o) {
      utils_api.homeNewList(o).then((data) => {
        console.log("homeNewList", data);
        if (data.articleList.length > 0) {
          data.articleList.forEach((item) => {
            item.picPath = item.picPath.split(",")[0];
          });
        }
        if (data.articleList.length < 1) {
          refresh.value = false;
        }
        list.value = list.value.concat(data.articleList);
      });
    }
    const title = common_vendor.ref("");
    const id = common_vendor.ref(null);
    const search = common_vendor.ref(null);
    const isFromShare = common_vendor.ref(false);
    const backPage = common_vendor.ref(null);
    const typeId = common_vendor.ref(null);
    const topH = common_vendor.ref(null);
    const bottomH = common_vendor.ref(null);
    common_vendor.onLoad((res) => {
      topH.value = getApp().globalData.top;
      bottomH.value = getApp().globalData.bottom;
      if (getApp().globalData.firstPage) {
        advC.value.firstNow = true;
        getApp().globalData.firstPage = false;
      }
      console.log(res, "searchList");
      isFromShare.value = !!res.share;
      backPage.value = res.backPage;
      title.value = res.name;
      id.value = res.id;
      typeId.value = res.typeId;
      if (typeId.value == "1") {
        newsObject.value.cityId = id.value - 0;
        newsObject.value.cid = null;
      } else if (typeId.value == "2") {
        newsObject.value.cid = id.value - 0;
        newsObject.value.cityId = null;
      } else {
        newsObject.value.cid = null;
        newsObject.value.cityId = null;
      }
      search.value = res.search;
      if (res.search == "undefined") {
        newsObject.value.title = null;
      } else {
        newsObject.value.title = res.search;
      }
      f_getNewList(newsObject.value);
    });
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
          if (element.title == "config_adv") {
            type = element.advertTypeId;
            adv.value.status = element.status;
            adv.value.every = element.acticleCnt;
            adv.value.type = element.advertTypeId;
          }
        });
        res.advertTypes.forEach((element) => {
          if (type == element.type) {
            adv.value.advId = element.content;
          }
          if (element.type == 2) {
            advC.value.status = element.status;
            advC.value.advId = element.content;
            advC.value.intervalNum = element.intervalNum;
          }
        });
        if (advC.value.status) {
          utils_adv.createAdv(advC.value);
        }
      });
    }
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
    function f_go(item) {
      common_vendor.index.navigateTo({
        url: "/pages_details/article_details/article_details?id=" + item.id
      });
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: "",
        path: "/pages/index/index?path=/pages_details/SearchList/SearchList&type=noTabBar&share=true&backPage=/pages/category/category&id=" + id.value + "&typeId=" + typeId.value + "&search=" + search.value
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: title.value,
          back: true,
          isShare: isFromShare.value,
          backPage: backPage.value
        }),
        b: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.createTime),
            c: "996170ba-1-" + i0,
            d: common_vendor.p({
              src: "https://xcx.wujingchuanmei.com/api" + item.picPath,
              mode: "aspectFill",
              width: "72",
              height: "72",
              shape: "round",
              ariaLabel: "img"
            }),
            e: common_vendor.o(($event) => f_go(item), index),
            f: adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 1
          }, adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 1 ? {
            g: adv.value.advId
          } : {}, {
            h: adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 3
          }, adv.value.status == 1 && adv.value.advId && adv.value.every != 0 && index != 0 && (index + 1) % adv.value.every == 0 && adv.value.type == 3 ? {
            i: adv.value.advId
          } : {}, {
            j: index
          });
        }),
        c: common_vendor.p({
          dashed: true,
          content: "已无更多数据"
        }),
        d: common_vendor.o(f_touchBottom),
        e: topH.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages_details/SearchList/SearchList.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
