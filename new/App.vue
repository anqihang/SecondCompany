<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			wx.hideShareMenu({
				menus: ['shareTimeline']
			})

		},
		onShow: function() {
			console.log('App Show');
		},
		onLoad: function() {
			console.log('App Load');
		},
		onHide: function() {
			console.log('App Hide');
		},
		globalData: {
			top:'',
			bottom:'',
			options:'',
			timeSelect:"",
			firstPage:true,
			festivalData: null,
			tabBarId: null,
			isFirst: 0,
			//观看视频的数量
			playNum: 0,
			showTabBar: true,
			flashList: [{
				id: 0,
				appId: 'wx486e5812610e7d65',
				src: "https://mp.weixin.qq.com/s/zSZ96_kHHLTV4Q-SljeIuQ",
				isApp: false
			}, {
				id: 1,
				appId: 'wxd02a9f032acb12fb',
				src: "",
				isApp: true
			}, {
				id: 2,
				appId: 'wxf6372777032517e5',
				src: "",
				isApp: true
			}, ]
		}
	};
</script>
<script setup>
	import {
		r
	} from "/utils/util.js"
	import {
		provide,
		ref,
		getCurrentInstance
	} from 'vue';
	import {
		onLoad,
		onLaunch
	} from '@dcloudio/uni-app';
	import {
		Adv
	} from '/utils/api.js';
	
	const model = ref('');
	const appId = ref('');
	const { proxy } = getCurrentInstance();
	
	// console.log(proxy);
	onLaunch(() => {
		uni.getSystemInfo({
			success(e) {
				model.value = e.osName;
				provide('model', model);
			},
		});
		appId.value = wx.getAccountInfoSync().miniProgram.appId;
		provide('appId', appId);

		function f_fail() {
			uni.request({
				url: 'https://www.51wnl.com/WxProgram/GetAllConfig.ashx?appid=ios-wnl-free&appver=2&lastupdate=',
				data: {},
				method: 'GET',
				header: {
					"Content-Type": "application/json"
				}
			}).then((res) => {
				// console.log(res,'fail');
				proxy.globalData.festivalData = JSON.parse(r.base64decode(res.data.msg.Festival_ZH_CN));
			})
		}

		function f_success() {

		}
		proxy.globalData.festivalData ? f_success() : f_fail();
		// uni.getStorage({
		//             key: "wnl_allconfigdata"
		//         }).then(
		//           function(t) {
		//             //   console.log(t.data,'data');
		//             // a.globalData.festivalData = JSON.parse(e.base64decode(t.data.Festival_ZH_CN)), a.globalData.vacationData = JSON.parse(e.base64decode(t.data.Vocation_ZH_CN)), 
		//             // t.data.r && (a.allConfigUrl += t.data.r), a.getAllConfigData(a.allConfigUrl);
		//             // console.log(a.globalData.festivalData,'a');
		// 			}, 
		// 			// function() {
		// 			// 	// a.globalData.festivalData = n, a.globalData.vacationData = i, a.getAllConfigData(a.allConfigUrl);

		// 			// }
		// 		);
	});

	//全局广告
	// const advC = ref({
	// 	status: null,
	// 	advId: null,
	// 	interval: null,
	// });
	// //插屏广告实例
	// const interstitialAd = ref(null);
	// //是否继续拉广告
	// const isInterstitialAd = ref(true);
	// const timer = ref(null);

	// function showAdv() {
	// 	console.log('showAdv');
	// 	interstitialAd.value
	// 		.show()
	// 		.then(() => {
	// 			console.log('插屏广告显示中，不再定时拉取广告');
	// 			//广告显示后不再拉取
	// 			isInterstitialAd.value = false;
	// 			clearInterval(timer.value);
	// 		})
	// 		.catch(err => {
	// 			console.error(err);
	// 		});
	// }
	// //创建广告
	// function createAdv() {
	// 	if (wx.createInterstitialAd) {
	// 		interstitialAd.value = wx.createInterstitialAd({
	// 			adUnitId: 'adunit-3a69e4d3e9059fd0',
	// 		});
	// 		interstitialAd.value.onLoad(() => {
	// 			console.log('onLoad event emit');
	// 		});
	// 		interstitialAd.value.onError(err => {
	// 			console.log('onError event emit', err);
	// 		});
	// 		interstitialAd.value.onClose(res => {
	// 			console.log('插屏广告已关闭，重新开始定时拉取');
	// 			isInterstitialAd.value = true;
	// 			timer.value = setInterval(() => {
	// 				console.log(2);
	// 				showAdv();
	// 			}, 20 * 1000);
	// 			console.log('onClose event emit', res);
	// 		});
	// 		timer.value = setInterval(() => {
	// 			console.log(1);
	// 			showAdv();
	// 		}, 2 * 1000);
	// 	}
	// }

	// //获取广告
	// function getAdv() {
	// 	Adv({
	// 		appId: appId.value,
	// 	}).then(res => {
	// 		let type = null;
	// 		res.advertPlaceConfigs.forEach(element => {
	// 			if (element.advertPlaceId == 0 && element.title == 'all_adv') {
	// 				type = element.advertTypeId;
	// 				advC.value.status = element.status;
	// 			}
	// 		});
	// 		res.advertTypes.forEach(element => {
	// 			if (type == element.type) {
	// 				advC.value.advId = element.content.trim();
	// 				advC.value.interval = element.interval;
	// 			}
	// 		});
	// 		if (advC.value.status) {
	// 			createAdv();
	// 		}
	// 	});
	// }
	// const { appContext } = getCurrentInstance();
</script>

<style>
	@import '/wxcomponents/TDesign/miniprogram_dist/common/index.wxss';

	/*每个页面公共css */
	.level1 {
		width: 100vw;
		height: 100vh;
		position: fixed;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: "#ffffff";
	}

	.main {
		width: 100vw;
		overflow: auto;
		flex: 1;
		box-sizing: border-box;
	}

	/* home1页面的样式 */
	.t-tabs__content {
		flex: 1;
		height: calc(100% - 48px);
	}

	.t-tabs__content-inner {
		height: 100%;
	}

	.t-tabs__track {
		background-color: red !important;
	}

	.t-tabs__item--active {
		color: red !important;
	}

	.t-tabs__item-inner {
		font-size: 32rpx;
	}
	.t-tabs__item-inner{
		font-size:34rpx;
		font-weight:700;
	}
	.t-tabs__scroll::after{
		content:""!important;
		display:none!important;
	}
</style>