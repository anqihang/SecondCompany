"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const utils_adv = require("../../utils/adv.js");
const pages_calendar_index = require("./index.js");
const utils_share = require("../../utils/share.js");
const common_lunar = require("../../common/lunar.js");
require("../../utils/request.js");
require("../../utils/util.js");
if (!Array) {
  const _easycom_ax_topNav2 = common_vendor.resolveComponent("ax-topNav");
  const _easycom_ax_tabBar2 = common_vendor.resolveComponent("ax-tabBar");
  (_easycom_ax_topNav2 + _easycom_ax_tabBar2)();
}
const _easycom_ax_topNav = () => "../../components/ax-topNav/ax-topNav.js";
const _easycom_ax_tabBar = () => "../../components/ax-tabBar/ax-tabBar.js";
if (!Math) {
  (_easycom_ax_topNav + Calendar + _easycom_ax_tabBar)();
}
const Calendar = () => "../../components/Li-Calendar/Li-Calendar.js";
const __default__ = {
  components: {
    Calendar
  },
  data() {
    return {
      time: "",
      currentDay: (/* @__PURE__ */ new Date()).getDate(),
      selectDay: "",
      dayStr: "",
      weekStr: "",
      yearStr: "",
      yi: "",
      ji: ""
    };
  },
  created() {
    let curDate = /* @__PURE__ */ new Date();
    this.selectDay = curDate.getFullYear() + "/" + (curDate.getMonth() + 1) + "/" + curDate.getDate();
    this.render();
  },
  onLoad() {
  },
  onReady() {
  },
  onShow() {
  },
  methods: {
    render(setDateStr) {
      console.info("开始进行首页下数据渲染:" + setDateStr);
      let dd = setDateStr ? new Date(setDateStr) : new Date(this.selectDay);
      let d = common_lunar.Lunar.fromDate(dd);
      this.dayStr = d.getMonthInChinese() + "月" + d.getDayInChinese();
      this.yearStr = d.getYearInGanZhi() + "(" + d.getYearShengXiao() + ")年";
      this.weekStr = "星期" + d.getWeekInChinese();
      this.ji = d.getDayJi().join(" ");
      this.yi = d.getDayYi().join(" ");
    },
    dayChange(data) {
      this.selectDay = data.time;
      this.render(data.time);
      console.log("日期选择变更", data);
      this.currentDay = data.day;
      console.log(this.currentDay, "curr");
    }
    // monthChange(data) {
    // 	console.log("月份选择变更", data)
    // },
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "calendar",
  setup(__props) {
    const showTabBar = getApp().globalData.showTabBar;
    const topTitle = common_vendor.ref("万年历");
    const appId = common_vendor.inject("appId");
    let tabBarId = common_vendor.ref(null);
    function getTabBarId(item) {
      tabBarId.value = getApp().globalData.tabBarId;
      console.log(tabBarId, "TABid");
      f_getPage({
        appId: appId.value
      });
    }
    function f_getPage(o) {
      utils_api.getTabBarList(o).then((data) => {
        data.xcxPageList.forEach((element) => {
          if (element.pageType == "5" && element.id == tabBarId.value) {
            topTitle.value = element.xcxPage.siteTitle;
            tabBarId.value = element.id;
          }
        });
      });
    }
    const advT = common_vendor.ref({});
    const advM = common_vendor.ref({});
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
      interstitialAd: null,
      firstNow: false
    });
    function f_getAdv(o) {
      utils_api.Adv(o).then((res) => {
        let type = null;
        let typeT = null;
        let typeM = null;
        res.advertPlaceConfigs.forEach((element) => {
          if (element.title == "bottom_day") {
            type = element.advertTypeId;
            advB.value.status = element.status;
            advB.value.every = element.acticleCnt;
            advB.value.type = element.advertTypeId;
          }
          if (element.title == "top_day") {
            typeT = element.advertTypeId;
            advT.value.status = element.status;
            advT.value.every = element.acticleCnt;
            advT.value.type = element.advertTypeId;
          }
          if (element.title == "middle_day") {
            typeM = element.advertTypeId;
            advM.value.status = element.status;
            advM.value.every = element.acticleCnt;
            advM.value.type = element.advertTypeId;
          }
        });
        res.advertTypes.forEach((element) => {
          if (type == element.type) {
            advB.value.advId = element.content.trim();
          }
          if (typeT == element.type) {
            advT.value.advId = element.content.trim();
          }
          if (typeM == element.type) {
            advM.value.advId = element.content.trim();
          }
          if (element.type == 2) {
            advC.value.status = element.status;
            advC.value.advId = element.content.trim();
            advC.value.intervalNum = element.intervalNum - 0;
          }
          if (advC.value.status) {
            utils_adv.createAdv(advC.value);
          }
        });
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
              if (element.pageType == "5") {
                let shareTabBarId = element.id;
                console.log(element, "ele");
                const info = "path=/pages/calendar/calendar&type=tabBar&share=true&can=true&tabBarId=" + shareTabBarId;
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
      f_getPage({
        appId: appId.value
      });
      holidays.value.nowMonth = (/* @__PURE__ */ new Date()).getMonth() + 1;
      holidays.value.nowYear = (/* @__PURE__ */ new Date()).getFullYear();
      pages_calendar_index.ca.initPageData(holidays);
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
      if (advC.value.interstitialAd) {
        utils_adv.showAdv(advC.value);
      }
    });
    const holidays = common_vendor.ref({
      title: "",
      desc: "",
      nowDate: /* @__PURE__ */ new Date(),
      isDown: false,
      nowMonth: "",
      nowYear: "",
      data: {
        ad: [],
        jiejiariData: {
          activeClass: "active",
          height: 0,
          time: 300,
          list: []
        },
        termData: {
          activeClass: "",
          height: 0,
          time: 300,
          list: []
        },
        hotData: {
          activeClass: "",
          height: 0,
          time: 300,
          list: []
        },
        allHolidays: []
      }
    });
    function monthChange(data) {
      console.log("月份选择变更", data, "1");
      holidays.value.nowMonth = data.date.split("/")[1];
      holidays.value.nowYear = data.date.split("/")[0];
      console.log(holidays.value.nowMonth, "mo");
      pages_calendar_index.ca.initPageData(holidays);
      console.log("22");
    }
    common_vendor.onHide(() => {
      utils_adv.clearTimer();
    });
    common_vendor.onUnload(() => {
      utils_adv.clearTimer();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: topTitle.value,
        path: "/pages/index/index?path=/pages/calendar/calendar&tabBarId=" + getApp().globalData.tabBarId
        // + '&type=tabBar' + '&share=true' + '&id=' +				newsObject.value.type,
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: topTitle.value
        }),
        b: advT.value.status == 1 && advT.value.advId && advT.value.type == 3
      }, advT.value.status == 1 && advT.value.advId && advT.value.type == 3 ? {
        c: advT.value.advId
      } : {}, {
        d: advT.value.status == 1 && advT.value.advId && advT.value.type == 1
      }, advT.value.status == 1 && advT.value.advId && advT.value.type == 1 ? {
        e: advT.value.advId
      } : {}, {
        f: common_vendor.o(_ctx.dayChange),
        g: common_vendor.o(monthChange),
        h: common_vendor.t(_ctx.currentDay),
        i: common_vendor.t(_ctx.dayStr),
        j: common_vendor.t(_ctx.weekStr),
        k: common_vendor.t(_ctx.yearStr),
        l: common_vendor.t(_ctx.yi),
        m: common_vendor.t(_ctx.ji),
        n: advM.value.status == 1 && advM.value.advId && advM.value.type == 3
      }, advM.value.status == 1 && advM.value.advId && advM.value.type == 3 ? {
        o: advM.value.advId
      } : {}, {
        p: advM.value.status == 1 && advM.value.advId && advM.value.type == 1
      }, advM.value.status == 1 && advM.value.advId && advM.value.type == 1 ? {
        q: advM.value.advId
      } : {}, {
        r: common_vendor.f(holidays.value.data.allHolidays, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.date.replace("-", "月")),
            c: common_vendor.t(item.days),
            d: item.cur ? 1 : "",
            e: !item.cur && item.ju > 0 ? 1 : "",
            f: item.key
          };
        }),
        s: advB.value.status == 1 && advB.value.advId && advB.value.type == 3
      }, advB.value.status == 1 && advB.value.advId && advB.value.type == 3 ? {
        t: advB.value.advId
      } : {}, {
        v: advB.value.status == 1 && advB.value.advId && advB.value.type == 1
      }, advB.value.status == 1 && advB.value.advId && advB.value.type == 1 ? {
        w: advB.value.advId
      } : {}, {
        x: topH.value,
        y: bottomH.value,
        z: common_vendor.unref(showTabBar)
      }, common_vendor.unref(showTabBar) ? {
        A: common_vendor.o(getTabBarId),
        B: common_vendor.unref(tabBarId),
        C: common_vendor.p({
          id: common_vendor.unref(tabBarId)
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/pages/calendar/calendar.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
