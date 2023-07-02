<template>
	<view class="level1" style="align-items: center;">
		<view class="" style="position: fixed;top:0;z-index:10"><ax-topNav :name="title" :back="true" :isShare="isFromShare"
				:backId="backId" :backPage="backPage"></ax-topNav></view>
		<view id="main" class="main" style="display: flex;flex-direction: column;position: relative" :style="{'margin-top':topH,'margin-bottom':bottomH}">
			<view class="" style="margin:0 10rpx;flex:1;overflow: auto;">
				<scroll-view class="scroll" :scroll-top="scrollTop" style="height:100%;" scroll-y="true"
					@scroll="f_scroll">
					<view class="" v-if="advRefresh">
						<ad v-if="advT.status == 1 && advT.advId && advT.type == 1" :unit-id="advT.advId"></ad>
						<ad v-if="advT.status == 1 && advT.advId && advT.type == 3" ad-type="video" ad-theme="white"
							:unit-id="advT.advId"></ad>
					</view>
					<view class=""
						style="flex:1;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;word-break: break-all;margin-bottom: 8rpx;margin:20rpx 10rpx;">
						<text style="font-size: 36rpx;">{{ title }}</text>
					</view>
					<view class="" style="color:#d8d8d8;font-size: 26rpx;margin: 20rpx 10rpx;">{{ updataTime }}</view>
					<view class="video" style="display: flex;justify-content: center;">
						<view class="" style="width:100%;" v-if="advS.finish">
							<!-- <video v-if="!vid" :src="'https://xcx.wujingchuanmei.com/api'+ videoSrc" controls
							style="vertical-align: bottom;width:700rpx;"></video> -->
							<!-- :ad-unit-id="advS.advId" @adplay="onAdplay" @adload="onAdload" @adclose="onAdclose"
							@aderror="onAderror" -->
							<!-- <video v-if="tentId || videoSrc" controls :src="tentId || videoSrc" autoplay
							 id="video1" style="vertical-align: bottom;width:100%"
							@timeupdate="onVideoTimeUpdate($event)" @play="playVideo">
						</video> -->

							<video v-if="tentId || videoSrc" controls :src="tentId || videoSrc" autoplay
								:ad-unit-id="advS.advId" @adplay="onAdplay" @adload="onAdload" @adclose="onAdclose"
								@aderror="onAderror" id="video1" style="vertical-align: bottom;width:100%"
								@timeupdate="onVideoTimeUpdate($event)" @play="playVideo">
							</video>
						</view>
					</view>
					<view class="" style="overflow: hidden;">
						<view class="" style="display: flex;margin-top:50rpx;padding-bottom:30rpx;">
							<view class="" style="margin-right:20rpx;"><text>观看</text></view>
							<view class="" style="margin-right:20rpx;">
								<text style="color:darkgray">{{ num.read }}</text>
							</view>
						</view>
					</view>
					<view class="" style="display: flex;justify-content: center;margin-bottom:20rpx;">
						<view class=""
							style="display: flex;justify-content: center;border-radius: 40rpx;overflow: hidden;">
							<view class="" style="background-color: red;padding:10rpx 20rpx;display: flex;">
								<button
									style="border:0;background-color: red;margin:0;display: flex;padding: 0;align-items: center;line-height:0;outline: none;"
									open-type="share">
									<t-icon name="logo-wechat" size="48rpx" style="color:white;padding:0 10rpx;" />
									<text style="color:white;">分享给好友</text>
								</button>
							</view>
							<view class="" style="background-color: limegreen;padding:10rpx 30rpx;display: flex;">
								<button
									style="border:0;background-color: transparent;margin:0;display: flex;padding: 0;align-items: center;line-height:0;outline: none;"
									open-type="share">
									<t-icon name="logo-wechat" size="48rpx" style="color:white;padding:0 10rpx;" />
									<text style="color:white;">分享给群聊</text>
								</button>
							</view>
						</view>
					</view>
					<view class="" v-if="advRefresh">
						<ad v-if="advB.status == 1 && advB.advId && advB.type == 1" :unit-id="advB.advId"></ad>
						<ad v-if="advB.status == 1 && advB.advId && advB.type == 3" ad-type="video" ad-theme="white"
							:unit-id="advB.advId"></ad>
					</view>
					<view v-if="suggestList" class="" style="margin: 0 0 20rpx 0;">
						<view class="" style="">
							<view class="" style="text-align: center;padding:20rpx 0;"><text
									style="color:red;">热门推荐</text>
							</view>
							<view class="" @click="f_refresh(item)" style="" v-for="(item, index) in suggestList"
								:key="index">
								<view class=""
									style="display: flex;margin:0 10rpx;border-radius: 10rpx;padding:10rpx 0;">
									<view class=""
										style="flex:5;height:200rpx;padding:10rpx 20rpx;box-sizing: border-box;position:relative;">
										<t-image :src="'https://xcx.wujingchuanmei.com/api'+ item.icon"
											mode="aspectFill" shape="round" aria-label="img"
											style="width:100%;height:100%;" />
										<view class="playButton"
											style="position:absolute;z-index:10;top:50%;transform: translateY(-50%);display: flex;justify-content: center;left:0;right:0;margin:auto;">
											<view class=""
												style="background-color: rgba(0, 0, 0, 0.6);height:100rpx;width:100rpx;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
												<view class=""
													style="border:40rpx solid white;width:0;border-top:30rpx solid transparent;border-right:0;border-bottom:30rpx solid transparent;transform: translateX(20%);">
												</view>
											</view>
										</view>
									</view>
									<view class="" style="flex:6;padding-right:10rpx;">
										<text
											style="font-size:28rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;line-clamp: 3;-webkit-box-orient: vertical;word-break: break-all;">
											{{ item.title }}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="tabBar" style="position: fixed;bottom: 0;z-index:10;"><ax-tabBar name="视频"></ax-tabBar></view>
		<!-- 一级弹出框，判断是否播放激励广告 -->
		<view
			style="position:absolute;width:100vw;z-index:20;height:100%;z-index:9990;background-color: rgba(0,0,0,0.4);display: flex;align-items: center;justify-content: center;"
			v-if="popupVisible">
			<view style="display: flex;justify-content: center;">
				<view class=""
					style="width:80vw;height:300rpx;background-color: white;border-radius: 20rpx;overflow:hidden;">
					<view class=""
						style="display: flex;flex-direction: column;align-items: center;justify-content: space-around;height:100%;">
						<view class="" style="display: flex;align-items: center;margin:30rpx 0 10rpx 0;">
							<text style="font-weight: 700;">温馨提示</text>
						</view>
						<view class="title" style="flex:1;display:flex;align-items: center;">
							<text>{{advReward.title}}</text>
						</view>
						<view class="" style="display: flex;justify-content: space-around;width:100%;flex:1;">
							<view @click="cancelPop" class="btn"
								style="flex:1;display: flex;display: flex;justify-content: center;align-items: center;border-top:1px solid #d8d8d8;border-right:1px solid #d8d8d8;">
								取消</view>
							<view @click="enterPop" class="btn"
								style="flex:1;display: flex;display: flex;justify-content: center; align-items: center;border-top:1px solid #d8d8d8;color:royalblue">
								解锁</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 二级弹出框，判断是否跳转到下一个视频 -->
		<view
			style="position:absolute;width:100vw;z-index:20;height:100%;z-index:9990;background-color: rgba(0,0,0,0.4);display: flex;align-items: center;justify-content: center;"
			v-if="pop2">
			<view style="display: flex;justify-content: center;">
				<view class=""
					style="width:80vw;height:300rpx;background-color: white;border-radius: 20rpx;overflow:hidden;">
					<view class=""
						style="display: flex;flex-direction: column;align-items: center;justify-content: space-around;height:100%;">
						<view class="" style="display: flex;align-items: center;margin:30rpx 0 10rpx 0;">
							<text style="font-weight: 700;">温馨提示</text>
						</view>
						<view class="title" style="flex:1;display:flex;align-items: center;">
							<text>是否狠心离开</text>
						</view>
						<view class="" style="display: flex;justify-content: space-around;width:100%;flex:1;">
							<view @click="leave2" class="btn"
								style="flex:1;display: flex;display: flex;justify-content: center;align-items: center;border-top:1px solid #d8d8d8;border-right:1px solid #d8d8d8;">
								狠心离开</view>
							<view @click="cancel2" class="btn"
								style="flex:1;display: flex;display: flex;justify-content: center; align-items: center;border-top:1px solid #d8d8d8;color:royalblue">
								继续观看</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
	};
