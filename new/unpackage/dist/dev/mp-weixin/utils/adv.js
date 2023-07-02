"use strict";
const common_vendor = require("../common/vendor.js");
let timer = null;
const createAdv = function(adv) {
  if (common_vendor.wx$1.createInterstitialAd) {
    adv.interstitialAd = common_vendor.wx$1.createInterstitialAd({
      adUnitId: adv.advId
    });
    adv.interstitialAd.onLoad(() => {
      console.log("onLoad event emit");
    });
    adv.interstitialAd.onError((err) => {
      console.log("onError event emit", err);
      if (err.errCode == 1004) {
        if (adv.advId)
          ;
      }
    });
    adv.interstitialAd.onClose((res) => {
      console.log("onClose event emit", res);
      clearTimer();
      showAdv(adv);
    });
    showAdv(adv);
  }
};
const showAdv = function(adv) {
  if (adv.firstNow) {
    console.log(adv);
    let tim;
    tim = setTimeout(() => {
      if (adv.interstitialAd) {
        adv.interstitialAd.show().then(() => {
          console.log("插屏广告显示中，不再定时拉取广告,立即");
          clearInterval(timer);
        }).catch((err) => {
          console.log("插屏显示错误", err);
          if (err.errCode == 1004)
            ;
          if (err.errCode == 2002) {
            clearTimer();
            adv.interstitialAd = null;
            createAdv(adv);
          }
        });
      }
      adv.firstNow = false;
      clearTimeout(tim);
    }, 1 * 1e3);
  }
  timer = setInterval(() => {
    if (adv.interstitialAd) {
      adv.interstitialAd.show().then(() => {
        console.log("插屏广告显示中，不再定时拉取广告");
        clearInterval(timer);
      }).catch((err) => {
        console.log("插屏显示错误", err);
        if (err.errCode == 1004) {
          adv.interstitialAd.load();
        }
        if (err.errCode == 2002) {
          clearTimer();
          createAdv(adv);
        }
      });
    }
  }, adv.intervalNum * 1e3);
};
const clearTimer = function() {
  clearInterval(timer);
};
exports.clearTimer = clearTimer;
exports.createAdv = createAdv;
exports.showAdv = showAdv;
