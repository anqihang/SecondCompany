"use strict";
const common_vendor = require("../../common/vendor.js");
const common_lunar = require("../../common/lunar.js");
const _sfc_main = {
  name: "Li-Calendar",
  props: {
    /**
     * @description 当前时间 yyyy-MM-dd
     */
    currentTime: {
      type: String,
      default: function() {
        let timeObj = /* @__PURE__ */ new Date();
        return timeObj.getFullYear() + "-" + (timeObj.getMonth() + 1) + "-" + timeObj.getDate();
      }
    },
    /**
     * @description 全局标记点颜色，包括点和文字
     */
    maskColor: {
      type: String,
      default: "#e54d42"
    },
    /**
     * @description 是否显示农历，mask优先级高
     */
    showLunar: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否可以滚动
     */
    canDrag: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.render();
  },
  data() {
    return {
      nextDisabled: false,
      lastDisabled: false,
      currentSelectTime: (/* @__PURE__ */ new Date()).getDate(),
      //点击时保存的dateIndex
      title_time: "",
      //顶头文本
      year: void 0,
      //当前年
      month: void 0,
      //当前月
      beforeDateList: [],
      //上个月的日期列表
      dateList: [],
      //本月的日期列表
      afterDateList: [],
      //下个月的日期列表
      transform_x: 0,
      transform_time: 0
    };
  },
  methods: {
    render(setTimeStr) {
      let that = this;
      let currentTimeStr = setTimeStr ? setTimeStr : that.currentTime;
      let timeObj = this.toDateByStr(currentTimeStr);
      let m = common_lunar.SolarMonth.fromDate(timeObj);
      let t2 = common_lunar.Solar.fromDate(/* @__PURE__ */ new Date());
      that.beforeDateList = [];
      that.dateList = [];
      that.afterDateList = [];
      that.year = m.getYear();
      that.month = m.getMonth();
      that.title_time = m.getYear() + "年" + m.getMonth() + "月";
      let weeks = m.getWeeks(0);
      for (let i = 0, j = weeks.length; i < j; i++) {
        let days = weeks[i].getDays();
        for (let k = 0, l = days.length; k < l; k++) {
          let tempObj = {
            isToday: false
          };
          let lu = days[k].getLunar();
          if (k == 0 || k == 6) {
            tempObj.isDaySunOrSat = true;
          }
          let ho = common_lunar.HolidayUtil.getHoliday(days[k].toYmd());
          if (ho) {
            if (ho.isWork()) {
              tempObj.pointText = "班";
              tempObj.pointTextColor = "#0081ff";
            } else {
              tempObj.pointText = "休";
              tempObj.pointTextColor = "#e54d42";
            }
            if (ho.getTarget() == days[k].toYmd()) {
              tempObj.markText = ho.getName();
              tempObj.markTextColor = "#e54d42";
            }
          }
          if (!tempObj.markText) {
            let jie = lu.getJieQi();
            if (jie) {
              tempObj.markText = jie;
              tempObj.markTextColor = "#e54d42";
            }
          }
          if (!tempObj.markText) {
            let tempLunarDay = lu.getDayInChinese() == "初一" ? lu.getMonthInChinese() + "月" : lu.getDayInChinese();
            tempObj.markText = tempLunarDay;
            tempObj.markTextColor = "#8799a3";
          }
          if (days[k].getYear() == t2.getYear() && days[k].getMonth() == t2.getMonth() && days[k].getDay() == t2.getDay()) {
            tempObj.isToday = true;
          }
          if (m.getYear() > days[k].getYear() || m.getYear() == days[k].getYear() && m.getMonth() > days[k].getMonth()) {
            tempObj.key = "before_" + days[k].getDay();
            tempObj.dateIndex = days[k].getDay();
            that.beforeDateList.push(tempObj);
          } else if (m.getYear() < days[k].getYear() || m.getYear() == days[k].getYear() && m.getMonth() < days[k].getMonth()) {
            tempObj.key = "after_" + days[k].getDay();
            tempObj.dateIndex = days[k].getDay();
            that.afterDateList.push(tempObj);
          } else {
            tempObj.key = "date_" + days[k].getDay();
            tempObj.dateIndex = days[k].getDay();
            that.dateList.push(tempObj);
          }
        }
      }
    },
    dateChange(e) {
      let selectDate = void 0;
      if (e.type == "change") {
        selectDate = new Date(e.detail.value);
      }
      if (!selectDate) {
        return;
      }
      if (selectDate.getFullYear() == this.year && selectDate.getMonth() + 1 == this.month && selectDate.getDate() == t.currentSelectTime) {
        console.log("无变化 不需要加载");
        return;
      }
      let value = selectDate.getFullYear() + "/" + (selectDate.getMonth() + 1) + "/" + selectDate.getDate();
      this.$emit("monthChange", {
        date: value
      });
      this.render(value);
      this.selectedDateFun(selectDate.getDate());
    },
    toDateByStr(timeStr) {
      let timeObj;
      if (timeStr) {
        timeObj = new Date(timeStr.replace(/-/g, "/"));
      }
      if (!timeStr || timeObj == "Invalid Date")
        timeObj = /* @__PURE__ */ new Date();
      return timeObj;
    },
    selectedDateFun(index) {
      let that = this;
      let selectObj = that.dateList[index - 1];
      selectObj.year = that.year;
      selectObj.month = that.month;
      selectObj.day = index;
      selectObj.time = that.year + "/" + that.month + "/" + index;
      that.$emit("dayChange", selectObj);
      that.currentSelectTime = index;
    },
    addMonth() {
      let month = common_lunar.SolarMonth.fromYm(this.year, this.month);
      month = month.next(1);
      let value = month.getYear() + "/" + month.getMonth() + "/1";
      this.$emit("monthChange", {
        date: value
      });
      this.render(value);
      this.selectedDateFun(1);
    },
    subMonth() {
      let month = common_lunar.SolarMonth.fromYm(this.year, this.month);
      month = month.next(-1);
      let value = month.getYear() + "/" + month.getMonth() + "/1";
      this.$emit("monthChange", {
        date: value
      });
      this.render(value);
      this.selectedDateFun(1);
    },
    backToToday() {
      let currDate = /* @__PURE__ */ new Date();
      let _year = currDate.getFullYear();
      let _month = currDate.getMonth() + 1;
      let _day = currDate.getDate();
      if (_year == this.year && _month == this.month && _day == this.currentSelectTime) {
        console.log("无变化 不需要加载");
        return;
      }
      let value = _year + "/" + _month + "/" + _day;
      this.$emit("monthChange", {
        date: value
      });
      this.render(value);
      this.selectedDateFun(_day);
    },
    calendarTransform(x, time) {
      this.transform_x = x;
      this.transform_time = time;
    },
    touchstart(event) {
      if (!this.canDrag)
        return;
      this.startPageX = event.touches[0].pageX;
      this.startPageY = event.touches[0].pageY;
    },
    touchmove(event) {
      if (!this.canDrag)
        return;
      let touchmovePageX = event.touches[0].pageX;
      let result = touchmovePageX - this.startPageX;
      this.calendarTransform(result, 0);
    },
    touchend(event) {
      if (!this.canDrag)
        return;
      let that = this;
      let endPageX = event.changedTouches[0].pageX;
      let endPageY = event.changedTouches[0].pageY;
      let x = Math.abs(that.startPageX - endPageX);
      let y = Math.abs(that.startPageY - endPageY);
      let screenX = 0;
      try {
        const res = common_vendor.index.getSystemInfoSync();
        screenX = res.windowWidth;
      } catch (e) {
        console.error(e);
        return;
      }
      if (that.startPageX > endPageX) {
        let a = Math.atan(y / x);
        let Rate = x / screenX;
        if (a < Math.PI / 6 && Rate > 0.3) {
          screenX = -screenX;
          that.calendarTransform(screenX, 300);
          setTimeout(function() {
            that.addMonth();
            that.calendarTransform(0, 0);
          }, 300);
        } else {
          that.calendarTransform(0, 300);
        }
      } else {
        let a = Math.atan(y / x);
        let Rate = x / screenX;
        if (a < Math.PI / 6 && Rate > 0.3) {
          that.calendarTransform(screenX, 300);
          setTimeout(function() {
            that.subMonth();
            that.calendarTransform(0, 0);
          }, 300);
        } else {
          that.calendarTransform(0, 300);
        }
      }
    }
  },
  computed: {
    transformObj: function() {
      return "translate3d(" + this.transform_x + "px, 0px, 0px) translateZ(0px)";
    },
    transformTimeObj: function() {
      return this.transform_time + "ms";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.subMonth && $options.subMonth(...args)),
    b: $data.lastDisabled ? 1 : "",
    c: common_vendor.t($data.title_time),
    d: common_vendor.o((...args) => $options.dateChange && $options.dateChange(...args)),
    e: common_vendor.o((...args) => $options.addMonth && $options.addMonth(...args)),
    f: $data.nextDisabled ? 1 : "",
    g: common_vendor.o((...args) => $options.backToToday && $options.backToToday(...args)),
    h: common_vendor.f($data.beforeDateList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.dateIndex),
        b: common_vendor.t(item.pointText),
        c: item.pointTextColor ? item.pointTextColor : $props.maskColor,
        d: common_vendor.t(item.markText),
        e: item.key,
        f: common_vendor.o((...args) => $options.subMonth && $options.subMonth(...args), item.key)
      };
    }),
    i: common_vendor.f($data.dateList, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.dateIndex),
        b: item.isDaySunOrSat && item.pointText != "班" ? 1 : "",
        c: item.pointText
      }, item.pointText ? {
        d: common_vendor.t(item.pointText),
        e: item.pointText == "班" ? 1 : "",
        f: item.pointText == "休" ? 1 : ""
      } : {}, {
        g: common_vendor.t(item.markText),
        h: item.markTextColor ? item.markTextColor : $props.maskColor,
        i: item.dateIndex == $data.currentSelectTime ? "white" : "",
        j: item.isToday && item.dateIndex == $data.currentSelectTime ? 1 : "",
        k: !item.isToday && item.dateIndex == $data.currentSelectTime ? 1 : "",
        l: !item.isToday && item.dateIndex == $data.currentSelectTime ? "#d84e41" : "",
        m: !item.isToday && item.dateIndex == $data.currentSelectTime ? "white" : "",
        n: item.key,
        o: common_vendor.o(($event) => $options.selectedDateFun(item.dateIndex), item.key)
      });
    }),
    j: common_vendor.f($data.afterDateList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.dateIndex),
        b: common_vendor.t(item.pointText),
        c: item.pointTextColor ? item.pointTextColor : $props.maskColor,
        d: common_vendor.t(item.markText),
        e: item.key,
        f: common_vendor.o((...args) => $options.addMonth && $options.addMonth(...args), item.key)
      };
    }),
    k: $options.transformObj,
    l: $options.transformTimeObj,
    m: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args)),
    n: common_vendor.o((...args) => $options.touchmove && $options.touchmove(...args)),
    o: common_vendor.o((...args) => $options.touchend && $options.touchend(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/安琦航/Desktop/new/new/components/Li-Calendar/Li-Calendar.vue"]]);
wx.createComponent(Component);
