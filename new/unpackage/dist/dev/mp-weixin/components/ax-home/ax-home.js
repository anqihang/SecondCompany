"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
require("../../utils/request.js");
if (!Array) {
  const _component_t_image = common_vendor.resolveComponent("t-image");
  _component_t_image();
}
const __default__ = {
  data() {
    return {};
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "ax-home",
  props: ["isShow"],
  setup(__props, { expose }) {
    const props = __props;
    const appId = common_vendor.inject("appId");
    const list = common_vendor.ref([]);
    function changeList(e) {
      switch (e.type) {
        case "3":
          f_getArticleList(e);
          break;
        case "2":
          f_getVideoList(e);
          break;
      }
    }
    const videoType = common_vendor.ref(null);
    function f_goInfo(item, item1) {
      if (item.type == 2) {
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
      } else if (item.type == 6) {
        common_vendor.index.navigateToMiniProgram({
          appId: item1.baseAppid,
          path: item1.basePath
        });
      }
    }
    function f_getArticleList(e) {
      const page = e.page + 1;
      e.page++;
      utils_api.homeNewList({
        // appId: appId.value,
        page,
        cid: e.cateId,
        pageSize: e.num
      }).then((data) => {
        if (data.articleList.length > 0) {
          data.articleList.forEach((item) => {
            if (item.picPath) {
              item.picPath = item.picPath.split(
                ","
              )[0];
            }
          });
          e.content = data.articleList;
        }
        if (data.articleList.length < 1) {
          e.page = 0;
          f_getArticleList(e);
        }
      });
    }
    function f_getVideoList(e) {
      const page = e.page + 1;
      e.page++;
      utils_api.videoList({
        // appId: appId.value,
        page,
        type: e.cateId,
        pageSize: e.num
      }).then((data) => {
        if (data.videoList.length > 0) {
          data.videoList.forEach((item) => {
            item.icon = item.icon.split(",")[0];
          });
          e.content = data.videoList;
        }
        if (data.videoList.length < 1) {
          e.page = 0;
          f_getVideoList(e);
        }
      });
    }
    async function f_getTabBar(o) {
      let advObject = {};
      await utils_api.Adv({
        appId: appId.value
      }).then((res) => {
        res.advertTypes.forEach((element) => {
          advObject[element.type] = element.content;
        });
      });
      await utils_api.getTabBarList(o).then((data) => {
        if (data.xcxPageList) {
          data.xcxPageList.forEach((element) => {
            if (element.pageType == "2") {
              videoType.value = element.xcxPage.adConfig;
            }
            if (element.id == getApp().globalData.tabBarId && props.isShow) {
              if (element.pageConfigs) {
                element.pageConfigs.forEach((item) => {
                  let a = {};
                  a.id = item.id;
                  a.title = item.baseTitle;
                  a.vertical = item.styleCss;
                  a.name = item.videoTypeName;
                  a.type = item.baseColumnType;
                  a.content = [];
                  a.adPosition = item.adSpace;
                  a.advId = advObject[item.adType];
                  a.icon = item.baseIcon;
                  a.page = 1;
                  a.num = item.styleNum;
                  a.adType = item.adType;
                  a.changeButton = item.styleButton;
                  a.secondTitle = item.baseSiteTitle;
                  a.cateId = item.baseVideoType;
                  switch (item.baseColumnType) {
                    case "2":
                      {
                        a.path = "/pages/video/video";
                        utils_api.videoList({
                          // appId: appId.value,
                          page: 1,
                          type: a.cateId,
                          pageSize: item.styleNum
                        }).then((data2) => {
                          if (data2.videoList.length > 0) {
                            data2.videoList.forEach((item2) => {
                              item2.icon = item2.icon.split(",")[0];
                            });
                          }
                          a.content = data2.videoList;
                          listen();
                        });
                      }
                      break;
                    case "3":
                      {
                        a.path = "/pages/article/article";
                        utils_api.homeNewList({
                          // appId: appId.value,
                          page: 1,
                          cid: a.cateId,
                          pageSize: item.styleNum
                        }).then((data2) => {
                          if (data2.articleList.length > 0) {
                            data2.articleList.forEach((item2) => {
                              if (item2.picPath) {
                                item2.picPath = item2.picPath.split(
                                  ","
                                )[0];
                              }
                            });
                          }
                          a.content = data2.articleList;
                          listen();
                        });
                      }
                      break;
                    case "6":
                      {
                        a.content = [item];
                        listen();
                      }
                      break;
                  }
                  list.value.push(a);
                });
              }
              console.log(list.value, "home");
            }
          });
        }
      });
    }
    const vif = common_vendor.ref(true);
    function listen() {
      vif.value = true;
      list.value.forEach((element) => {
        vif.value = false;
        let tim = setTimeout(() => {
          vif.value = true;
          clearTimeout(tim);
        }, 200);
      });
    }
    function tf() {
      if (!list.value.length) {
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
        a: vif.value
      }, vif.value ? {
        b: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.adPosition == "2" && item.advId && item.adType == "1"
          }, item.adPosition == "2" && item.advId && item.adType == "1" ? {
            b: item.advId
          } : {}, {
            c: item.adPosition == "2" && item.advId && item.adType == "3"
          }, item.adPosition == "2" && item.advId && item.adType == "3" ? {
            d: item.advId
          } : {}, {
            e: item.type != 6 && item.icon
          }, item.type != 6 && item.icon ? {
            f: "https://xcx.wujingchuanmei.com/api" + item.icon
          } : {}, {
            g: common_vendor.t(item.title),
            h: common_vendor.t(item.secondTitle),
            i: item.content.length && item.changeButton == 1 && !(item.type == 6)
          }, item.content.length && item.changeButton == 1 && !(item.type == 6) ? {
            j: common_vendor.o(($event) => changeList(item), item.id)
          } : {}, {
            k: common_vendor.f(item.content, (item1, index2, i1) => {
              return common_vendor.e({
                a: "1cc39756-0-" + i0 + "-" + i1,
                b: common_vendor.p({
                  src: "https://xcx.wujingchuanmei.com/api" + (item1.picPath ? item1.picPath : item1.icon ? item1.icon : item1.baseIcon),
                  mode: "aspectFill",
                  ariaLabel: "img"
                })
              }, item.type - 0 == 3 ? {} : {}, item.type - 0 == 2 ? {} : {}, {
                c: common_vendor.t(item1.title),
                d: item1.id,
                e: common_vendor.o(($event) => f_goInfo(item, item1), item1.id)
              });
            }),
            l: item.type - 0 == 3,
            m: item.type - 0 == 2,
            n: item.type == 6 ? "100%" : "calc(100% / " + (item.vertical - 0 + 1) + ")",
            o: item.adPosition == "3" && item.advId
          }, item.adPosition == "3" && item.advId ? common_vendor.e({
            p: item.adType == "1"
          }, item.adType == "1" ? {
            q: item.advId
          } : {}, {
            r: item.adType == "3"
          }, item.adType == "3" ? {
            s: item.advId
          } : {}) : {}, {
            t: item.id
          });
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/安琦航/Desktop/new/new/components/ax-home/ax-home.vue"]]);
wx.createComponent(Component);
