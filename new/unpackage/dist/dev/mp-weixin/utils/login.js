"use strict";
const common_vendor = require("../common/vendor.js");
function login(appId) {
  common_vendor.wx$1.showLoading({
    title: "登录中"
  });
  return new Promise((resolve, reject) => {
    common_vendor.wx$1.login({
      success: function(res) {
        if (res.code) {
          common_vendor.index.request({
            // url: "http://192.168.2.136:8093/api/xcx/login",
            url: "https://xcx.wujingchuanmei.com/api/xcx/login",
            method: "post",
            data: {
              code: res.code,
              appId
            },
            success: (res2) => {
              common_vendor.wx$1.hideLoading();
              const data = res2.data;
              common_vendor.index.setStorageSync("articalToken", data.token);
              resolve("success");
            }
          });
        }
      }
    });
  });
}
exports.login = login;
