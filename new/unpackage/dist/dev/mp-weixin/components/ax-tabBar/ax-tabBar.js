"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
require("../../utils/request.js");
const __default__ = {
  name: "ax-tabBar",
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: ["name", "id"],
  emits: ["setTabBarId"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const appId = common_vendor.inject("appId");
    let type = common_vendor.ref("");
    const list = common_vendor.ref([
      // {
      // 	id: 0,
      // 	title: '视频',
      // 	url: '/pages/video/video',
      // 	icon: '/static/icon/video'
      // },
      // {
      // 	id: 1,
      // 	title: '美文',
      // 	url: '/pages/article/article',
      // 	icon: '/static/icon/article'
      // },
      // // {
      // // 	id: 11,
      // // 	title: '美文1',
      // // 	url: '/pages/article/article',
      // // 	icon: '/static/icon/article'
      // // },
      // // {
      // // 	id: 2,
      // // 	title: '美文分类',
      // // 	url: '/pages/category/category',
      // // 	icon: '/static/icon/category'
      // // },
      // {
      // 	id:3,
      // 	title:"首页",
      // 	url:"/pages/homeIndex/homeIndex",
      // 	icon:"/static/icon/home"
      // },
      // {
      // 	id:4,
      // 	title:"首页1",
      // 	url:"/pages/homeIndex/homeIndex",
      // 	icon:"/static/icon/home"
      // }
    ]);
    const tabBarId = common_vendor.ref(null);
    function f_navTo(url1, item) {
      tabBarId.value = item.id;
      getApp().globalData.tabBarId = tabBarId.value;
      let m = getApp().globalData.tabBarId;
      console.log(m, item.pageType, "a");
      emits("setTabBarId", item);
      let url = null;
      switch (item.pageType) {
        case "1":
          {
            url = "/pages/homeIndex/homeIndex";
          }
          break;
        case "2":
          {
            url = "/pages/video/video";
          }
          break;
        case "3":
          {
            url = "/pages/article/article";
          }
          break;
        case "4":
          {
            url = "/pages/category/category";
          }
          break;
        case "5":
          {
            url = "/pages/calendar/calendar";
          }
          break;
        case "6": {
          common_vendor.index.navigateToMiniProgram({
            appId: item.xcxPage.adConfig,
            path: item.xcxPage.path
          });
          return;
        }
      }
      common_vendor.index.switchTab({
        url
      });
    }
    function f_getTabBar(o) {
      utils_api.getTabBarList(o).then((data) => {
        let _list = [];
        data.xcxPageList.forEach((element) => {
          if (element.bottomStatus == "1") {
            _list.push(element);
          }
        });
        list.value = _list;
      });
    }
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success(e) {
          type.value = e.osName;
        }
      });
      f_getTabBar({
        appId: appId.value
      });
      f_getAdv({
        appId: appId.value
      });
    });
    const videoAble = common_vendor.ref(false);
    function f_getAdv(o) {
      utils_api.Adv(o).then((res) => {
        res.advertPlaceConfigs.forEach((element) => {
          if (element.title == "config_vid") {
            videoAble.value = true;
          }
        });
        if (videoAble.value)
          ;
      });
    }
    common_vendor.onShow(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: props.id == item.id
          }, props.id == item.id ? {
            b: "https://xcx.wujingchuanmei.com/api" + item.iconIng
          } : {
            c: "https://xcx.wujingchuanmei.com/api" + item.icon
          }, {
            d: common_vendor.t(item.xcxPage.title),
            e: props.name == item.title || props.id == item.id ? "red" : "#000",
            f: common_vendor.o(($event) => f_navTo(item.url, item), index),
            g: index
          });
        }),
        b: common_vendor.unref(type) == "ios" ? "28rpx" : "30rpx",
        c: common_vendor.unref(type) == "ios" ? "164rpx" : "130rpx"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/components/ax-tabBar/ax-tabBar.vue"]]);
wx.createComponent(Component);
