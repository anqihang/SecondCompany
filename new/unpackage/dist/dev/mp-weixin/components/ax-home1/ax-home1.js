"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
require("../../utils/request.js");
if (!Array) {
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _component_t_divider = common_vendor.resolveComponent("t-divider");
  const _component_t_tab_panel = common_vendor.resolveComponent("t-tab-panel");
  const _component_t_tabs = common_vendor.resolveComponent("t-tabs");
  (_component_t_image + _component_t_divider + _component_t_tab_panel + _component_t_tabs)();
}
const __default__ = {
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "ax-home1",
  props: ["isShow"],
  setup(__props, { expose }) {
    const appId = common_vendor.inject("appId");
    const navList = common_vendor.ref([]);
    common_vendor.ref(0);
    function changeTab(e) {
      navList.value.forEach((element) => {
        if (element.id == e.detail.value) {
          if (!element.alive) {
            getList(element);
          }
        }
      });
    }
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
    const advType = common_vendor.ref({});
    async function f_getTabBar(o) {
      await utils_api.Adv({ appId: appId.value }).then((res) => {
        let type = null;
        let type1 = null;
        let typeT = null;
        let typeB = null;
        res.advertPlaceConfigs.forEach((element) => {
          if (element.title == "config_adv") {
            type = element.advertTypeId;
            advType.value["artical"] = element;
          }
          if (element.title == "config_vid") {
            type1 = element.advertTypeId;
            advType.value["video"] = element;
          }
          if (element.title == "top_index") {
            typeT = element.advertTypeId;
            advT.value.status = element.status;
            advT.value.every = element.acticleCnt;
            advT.value.type = element.advertTypeId;
          }
          if (element.title == "bottom_index") {
            typeB = element.advertTypeId;
            advB.value.status = element.status;
            advB.value.every = element.acticleCnt;
            advB.value.type = element.advertTypeId;
          }
        });
        res.advertTypes.forEach((element) => {
          if (type == element.type) {
            advType.value["artical"].advId = element.content.trim();
          }
          if (type1 == element.type) {
            advType.value["video"].advId = element.content.trim();
          }
          if (typeT == element.type) {
            advT.value.advId = element.content.trim();
          }
          if (typeB == element.type) {
            advB.value.advId = element.content.trim();
          }
        });
      });
      await utils_api.getTabBarList(o).then((data) => {
        if (data.xcxPageList) {
          data.xcxPageList.forEach((element) => {
            if (element.pageType == "2") {
              videoType.value = element.xcxPage.adConfig;
            }
            if (element.id == getApp().globalData.tabBarId) {
              if (element.pageConfigs) {
                element.pageConfigs.forEach((item) => {
                  let a = {};
                  a.id = item.id;
                  a.title = item.baseTitle;
                  a.name = item.videoTypeName;
                  a.type = item.baseColumnType;
                  a.list = [];
                  a.styleNum = item.styleNum;
                  a.page = 1;
                  a.alive = false;
                  a.isRefresh = true;
                  a.cateId = item.baseVideoType;
                  if (a.type == 3 && advType.value["artical"]) {
                    a.adv = advType.value["artical"];
                  }
                  if (a.type == 2 && advType.value["video"]) {
                    a.adv = advType.value["video"];
                  }
                  navList.value.push(a);
                });
                getList(navList.value[0]);
              }
            }
          });
        }
      });
    }
    function getList(element) {
      console.log(element, "elementaaa");
      switch (element.type) {
        case "2":
          {
            element.path = "/pages/video/video";
            utils_api.videoList({
              // appId: appId.value,
              page: element.page,
              type: element.cateId
            }).then((data) => {
              if (data.videoList.length > 0) {
                element.page++;
                element.alive = true;
                data.videoList.forEach((item) => {
                  item.icon = item.icon.split(",")[0];
                });
              } else {
                element.isRefresh = false;
              }
              element.list = element.list.concat(data.videoList);
            });
          }
          break;
        case "3":
          {
            element.path = "/pages/article/article";
            utils_api.homeNewList({
              // appId: appId.value,
              page: element.page,
              cid: element.cateId
            }).then((data) => {
              if (data.articleList.length > 0) {
                element.page++;
                element.alive = true;
                data.articleList.forEach((item) => {
                  if (item.picPath) {
                    item.picPath = item.picPath.split(",")[0];
                  }
                });
              } else {
                element.isRefresh = false;
              }
              element.list = element.list.concat(data.articleList);
            });
          }
          break;
      }
    }
    function scrollBottom(item) {
      if (item.isRefresh) {
        getList(item);
      }
    }
    const videoType = common_vendor.ref(null);
    function f_goDetails(item, item1) {
      console.log(item, item1, "itee");
      if (item.type == 2) {
        console.log(videoType.value, "videoType");
        if (videoType.value == 1) {
          common_vendor.index.navigateTo({
            url: "/pages_details/videoDetails/videoDetails?id=" + item1.id + "&can=true&from=home&cateId=" + item.cateId
          });
        } else if (videoType.value == 2) {
          common_vendor.index.navigateTo({
            url: "/pages_details/video_details/video_details?id=" + item1.id + "&can=true&from=home&cateId=" + item.cateId
          });
        }
      } else if (item.type == 3) {
        common_vendor.index.navigateTo({
          url: "/pages_details/article_details/article_details?id=" + item1.id + "&can=true&from=home"
        });
      }
    }
    function tf() {
      if (navList.value.length < 1) {
        f_getTabBar({
          appId: appId.value
        });
      }
    }
    common_vendor.onShow(() => {
    });
    expose({
      tf
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: navList.value.length
      }, navList.value.length ? {
        b: common_vendor.f(navList.value, (item, index, i0) => {
          return common_vendor.e(advT.value.status == 1 && advT.value.advId && advT.value.type == 3 ? {
            a: advT.value.advId
          } : {}, advT.value.status == 1 && advT.value.advId && advT.value.type == 1 ? {
            b: advT.value.advId
          } : {}, {
            c: common_vendor.f(item.list, (item1, index1, i1) => {
              return common_vendor.e({
                a: "e6ff802c-2-" + i0 + "-" + i1 + "," + ("e6ff802c-1-" + i0),
                b: common_vendor.p({
                  src: "https://xcx.wujingchuanmei.com/api" + (item1.picPath ? item1.picPath : item1.icon),
                  mode: "aspectFill",
                  width: "72",
                  height: "72",
                  shape: "round",
                  ariaLabel: "img"
                })
              }, item.type == 2 ? {} : {}, {
                c: common_vendor.t(item1.title)
              }, item.type == 2 ? {
                d: common_vendor.t(item1.playNum > 1e4 ? (item1.playNum / 1e4).toFixed(1) + "万" : item1.playNum)
              } : {}, {
                e: item.adv && item.adv.status == 1 && item.adv.advId && item.adv.acticleCnt != 0 && index1 != 0 && (index1 + 1) % item.adv.acticleCnt == 0 && item.adv.advertTypeId == 1
              }, item.adv && item.adv.status == 1 && item.adv.advId && item.adv.acticleCnt != 0 && index1 != 0 && (index1 + 1) % item.adv.acticleCnt == 0 && item.adv.advertTypeId == 1 ? {
                f: item.adv.advId
              } : {}, {
                g: item.adv && item.adv.status == 1 && item.adv.advId && item.adv.acticleCnt != 0 && index1 != 0 && (index1 + 1) % item.adv.acticleCnt == 0 && item.adv.advertTypeId == 3
              }, item.adv && item.adv.status == 1 && item.adv.advId && item.adv.acticleCnt != 0 && index1 != 0 && (index1 + 1) % item.adv.acticleCnt == 0 && item.adv.advertTypeId == 3 ? {
                h: item.adv.advId
              } : {}, {
                i: index1,
                j: common_vendor.o(($event) => f_goDetails(item, item1), index1)
              });
            }),
            d: item.type == 2,
            e: item.type == 2,
            f: "e6ff802c-3-" + i0 + "," + ("e6ff802c-1-" + i0)
          }, advB.value.status == 1 && advB.value.advId && advB.value.type == 3 ? {
            g: advB.value.advId
          } : {}, advB.value.status == 1 && advB.value.advId && advB.value.type == 1 ? {
            h: advB.value.advId
          } : {}, {
            i: common_vendor.o(($event) => scrollBottom(item), index),
            j: index,
            k: "e6ff802c-1-" + i0 + ",e6ff802c-0",
            l: common_vendor.p({
              label: item.title,
              value: item.id
            })
          });
        }),
        c: advT.value.status == 1 && advT.value.advId && advT.value.type == 3,
        d: advT.value.status == 1 && advT.value.advId && advT.value.type == 1,
        e: common_vendor.p({
          dashed: true,
          content: "已无更多数据"
        }),
        f: advB.value.status == 1 && advB.value.advId && advB.value.type == 3,
        g: advB.value.status == 1 && advB.value.advId && advB.value.type == 1,
        h: common_vendor.o(changeTab),
        i: common_vendor.p({
          defaultValue: navList.value[0].id,
          spaceEvenly: false
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/components/ax-home1/ax-home1.vue"]]);
wx.createComponent(Component);
