"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
const utils_share = require("../../utils/share.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_ax_topNav2 = common_vendor.resolveComponent("ax-topNav");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _component_t_icon = common_vendor.resolveComponent("t-icon");
  (_easycom_ax_topNav2 + _component_t_image + _component_t_icon)();
}
const _easycom_ax_topNav = () => "../../components/ax-topNav/ax-topNav.js";
if (!Math) {
  _easycom_ax_topNav();
}
const __default__ = {
  data() {
    return {};
  },
  mounted() {
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "video_details",
  setup(__props) {
    common_vendor.inject("model");
    const appId = common_vendor.inject("appId");
    getApp().globalData.showTabBar;
    const title = common_vendor.ref("");
    const updataTime = common_vendor.ref("");
    const id = common_vendor.ref(null);
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
    let start = false;
    function onVideoTimeUpdate(e) {
      if (advReward.value.status == 0 || !advReward.value.status) {
        count++;
      }
      if (Math.floor(e.detail.currentTime) == 0) {
        start = true;
        console.log(start, "start");
      }
      if (count == 0 && getApp().globalData.playNum % advReward.value.every == 0 && getApp().globalData.playNum != 0 && start) {
        console.log(getApp().globalData.playNum, "playNum");
        if (e.detail.currentTime > advReward.value.time) {
          videoContent.value.pause();
          agreePlay.value = false;
          start = false;
        }
        if (!agreePlay.value) {
          popupVisible.value = true;
        }
      }
    }
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
          console.log("onLoad event emit");
        });
        rewardAdv.value.onError((err) => {
          console.log("onError event emit", err);
          agreePlay.value = true;
          console.log("下发奖励");
          console.log("播放");
          if (videoContent.value) {
            videoContent.value.play();
          }
          count++;
        });
        rewardAdv.value.onClose((res) => {
          console.log("onClose event emit", res);
          if (res && res.isEnded) {
            agreePlay.value = true;
            console.log("下发奖励");
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
          console.log("激励视频广告显示失败");
          agreePlay.value = true;
          if (videoContent.value) {
            videoContent.value.play();
          }
          count++;
        });
      });
    }
    const showYinDao = common_vendor.ref(false);
    function cancelPop() {
      popupVisible.value = false;
      pop2.value = true;
      showYinDao.value = false;
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
      if (nextId.value != 0) {
        nextVideo();
      }
    }
    function playVideo() {
      if (agreePlay.value)
        ;
      else {
        videoContent.value.pause();
        popupVisible.value = true;
      }
    }
    const advRefresh = common_vendor.ref(false);
    function onAdplay(e) {
      console.log("onAdplay", e);
      if (e.detail.type == "begin") {
        advRefresh.value = false;
      }
      if (e.detail.type == "end") {
        advRefresh.value = true;
        console.log(advRefresh.value, "end");
      }
    }
    function onAdload(e) {
      console.log("onAdload", e);
    }
    function onAdclose(e) {
      console.log("onAdclose", e);
      advRefresh.value = true;
      console.log(advRefresh.value, "close");
    }
    function onAderror(e) {
      console.log("onAdError", e);
      advRefresh.value = true;
      console.log(advRefresh.value, "error");
    }
    const current = common_vendor.ref(0);
    const nextId = common_vendor.ref(null);
    const beforeId = common_vendor.ref(null);
    const tentId = common_vendor.ref(null);
    common_vendor.ref(0);
    const isSlid = common_vendor.ref(false);
    function returnData(data) {
      console.log(data, "mess");
      nextId.value = data.nextId;
      if (data.nextId == 0) {
        end.value = true;
      }
      beforeId.value = data.prevId;
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
      current.value = 1;
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
            console.log(e, "http");
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
    const end = common_vendor.ref(false);
    function f_getVideoInfo(o) {
      start = false;
      getApp().globalData.playNum++;
      console.log(getApp().globalData.playNum, "playNum");
      if (from.value == "home" && !end.value) {
        if (o.id != 0) {
          utils_api.videoInfoHome({
            id: o.id,
            cateId: cateId.value
          }).then((data) => {
            returnData(data);
          });
        }
      } else {
        console.log("noHome");
        utils_api.videoInfo(o).then((data) => {
          returnData(data);
        });
      }
    }
    const advS = common_vendor.ref({
      status: null,
      advId: null,
      finish: false
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
    const advList = common_vendor.ref([]);
    function f_getAdv(o) {
      utils_api.Adv(o).then((res) => {
        res.advertPlaceConfigs.forEach((element) => {
        });
        res.advertTypes.forEach((element) => {
          if (element.type == 6 || element.type == 7 || element.type == 8) {
            advList.value.push(element.content.trim());
          }
          if (advList.value.length > 0) {
            let n = Math.floor(Math.random() * advList.value.length);
            advB.value.advId = advList.value[n];
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
    function closeYinDao() {
      showYinDao.value = false;
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
                console.log(element, "ele");
                let shareTabBarId = element.id;
                const info = "path=/pages_details/video_details/video_details&type=noTabBar&share=true&backPage=/pages/video/video&id=" + res.id + "&can=true&tabBarId=" + shareTabBarId;
                utils_share.share(info);
                throw new Error();
              }
            });
          } catch (e) {
          }
        });
      }
      from.value = res.from;
      cateId.value = res.cateId;
      console.log(res, "res");
      if (getApp().globalData.firstPage) {
        advC.value.firstNow = true;
        getApp().globalData.firstPage = false;
      }
      backId.value = res.tabBarId;
      console.log(backId.value, "bac");
      isFromShare.value = res.share;
      backPage.value = res.backPage || "/pages/video/video";
      id.value = res.id - 0;
      f_getVideoInfo({
        id: id.value,
        appId: appId.value
      });
    });
    common_vendor.onShow(() => {
      f_getAdv({
        appId: appId.value
      });
      common_vendor.wx$1.hideShareMenu({
        menus: ["shareTimeline"]
      });
      if (getApp().globalData.isFirst == 0) {
        getApp().globalData.isFirst++;
        showYinDao.value = true;
      }
      if (advC.value.interstitialAd) {
        console.log(1);
        utils_adv.showAdv(advC.value);
      }
    });
    common_vendor.onHide(() => {
      utils_adv.clearTimer();
      rewardAdv.value = null;
    });
    common_vendor.onUnload(() => {
      utils_adv.clearTimer();
      rewardAdv.value = null;
      getApp().globalData.playNum = 0;
    });
    common_vendor.onMounted(() => {
    });
    const scrollTop = common_vendor.ref(null);
    const oldScrollTop = common_vendor.ref(null);
    function f_scroll(e) {
      oldScrollTop.value = e.detail.scrollTop;
    }
    function nextVideo() {
      advRefresh.value = false;
      if (nextId.value != 0 || end.value == true) {
        f_getVideoInfo({
          id: nextId.value,
          appId: appId.value
        });
        getApp().globalData.playNum--;
        current.value = 2;
        let t = setTimeout(() => {
          current.value = 1;
          clearTimeout(t);
        }, 100);
        scrollTop.value = oldScrollTop.value;
        let tim = setTimeout(() => {
          scrollTop.value = 0;
          popupVisible.value = false;
          agreePlay.value = true;
          count = 0;
          clearTimeout(tim);
        }, 100);
      } else {
        common_vendor.index.showToast({
          title: "已是最后一条视频",
          duration: 2e3,
          icon: "none"
        });
      }
      if (advList.value.length > 0) {
        let n = Math.floor(Math.random() * advList.value.length);
        advB.value.advId = advList.value[n];
      }
    }
    function next1(e) {
      if (advList.value.length > 0) {
        let n = Math.floor(Math.random() * advList.value.length);
        advB.value.advId = advList.value[n];
      }
      advRefresh.value = false;
      console.log(advRefresh.value, "广告");
      advS.value.finish = false;
      advS.value.finish = true;
      if (e.detail.current == 0) {
        console.log("上");
        f_getVideoInfo({
          id: beforeId.value,
          appId: appId.value
        });
        current.value = 0;
        let t = setTimeout(() => {
          current.value = 1;
          clearTimeout(t);
        }, 100);
      }
      if (e.detail.current == 2) {
        isSlid.value = true;
        console.log("下");
        f_getVideoInfo({
          id: nextId.value,
          appId: appId.value
        });
        current.value = 2;
        let t = setTimeout(() => {
          current.value = 1;
          clearTimeout(t);
        }, 100);
        scrollTop.value = oldScrollTop.value;
        let tim = setTimeout(() => {
          scrollTop.value = 0;
          clearTimeout(tim);
        }, 100);
      }
      let t1 = setTimeout(() => {
        popupVisible.value = false;
        agreePlay.value = true;
        count = 0;
        clearTimeout(t1);
      }, 200);
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: title.value,
        path: "/pages/index/index?path=/pages_details/video_details/video_details&type=noTabBar&share=true&backPage=/pages/video/video&id=" + id.value + "&can=true&tabBarId=" + backId.value
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          back: true,
          isShare: isFromShare.value,
          backId: backId.value,
          backPage: backPage.value,
          color: "black"
        }),
        b: showYinDao.value
      }, showYinDao.value ? {
        c: common_vendor.p({
          src: "/static/yd.gif",
          mode: "aspectFill",
          shape: "round",
          ariaLabel: "img"
        }),
        d: common_vendor.o(closeYinDao),
        e: topH.value
      } : {}, {
        f: common_vendor.t(title.value),
        g: advS.value.finish
      }, advS.value.finish ? common_vendor.e({
        h: tentId.value || videoSrc.value
      }, tentId.value || videoSrc.value ? {
        i: tentId.value || videoSrc.value,
        j: advS.value.advId,
        k: common_vendor.o(onAdplay),
        l: common_vendor.o(onAdload),
        m: common_vendor.o(onAdclose),
        n: common_vendor.o(onAderror),
        o: common_vendor.o(($event) => onVideoTimeUpdate($event)),
        p: common_vendor.o(playVideo)
      } : {}) : {}, {
        q: common_vendor.p({
          name: "logo-wechat",
          size: "48rpx"
        }),
        r: common_vendor.p({
          name: "refresh",
          size: "48rpx"
        }),
        s: common_vendor.o(nextVideo),
        t: advRefresh.value
      }, advRefresh.value ? common_vendor.e({
        v: advB.value.advId
      }, advB.value.advId ? {
        w: advB.value.advId
      } : {}) : {}, {
        x: scrollTop.value,
        y: common_vendor.o(f_scroll),
        z: common_vendor.o(($event) => next1($event)),
        A: current.value,
        B: topH.value,
        C: popupVisible.value
      }, popupVisible.value ? {
        D: common_vendor.t(advReward.value.title),
        E: common_vendor.o(cancelPop),
        F: common_vendor.o(enterPop)
      } : {}, {
        G: pop2.value
      }, pop2.value ? {
        H: common_vendor.o(leave2),
        I: common_vendor.o(cancel2)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages_details/video_details/video_details.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
