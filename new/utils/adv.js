let timer = null;
//创建广告
export const createAdv = function(adv) {
	if (wx.createInterstitialAd) {
		adv.interstitialAd = wx.createInterstitialAd({
			adUnitId: adv.advId,
		});
		adv.interstitialAd.onLoad(() => {
			console.log('onLoad event emit');
		});
		adv.interstitialAd.onError(err => {
			console.log('onError event emit', err);
			if (err.errCode == 1004) {
				if(adv.advId){
					// adv.interstitialAd.load();
				}
			}
		});
		adv.interstitialAd.onClose(res => {
			console.log('onClose event emit', res);
			clearTimer();
			showAdv(adv);
		});
		showAdv(adv);
	}
}
//显示插屏广告
export const showAdv = function(adv) {
	if(adv.firstNow){
		console.log(adv);
		let tim;
		tim = setTimeout(()=>{
			if (adv.interstitialAd) {
				adv.interstitialAd
					.show()
					.then(() => {
						console.log('插屏广告显示中，不再定时拉取广告,立即');
						clearInterval(timer);
					})
					.catch(err => {
						console.log('插屏显示错误', err);
						if (err.errCode == 1004) {
							// adv.interstitialAd.load();
						}
						if (err.errCode == 2002) {
							clearTimer();
							adv.interstitialAd = null;
							createAdv(adv);
						}
					});
			}
			adv.firstNow = false;
			clearTimeout(tim);
		},1*1000);
	}
	timer = setInterval(() => {
		if (adv.interstitialAd) {
			adv.interstitialAd
				.show()
				.then(() => {
					console.log('插屏广告显示中，不再定时拉取广告');
					clearInterval(timer);
				})
				.catch(err => {
					console.log('插屏显示错误', err);
					if (err.errCode == 1004) {
						adv.interstitialAd.load();
					}
					if (err.errCode == 2002) {
						clearTimer();
						createAdv(adv);
					}
				});
		}
	}, adv.intervalNum * 1000);
}
export const showAdvNow = function(adv){
	timer = setinterval
}
export const clearTimer = function() {
	// adv.interstitialAd = null;
	clearInterval(timer);
	// adv.interstitialAd = null;
}