</script>
<script setup>
	import {
		like,
		cancelLike,
		Adv,
		videoInfo,
		getTabBarList,
		videoInfoHome,
	} from '../../utils/api.js';
	import {
		createAdv,
		clearTimer,
		showAdv,
	} from "../../utils/adv.js";
	import {
		onLoad,
		onShow,
		onHide,
		onUnload,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {
		inject,
		ref,
		onMounted
	} from 'vue';
	import {
		share
	} from "../../utils/share.js"
	const model = inject('model');
	const appId = inject('appId');
	//顶部title
	const title = ref('');
	const updataTime = ref('');
	//文章底部数字
	const num = ref({
		read: 100,
		like: 2,
	});
	//文章id
	const id = ref(null);
	//是否点赞，控制颜色改变
	const isLike = ref(false);
	const suggestList = ref([]);
	const isFromShare = ref(false);
	const backPage = ref(null);
	const vid = ref('');
	const videoSrc = ref(null);
	const rewardAdv = ref(null);

	//激励视频
	const advReward = ref({
		time: 0,
		title: '',
		id: '',
		status: 0,
		every: null
	})
	const popupVisible = ref(false);
	const pop2 = ref(false);

	const agreePlay = ref(true);
	const videoContent = ref(null);
	videoContent.value = uni.createVideoContext('video1');
	//只播放一次
	let count = 0;
	//创建激励广告
	function createReward() {
		if (wx.createRewardedVideoAd) {
			if (rewardAdv.value) {
				rewardAdv.value = null;
			}
			rewardAdv.value = wx.createRewardedVideoAd({
				adUnitId: advReward.value.id
			})
			rewardAdv.value.onLoad(() => {
				console.log('激励广告加载成功');
			})
			rewardAdv.value.onError((err) => {
				console.log('onError event emit', err);
				agreePlay.value = true;
				if (videoContent.value) {
					console.log('继续播放');
					videoContent.value.play();
				}
				count++;
			})
			rewardAdv.value.onClose((res) => {
				console.log('onClose event emit', res);
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束，可以下发游戏奖励
					agreePlay.value = true;
					console.log('播放');
					if (videoContent.value) {
						videoContent.value.play();
					}
					count++;
				} else {
					// agreePlay.value = false;
				}
			})
		}
	}
	//显示激励广告
	function showReward() {
		rewardAdv.value.show().catch(() => {
			console.log('load');
			rewardAdv.value.load().then(() => rewardAdv.value.show()).catch(err => {
				console.log('激励视频广告加载失败');
				agreePlay.value = true;
				if (videoContent.value) {
					videoContent.value.play();
				}
				count++;
			})
		})
	}
	//取消
	function cancelPop() {
		popupVisible.value = false;
		pop2.value = true;
	}
	//解锁
	function enterPop() {
		popupVisible.value = false;
		if (rewardAdv.value) {
			showReward();
		} else {
			agreePlay.value = true;
			if (videoContent.value) {
				videoContent.value.play();
			}
			count++;
		}
	}
	//第二个取消
	function cancel2() {
		pop2.value = false;
		if (rewardAdv.value) {
			showReward();
		} else {
			agreePlay.value = true;
			if (videoContent.value) {
				videoContent.value.play();
			}
			count++;
		}
	}
	//第二个离开
	function leave2() {
		pop2.value = false;
		f_refresh();
	}
	//点击播放三角
	function playVideo() {
		console.log(agreePlay.value, 'agree');
		if (agreePlay.value) {} else {
			videoContent.value.pause();
			popupVisible.value = true;
		}
	}
	const backId = ref(null)
	//分类id
	const cateId = ref('');
	const from = ref('');
	const topH = ref(null);
	const bottomH =ref(null);
	//上页面传参
	onLoad(res => {
		topH.value = getApp().globalData.top;
		bottomH.value = getApp().globalData.bottom;
		if (!res.can) {
			getTabBarList({
				appId: appId.value
			}).then((data) => {
				try {
					data.xcxPageList.forEach((element) => {
						if (element.pageType == "2") {
							// if(element.bottomStatus == '1'){
							// 	shareTabBarId = element.id;
							// }
							let shareTabBarId = element.id;
							const info = 'path=/pages_details/videoDetails/videoDetails' +
								'&type=noTabBar' +
								'&share=true' +
								'&backPage=/pages/video/video' +
								'&id=' +
								res.id + "&can=true" + "&tabBarId=" + shareTabBarId;
							share(info);
							throw new Error();
						}
					})
				} catch (e) {}
			})
			// share(info);
		}
		cateId.value = res.cateId;
		from.value = res.from;
		console.log(res, 'res');
		// const info = 'path=/pages_details/videoDetails/videoDetails' +
		// 	'&type=noTabBar' +
		// 	'&share=true' +
		// 	'&backPage=/pages/video/video' +
		// 	'&id=' +
		// 	res.id + "&can=true";
		// // + '&tabBarId=' + res.tabBarId
		// //无配置分享
		// if (!res.can) {
		// 	share(info);
		// }


		if (getApp().globalData.firstPage) {
			advC.value.firstNow = true;
			getApp().globalData.firstPage = false;
		}

		backId.value = res.tabBarId;
		isFromShare.value = res.share;
		backPage.value = res.backPage || '/pages/video/video';
		id.value = res.id - 0;
		f_getVideoInfo({
			id: id.value,
			appId: appId.value,
		});
	});
	//判断前贴广告是否存在判断是否隐藏底部广告
	const advRefresh = ref(false);

	function onAdplay(e) {
		console.log('onAdplay', e)
		if (e.detail.type == "begin") {
			advRefresh.value = false;
		}
		if (e.detail.type == "end") {
			advRefresh.value = true;
		}
	}

	function onAdload(e) {
		console.log('onAdload', e)
	}

	function onAdclose(e) {
		console.log('onAdclose', e)
		advRefresh.value = true;
	}

	function onAderror(e) {
		console.log('onAdError', e)
		advRefresh.value = true;
	}

	const tentId = ref(null);
	const nextId = ref(null);
	//处理返回数据
	function returnData(data) {
		getApp().globalData.playNum++;
		//上条视频的id
		nextId.value = data.nextId;

		vid.value = data.xcxVideo.videoUrl;
		if (vid.value) {
			vid.value = vid.value.trim();
		}
		videoSrc.value = data.xcxVideo.video;
		let http = new RegExp(/http/);
		if (http.test(videoSrc.value)) {
			console.log('http');
		} else {
			videoSrc.value = 'https://xcx.wujingchuanmei.com/api' + videoSrc.value;
		}
		title.value = data.xcxVideo.title;
		updataTime.value = data.xcxVideo.createTime;
		suggestList.value = data.recommends;
		if (suggestList.length > 0) {
			suggestList.value.forEach(item => {
				item.icon = item.icon.split(',')[0];
			})
		}
		//todo
		if (vid.value) {
			uni.request({
				url: `https://vv.video.qq.com/getinfo?vids=${vid.value}&platform=101001&charge=0&otype=json&defn=shd`,
				// url: `http://vv.video.qq.com/getinfo?vids=s00463bm7i3&platform=101001&charge=0&otype=json&defn=shd`,
				method: 'get',
				success(res) {
					let data = res.data;
					let reg = new RegExp(/fn"\:"([\w{0,}\.]{0,}mp4)"/);
					let reg1 = new RegExp(/fvkey"\:"(\w+)"/);
					let reg2 = new RegExp(/url"\:"([0-9a-zA-Z\/\:\_\.\-]{0,})"/, 'g');
					let a = reg.exec(data);
					let b = reg1.exec(data);
					let c;
					let d;
					while ((c = reg2.exec(data)) != null) {
						d = c;
					}
					let e = d[1] + a[1] + '?vkey=' + b[1];
					tentId.value = e;
				},
				fail(error) {},
				complete() {}
			})
		} else {
			tentId.value = null;
		}
	}
	//获取视频信息
	function f_getVideoInfo(o) {
		console.log(getApp().globalData.playNum);
		if (from.value == "home") {
			videoInfoHome({
				id: o.id,
				cateId: cateId.value
			}).then((data) => {
				returnData(data);
			})
		} else {
			videoInfo(o).then(data => {
				returnData(data);
				// getApp().globalData.playNum++;
				// //上条视频的id
				// nextId.value = data.nextId;

				// vid.value = data.xcxVideo.videoUrl;
				// if (vid.value) {
				// 	vid.value = vid.value.trim();
				// }
				// videoSrc.value = data.xcxVideo.video;
				// let http = new RegExp(/http/);
				// if (http.test(videoSrc.value)) {
				// 	console.log('http');
				// } else {
				// 	videoSrc.value = 'https://xcx.wujingchuanmei.com/api' + videoSrc.value;
				// }
				// title.value = data.xcxVideo.title;
				// updataTime.value = data.xcxVideo.createTime;
				// suggestList.value = data.recommends;
				// if (suggestList.length > 0) {
				// 	suggestList.value.forEach(item => {
				// 		item.icon = item.icon.split(',')[0];
				// 	})
				// }
				// //todo
				// if (vid.value) {
				// 	uni.request({
				// 		url: `https://vv.video.qq.com/getinfo?vids=${vid.value}&platform=101001&charge=0&otype=json&defn=shd`,
				// 		// url: `http://vv.video.qq.com/getinfo?vids=s00463bm7i3&platform=101001&charge=0&otype=json&defn=shd`,
				// 		method: 'get',
				// 		success(res) {
				// 			let data = res.data;
				// 			let reg = new RegExp(/fn"\:"([\w{0,}\.]{0,}mp4)"/);
				// 			let reg1 = new RegExp(/fvkey"\:"(\w+)"/);
				// 			let reg2 = new RegExp(/url"\:"([0-9a-zA-Z\/\:\_\.\-]{0,})"/, 'g');
				// 			let a = reg.exec(data);
				// 			let b = reg1.exec(data);
				// 			let c;
				// 			let d;
				// 			while ((c = reg2.exec(data)) != null) {
				// 				d = c;
				// 			}
				// 			let e = d[1] + a[1] + '?vkey=' + b[1];
				// 			tentId.value = e;
				// 		},
				// 		fail(error) {},
				// 		complete() {}
				// 	})
				// } else {
				// 	tentId.value = null;
				// }

			}).finally(() => {})
		}
	}
	let start = false;
	//普通视频定时
	function onVideoTimeUpdate(e) {
		console.log(e.detail.currentTime, 'time');
		if (advReward.value.status == 0 || !advReward.value.status) {
			count++;
		}
		if (Math.floor(e.detail.currentTime) == 0) {
			start = true;
			console.log(start, 'start');
		}
		if (count == 0 && (getApp().globalData.playNum) % advReward.value.every == 0 && getApp().globalData.playNum != 0 &&
			start) {
			console.log(e.detail.currentTime, 'tim', advReward.value.time);
			if (e.detail.currentTime > advReward.value.time) {
				videoContent.value.pause();
				agreePlay.value = false;
				start = false;
				popupVisible.value = true;
			}
			if (!agreePlay.value) {
				console.log(1);
				//显示弹出框
				// popupVisible.value = true;
				// agreePlay.value = true;
			}
		}
	}
	//前贴广告
	const advS = ref({
		status: null,
		advId: null,
		finish: false,
	})

	//顶部广告
	const advT = ref({
		status: null,
		// every: null,
		advId: null,
		type: null,
	});
	//底部广告
	const advB = ref({
		status: null,
		// every: null,
		advId: null,
		type: null,
	});
	//全局广告
	const advC = ref({
		status: null,
		advId: null,
		intervalNum: null,
		interstitialAd: null,
		firstNow: false,
	});
	//广告
	function f_getAdv(o) {
		Adv(o).then(res => {
			let typeT = null;
			let typeB = null;
			res.advertPlaceConfigs.forEach(element => {
				if (element.title == 'top_vid') {
					typeT = element.advertTypeId;
					advT.value.status = element.status;
					// advT.value.every = element.acticleCnt;
					advT.value.type = element.advertTypeId;
				}
				if (element.title == 'bottom_vid') {
					typeB = element.advertTypeId;
					advB.value.status = element.status;
					// advB.value.every = element.acticleCnt;
					advB.value.type = element.advertTypeId;
				}
			});
			res.advertTypes.forEach(element => {
				if (typeT == element.type) {
					advT.value.advId = element.content.trim();
				}
				if (typeB == element.type) {
					advB.value.advId = element.content.trim();
				}
				//插屏广告
				if (element.type == 2) {
					advC.value.status = element.status;
					advC.value.advId = element.content.trim();
					advC.value.intervalNum = element.intervalNum;
				}
				//激励广告
				if (element.type == 4) {
					advReward.value.id = element.content.trim();
					advReward.value.time = element.intervalNum;
					advReward.value.title = element.title;
					advReward.value.status = element.status;
					advReward.value.every = element.num;
					//todo
					createReward();
				}
				//前贴广告
				if (element.type == 5) {
					advS.value.status = element.status;
					advS.value.advId = element.content.trim();
				}
			});
			advS.value.finish = true;
			if (advC.value.status) {
				//todo
				createAdv(advC.value);
			}
		});
	}
	onShow(() => {
		f_getAdv({
			appId: appId.value,
		})
		wx.hideShareMenu({
			menus: ['shareTimeline']
		})
		if (advC.value.interstitialAd) {
			//todo
			showAdv(advC.value);
		}
	});
	onHide(() => {
		clearTimer();
		// clearInterval()
		// interstitialAd = null;
	});
	onUnload(() => {
		clearTimer();
		// clearInterval()
		// interstitialAd = null;
		getApp().globalData.playNum = 0;
	});


	const scrollTop = ref(null);
	const oldScrollTop = ref(null);

	function f_scroll(e) {
		oldScrollTop.value = e.detail.scrollTop;
	}
	//推荐刷新
	function f_refresh(item) {
		if (!item) {
			agreePlay.value = true;
			count = 0;
			advRefresh.value = false;
			start = false;
			f_getVideoInfo({
				id: nextId.value,
				appId: appId.value,
			});
		} else {
			agreePlay.value = true;
			count = 0;
			advRefresh.value = false;
			start = false;
			f_getVideoInfo({
				id: item.id,
				appId: appId.value,
			});
		}
		scrollTop.value = oldScrollTop.value;
		let timer = setTimeout(() => {
			scrollTop.value = 0;
			clearTimeout(timer);
		}, 100);
	}
	//todo
	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: title.value,
			path: '/pages/index/index?' + 'path=/pages_details/videoDetails/videoDetails' + '&type=noTabBar' +
				'&share=true' + '&backPage=/pages/video/video' + '&id=' + id.value + "&can=true" + "?tabBarId=" +
				backId.value,
		};
	});
	// onShareAppMessage(() => {
	// 	return {
	// 		title: title.value,
	// 		path: '/pages_details/videoDetails/videoDetails' + '?id=' + id.value,
	// 	};
	// });
</script>

<style lang="scss">
	button::after {
		border: 0;
	}
</style>