"use strict";
const common_vendor = require("../common/vendor.js");
const share = function(info) {
  common_vendor.index.getStorageSync("articalToken");
  console.log("share");
  console.log(info);
  console.log(info.indexOf("&can"));
  console.log("share无参");
  common_vendor.index.redirectTo({
    url: "/pages/index/index?" + info
  });
};
exports.share = share;
