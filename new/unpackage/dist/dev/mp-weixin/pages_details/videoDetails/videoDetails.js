"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
const utils_share = require("../../utils/share.js");
require("../../utils/request.js");
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
  __name: "videoDetails",
  setup(__props) {
    common_vendor.inject("model");
    const appId = common_vendor.inject("appId");
    const title = common_vendor.ref("");
    const updataTime = common_vendor.ref("");
    const num = common_vendor.ref({
      read: 100,
      like: 2
    });
    const id = common_vendor.ref(null);
    common_vendor.ref(false);
    const suggestList = common_vendor.ref([]);
    const isFromShare = common_vendor.ref(false);
    const backPage = common_vendor.ref(null);
    const vid = common_vendor.ref("");
    const videoSrc = common_vendor.ref(null);
    const rewardAdv = common_vendor.ref(null);
    const advReward = common_vendor.ref({
      time: 0,
      title: "",
      id: "",
      status: 0,
      every: null
    });
    const popupVisible = common_vendor.ref(false);
    const pop2 = common_vendor.ref(false);
    const agreePlay = common_vendor.ref(true);
    const videoContent = common_vendor.ref(null);
    videoContent.value = common_vendor.index.createVideoContext("video1");
    let count = 0;
    function createReward() {
      if (common_vendor.wx$1.createRewardedVideoAd) {
        if (rewardAdv.value) {
          rewardAdv.value = null;
        }
        rewardAdv.value = common_vendor.wx$1.createRewardedVideoAd({
          adUnitId: advReward.value.id
        });
        rewardAdv.value.onLoad(() => {
          console.log("激励广告加载成功");
        });
        rewardAdv.value.onError((err) => {
          console.log("onError event emit", err);
          agreePlay.value = true;
          if (videoContent.value) {
            console.log("继续播放");
            videoContent.value.play();
          }
          count++;
        });
        rewardAdv.value.onClose((res) => {
          console.log("onClose event emit", res);
          if (res && res.isEnded) {
            agreePlay.value = true;
            console.log("播放");
            if (videoContent.value) {
              videoContent.value.play();
            }
            count++;
          }
        });
      }
    }
    function showReward() {
      rewardAdv.value.show().catch(() => {
        console.log("load");
        rewardAdv.value.load().then(() => rewardAdv.value.show()).catch((err) => {
          console.log("激励视频广告加载失败");
          agreePlay.value = true;
          if (videoContent.value) {
            videoContent.value.play();
          }
          count++;
        });
      });
    }
    function cancelPop() {
      popupVisible.value = false;
      pop2.value = true;
    }
    function enterPop() {
      popupVisible.value = false;
      if (rewardAdv.value) {
        showReward();
      } else {
        agreePlay.value = true;
        if (videoContent.value) {
          videoContent.value.play();
        }
        count++;
      }
    }
    function cancel2() {
      pop2.value = false;
      if (rewardAdv.value) {
        showReward();
      } else {
        agreePlay.value = true;
        if (videoContent.value) {
          videoContent.value.play();
        }
        count++;
      }
    }
    function leave2() {
      pop2.value = false;
      f_refresh();
    }
    function playVideo() {
      console.log(agreePlay.value, "agree");
      if (agreePlay.value)
        ;
      else {
        videoContent.value.pause();
        popupVisible.value = true;
      }
    }
    const backId = common_vendor.ref(null);
    const cateId = common_vendor.ref("");
    const from = common_vendor.ref("");
    const topH = common_vendor.ref(null);
    const bottomH = common_vendor.ref(null);
    common_vendor.onLoad((res) => {
      topH.value = getApp().globalData.top;
      bottomH.value = getApp().globalData.bottom;
      if (!res.can) {
        utils_api.getTabBarList({
          appId: appId.value
        }).then((data) => {
          try {
            data.xcxPageList.forEach((element) => {
              if (element.pageType == "2") {
                let shareTabBarId = element.id;
                const info = "path=/pages_details/videoDetails/videoDetails&type=noTabBar&share=true&backPage=/pages/video/video&id=" + res.id + "&can=true&tabBarId=" + shareTabBarId;
                utils_share.share(info);
                throw new Error();
              }
            });
          } catch (e) {
          }
        });
      }
      cateId.value = res.cateId;
      from.value = res.from;
      console.log(res, "res");
      if (getApp().globalData.firstPage) {
        advC.value.firstNow = true;
        getApp().globalData.firstPage = false;
      }
      backId.value = res.tabBarId;
      isFromShare.value = res.share;
      backPage.value = res.backPage || "/pages/video/video";
      id.value = res.id - 0;
      f_getVideoInfo({
        id: id.value,
        appId: appId.value
      });
    });
    const advRefresh = common_vendor.ref(false);
    function onAdplay(e) {
      console.log("onAdplay", e);
      if (e.detail.type == "begin") {
        advRefresh.value = false;
      }
      if (e.detail.type == "end") {
        advRefresh.value = true;
      }
    }
    function onAdload(e) {
      console.log("onAdload", e);
    }
    function onAdclose(e) {
      console.log("onAdclose", e);
      advRefresh.value = true;
    }
    function onAderror(e) {
      console.log("onAdError", e);
      advRefresh.value = true;
    }
    const tentId = common_vendor.ref(null);
    const nextId = common_vendor.ref(null);
    function returnData(data) {
      getApp().globalData.playNum++;
      nextId.value = data.nextId;
      vid.value = data.xcxVideo.videoUrl;
      if (vid.value) {
        vid.value = vid.value.trim();
      }
      videoSrc.value = data.xcxVideo.video;
      let http = new RegExp(/http/);
      if (http.test(videoSrc.value)) {
        console.log("http");
      } else {
        videoSrc.value = "https://xcx.wujingchuanmei.com/api" + videoSrc.value;
      }
      title.value = data.xcxVideo.title;
      updataTime.value = data.xcxVideo.createTime;
      suggestList.value = data.recommends;
      if (suggestList.length > 0) {
        suggestList.value.forEach((item) => {
          item.icon = item.icon.split(",")[0];
        });
      }
      if (vid.value) {
        common_vendor.index.request({
          url: `https://vv.video.qq.com/getinfo?vids=${vid.value}&platform=101001&charge=0&otype=json&defn=shd`,
          // url: `http://vv.video.qq.com/getinfo?vids=s00463bm7i3&platform=101001&charge=0&otype=json&defn=shd`,
          method: "get",
          success(res) {
            let data2 = res.data;
            let reg = new RegExp(/fn"\:"([\w{0,}\.]{0,}mp4)"/);
            let reg1 = new RegExp(/fvkey"\:"(\w+)"/);
            let reg2 = new RegExp(/url"\:"([0-9a-zA-Z\/\:\_\.\-]{0,})"/, "g");
            let a = reg.exec(data2);
            let b = reg1.exec(data2);
            let c;
            let d;
            while ((c = reg2.exec(data2)) != null) {
              d = c;
            }
            let e = d[1] + a[1] + "?vkey=" + b[1];
            tentId.value = e;
          },
          fail(error) {
          },
          complete() {
          }
        });
      } else {
        tentId.value = null;
      }
    }
    function f_getVideoInfo(o) {
      console.log(getApp().globalData.playNum);
      if (from.value == "home") {
        utils_api.videoInfoHome({
          id: o.id,
          cateId: cateId.value
        }).then((data) => {
          returnData(data);
        });
      } else {
        utils_api.videoInfo(o).then((data) => {
          returnData(data);
        }).finally(() => {
        });
      }
    }
    let start = false;
    function onVideoTimeUpdate(e) {
      console.log(e.detail.currentTime, "time");
      if (advReward.value.status == 0 || !advReward.value.status) {
        count++;
      }
      if (Math.floor(e.detail.currentTime) == 0) {
        start = true;
        console.log(start, "start");
      }
      if (count == 0 && getApp().globalData.playNum % advReward.value.every == 0 && getApp().globalData.playNum != 0 && start) {
        console.log(e.detail.currentTime, "tim", advReward.value.time);
        if (e.detail.currentTime > advReward.value.time) {
          videoContent.value.pause();
          agreePlay.value = false;
          start = false;
          popupVisible.value = true;
        }
        if (!agreePlay.value) {
          console.log(1);
        }
      }
    }
    const advS = common_vendor.ref({
      status: null,
      advId: null,
      finish: false
    });
    const advT = common_vendor.ref({
      status: null,
      // every: null,
      advId: null,
      type: null
    });
    const advB = common_vendor.ref({
      status: null,
      // every: null,
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
        let typeT = null;
        let typeB = null;
        res.advertPlaceConfigs.forEach((element) => {
          if (element.title == "top_vid") {
            typeT = element.advertTypeId;
            advT.value.status = element.status;
            advT.value.type = element.advertTypeId;
          }
          if (element.title == "bottom_vid") {
            typeB = element.advertTypeId;
            advB.value.status = element.status;
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
          if (element.type == 4) {
            advReward.value.id = element.content.trim();
            advReward.value.time = element.intervalNum;
            advReward.value.title = element.title;
            advReward.value.status = element.status;
            advReward.value.every = element.num;
            createReward();
          }
          if (element.type == 5) {
            advS.value.status = element.status;
            advS.value.advId = element.content.trim();
          }
        });
        advS.value.finish = true;
        if (advC.value.status) {
          utils_adv.createAdv(advC.value);
        }
      });
    }
    common_vendor.onShow(() => {
      f_getAdv({
        appId: appId.value
      });
      common_vendor.wx$1.hideShareMenu({
        menus: ["shareTimeline"]
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
      getApp().globalData.playNum = 0;
    });
    const scrollTop = common_vendor.ref(null);
    const oldScrollTop = common_vendor.ref(null);
    function f_scroll(e) {
      oldScrollTop.value = e.detail.scrollTop;
    }
    function f_refresh(item) {
      if (!item) {
        agreePlay.value = true;
        count = 0;
        advRefresh.value = false;
        start = false;
        f_getVideoInfo({
          id: nextId.value,
          appId: appId.value
        });
      } else {
        agreePlay.value = true;
        count = 0;
        advRefresh.value = false;
        start = false;
        f_getVideoInfo({
          id: item.id,
          appId: appId.value
        });
      }
      scrollTop.value = oldScrollTop.value;
      let timer = setTimeout(() => {
        scrollTop.value = 0;
        clearTimeout(timer);
      }, 100);
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: title.value,
        path: "/pages/index/index?path=/pages_details/videoDetails/videoDetails&type=noTabBar&share=true&backPage=/pages/video/video&id=" + id.value + "&can=true?tabBarId=" + backId.value
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
        b: advRefresh.value
      }, advRefresh.value ? common_vendor.e({
        c: advT.value.status == 1 && advT.value.advId && advT.value.type == 1
      }, advT.value.status == 1 && advT.value.advId && advT.value.type == 1 ? {
        d: advT.value.advId
      } : {}, {
        e: advT.value.status == 1 && advT.value.advId && advT.value.type == 3
      }, advT.value.status == 1 && advT.value.advId && advT.value.type == 3 ? {
        f: advT.value.advId
      } : {}) : {}, {
        g: common_vendor.t(title.value),
        h: common_vendor.t(updataTime.value),
        i: advS.value.finish
      }, advS.value.finish ? common_vendor.e({
        j: tentId.value || videoSrc.value
      }, tentId.value || videoSrc.value ? {
        k: tentId.value || videoSrc.value,
        l: advS.value.advId,
        m: common_vendor.o(onAdplay),
        n: common_vendor.o(onAdload),
        o: common_vendor.o(onAdclose),
        p: common_vendor.o(onAderror),
        q: common_vendor.o(($event) => onVideoTimeUpdate($event)),
        r: common_vendor.o(playVideo)
      } : {}) : {}, {
        s: common_vendor.t(num.value.read),
        t: common_vendor.p({
          name: "logo-wechat",
          size: "48rpx"
        }),
        v: common_vendor.p({
          name: "logo-wechat",
          size: "48rpx"
        }),
        w: advRefresh.value
      }, advRefresh.value ? common_vendor.e({
        x: advB.value.status == 1 && advB.value.advId && advB.value.type == 1
      }, advB.value.status == 1 && advB.value.advId && advB.value.type == 1 ? {
        y: advB.value.advId
      } : {}, {
        z: advB.value.status == 1 && advB.value.advId && advB.value.type == 3
      }, advB.value.status == 1 && advB.value.advId && advB.value.type == 3 ? {
        A: advB.value.advId
      } : {}) : {}, {
        B: suggestList.value
      }, suggestList.value ? {
        C: common_vendor.f(suggestList.value, (item, index, i0) => {
          return {
            a: "72cce503-3-" + i0,
            b: common_vendor.p({
              src: "https://xcx.wujingchuanmei.com/api" + item.icon,
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
        D: scrollTop.value,
        E: common_vendor.o(f_scroll),
        F: topH.value,
        G: bottomH.value,
        H: common_vendor.p({
          name: "视频"
        }),
        I: popupVisible.value
      }, popupVisible.value ? {
        J: common_vendor.t(advReward.value.title),
        K: common_vendor.o(cancelPop),
        L: common_vendor.o(enterPop)
      } : {}, {
        M: pop2.value
      }, pop2.value ? {
        N: common_vendor.o(leave2),
        O: common_vendor.o(cancel2)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages_details/videoDetails/videoDetails.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
