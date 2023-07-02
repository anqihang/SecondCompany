"use strict";
const common_vendor = require("../common/vendor.js");
const $request = (url, data, method = "POST", headers = "application/json;") => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      // url: "http://192.168.2.136:8093/api/xcx" + url,
      url: "https://xcx.wujingchuanmei.com/api/xcx" + url,
      // url: "http://47.106.137.96:8093/api/xcx" + url,
      // url:"http://47.106.137.96:8093/api/xcx" + url,
      method,
      data,
      header: {
        "Content-Type": headers,
        "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
      },
      success(res) {
        resolve(res);
      },
      fail(error) {
        reject(error);
      },
      complete() {
      }
    });
  });
};
const $get = (url, data) => {
  return $request(url, data, "GET");
};
const get = (url, data) => {
  return $request(url, data, "GET");
};
const $post = (url, data) => {
  return $request(url, data, "POST");
};
const post = (url, data) => {
  return $request(url, data, "POST");
};
common_vendor.index.$request = $request;
common_vendor.index.$get = $get;
common_vendor.index.$post = $post;
exports.get = get;
exports.post = post;
