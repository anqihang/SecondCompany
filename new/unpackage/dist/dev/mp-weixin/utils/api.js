"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("./request.js");
const homeNewList = (data) => {
  let _data = {
    pageNum: data.page,
    appId: data.appId || "",
    cid: data.cid || "",
    title: data.title || "",
    reasonable: false,
    pageSize: data.pageSize || 5
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.get("/news/index", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const newInfo = (data) => {
  let _data = {
    id: data.id,
    appId: data.appId
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "文章详情数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.get("/news/show", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const newInfoHome = (data) => {
  let _data = {
    id: data.id
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.get("/news/typeShow", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const like = (data) => {
  let _data = {
    id: data.id,
    appId: data.appId
  };
  return new Promise((resolve, reject) => {
    utils_request.get("/news/likes", _data).then((res) => {
      resolve(res.data);
    });
  });
};
const cancelLike = (data) => {
  let _data = {
    id: data.id,
    appId: data.appId
  };
  return new Promise((resolve, reject) => {
    utils_request.get("/news/unlikes", _data).then((res) => {
      resolve(res.data);
    });
  });
};
const categoryItems = (data) => {
  let _data = {
    appId: data.appId,
    type: data.type
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.post("/news/category", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const getItems = (data) => {
  let _data = {
    appId: data.appId
    // type:data.type
  };
  return new Promise((resolve, reject) => {
    utils_request.post("/news/category", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const Adv = (data) => {
  let _data = {
    appId: data.appId
    // type:data.type
  };
  return new Promise((resolve, reject) => {
    utils_request.post("/getAdvConfig", _data).then((res) => {
      resolve(res.data);
    });
  });
};
const videoList = (data) => {
  let _data = {
    pageNum: data.page,
    // pageSize: 10,
    appid: data.appId || "",
    videoType: data.type || "",
    title: data.title || "",
    reasonable: false,
    pageSize: data.pageSize || 5
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.get("/video/index", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const videoInfoHome = (data) => {
  let _data = {
    id: data.id,
    typeId: data.cateId
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.get("/video/typeShow", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const videoInfo = (data) => {
  let _data = {
    id: data.id,
    appId: data.appId
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.get("/video/show", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const getVideoItems = (data) => {
  let _data = {
    appid: data.appId
    // type:data.type
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.showLoading({
      title: "数据加载中",
      icon: "loading",
      mask: true
    });
    utils_request.post("/video/type", _data).then((res) => {
      resolve(res.data);
      common_vendor.index.hideLoading();
    });
  });
};
const getTabBarList = (data) => {
  let _data = {
    appId: data.appId
  };
  return new Promise((resolve, reject) => {
    utils_request.get("/xcxPageBottom", _data).then((res) => {
      resolve(res.data);
    });
  });
};
exports.Adv = Adv;
exports.cancelLike = cancelLike;
exports.categoryItems = categoryItems;
exports.getItems = getItems;
exports.getTabBarList = getTabBarList;
exports.getVideoItems = getVideoItems;
exports.homeNewList = homeNewList;
exports.like = like;
exports.newInfo = newInfo;
exports.newInfoHome = newInfoHome;
exports.videoInfo = videoInfo;
exports.videoInfoHome = videoInfoHome;
exports.videoList = videoList;
