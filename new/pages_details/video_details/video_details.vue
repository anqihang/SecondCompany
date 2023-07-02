<template>
	<view class="level1" style="align-items: center;">
		<view class="" style="position: fixed;top:0;z-index;"><ax-topNav :back="true" :isShare="isFromShare" :backId="backId"
				:backPage="backPage" color="black"></ax-topNav></view>
		<view class="" v-if="showYinDao" @touchend="closeYinDao"
			style="background-color: rgba(0,0,0,0.4);height:100vh;width:100vw;position:absolute;z-index:10;display: flex;justify-content: center;" :style="{'margin-top':topH}">
			<t-image src="/static/yd.gif" mode="aspectFill" shape="round" aria-label="img"
				style="height:800rpx;position:absolute;z-index:30;top:400rpx;background-color: transparent;" />
		</view>
		<view id="main" class="main"
			style="display: flex;flex-direction: column;position: relative;background-color: black;" :style="{'margin-top':topH}">
			<!-- @change="next($event)" -->
			<swiper class="swiper" vertical style="height:100%;" @change="next1($event)" :current="current"
				indicator-dots>
				<!-- v-if="beforeId || end" -->
				<swiper-item>
				</swiper-item>
				<swiper-item style="">
					<scroll-view scroll-y="true" style="height:100%;" :scroll-top="scrollTop" @scroll="f_scroll">
						<view class="" style="">
							<view class=""
								style="margin-bottom:20rpx;flex:1;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;word-break: break-all;margin-bottom: 8rpx;margin:0 10rpx;padding-top:20rpx;">
								<text style="font-size: 40rpx;color:white;font-weight: 700;">{{ title }}</text>
							</view>
							<view class="video" style="display: flex;justify-content: center;margin:60rpx 0;">
								<view class="" style="width:100%;" v-if="advS.finish">
									<!-- <video v-if="!vid" controls :src="videoSrc" autoplay :ad-unit-id="advS.advId"
										@adplay="onAdplay" @adload="onAdload" @adclose="onAdclose" @aderror="onAderror"
										id="video1" style="vertical-align: bottom;width:100%"
										@timeupdate="onVideoTimeUpdate($event)" @play="playVideo">
									</video>
									<txv-video v-else @timeupdate="onTenTimeUpdate" :vid="vid" playerid="txv"
										width="100%" autoplay height="auto" @play="playVideo"></txv-video> -->
									<video v-if="tentId || videoSrc" controls :src="tentId || videoSrc" autoplay
										:ad-unit-id="advS.advId" @adplay="onAdplay" @adload="onAdload"
										@adclose="onAdclose" @aderror="onAderror" id="video1"
										style="vertical-align: bottom;width:100%"
										@timeupdate="onVideoTimeUpdate($event)" @play="playVideo">
									</video>
								</view>
							</view>
							<view class="" style="overflow: hidden;">
								<view class="" style="padding:10rpx 0;display: flex;align-items: center;">
									<view class="" style="padding:10rpx;">
										<view class=""
											style="width:40rpx;height:40rpx;background-color: red;border-radius: 50%;padding:4rpx;">
											<img src="/static/svg/s-left_gold.svg" alt=""
												style="width:100%;height:100%;transform: rotate(90deg);">
										</view>
									</view>
									<view class="">
										<text style="color:white;font-size: 38rpx;">上滑查看更多精彩视频！</text>
									</view>
								</view>
							</view>
							<view class="" style="display: flex;justify-content: center;margin:20rpx 0 40rpx 0;">
								<view class=""
									style="display: flex;justify-content: center;border-radius: 40rpx;overflow: hidden;">
									<view class=""
										style="background-color:  limegreen;padding:10rpx 20rpx;display: flex;">
										<button
											style="border:0;background-color:  limegreen;margin:0;display: flex;padding: 0;align-items: center;line-height:0;outline: none;"
											open-type="share">
											<t-icon name="logo-wechat" size="48rpx"
												style="color:white;padding:0 10rpx;" />
											<text style="color:white;">分享给好友</text>
										</button>
									</view>
									<view class="" style="background-color:red;padding:10rpx 30rpx;display: flex;">
										<button
											style="border:0;background-color: transparent;margin:0;display: flex;padding: 0;align-items: center;line-height:0;outline: none;"
											@click="nextVideo">
											<t-icon name="refresh" size="48rpx" style="color:white;padding:0 10rpx;" />
											<text style="color:white;">下个视频</text>
										</button>
									</view>
								</view>
							</view>
							<view class="" style="height:100%;position:relative;" v-if="advRefresh">
								<!-- <view class="" style="width:100%;height:100%;position:absolute;z-index:1000;">

								</view> -->
								<!-- <ad v-if="advB.status == 1 && advB.advId && advB.type == 1" :unit-id="advB.advId"></ad>
								<ad v-if="advB.status == 1 && advB.advId && advB.type == 3" ad-type="video"
									ad-theme="white" :unit-id="advB.advId"></ad> -->
								<ad-custom v-if="advB.advId" :unit-id="advB.advId" ad-intervals="35"></ad-custom>
								<!-- <ad-custom unit-id="adunit-b532f6bb8561f7ce" ad-intervals="35"></ad-custom> -->
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- v-if="nextId" -->
				<swiper-item>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="tabBar" style="position: fixed;bottom: 0;z-index:10;" v-if="showTabBar"><ax-tabBar
				:id="backId"></ax-tabBar> -->
		<!-- </view> -->
		<!-- 别放在video上边 -->
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
		mounted() {}
	};
</script>
<script setup>
	import {
		like,
		cancelLike,
		Adv,
		videoInfo,
		videoList,
		getTabBarList,
		videoInfoHome,
	} from '../../utils/api.js';
	import {
		createAdv,
		clearTimer,
		showAdv
	} from "../../utils/adv.js";
	import {
		onLoad,
		onShow,
		onHide,
		onUnload,
		onShareAppMessage,
		onReady,
	} from '@dcloudio/uni-app';
	import {
		inject,
		ref,
		onMounted,
		nextTick,
	} from 'vue';
	import {
		share
	} from "../../utils/share.js"
	const model = inject('model');
	const appId = inject('appId');
	const showTabBar = getApp().globalData.showTabBar;
	//顶部title
	const title = ref('');
	const updataTime = ref('');

	//视频id
	const id = ref(null);

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

	let start = false;
	//普通视频定时
	function onVideoTimeUpdate(e) {
		if (advReward.value.status == 0 || !advReward.value.status) {
			count++;
		}
		//
		if (Math.floor(e.detail.currentTime) == 0) {
			start = true;
			console.log(start, 'start');
		}
		//
		if (count == 0 && (getApp().globalData.playNum) % advReward.value.every == 0 && getApp().globalData.playNum != 0 &&
			start) {
			console.log(getApp().globalData.playNum, 'playNum');
			if (e.detail.currentTime > advReward.value.time) {
				videoContent.value.pause();
				agreePlay.value = false;
				start = false;
			}
			if (!agreePlay.value) {
				//显示弹出框
				popupVisible.value = true;
			}
		}
	}
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
				console.log('onLoad event emit');
			})
			rewardAdv.value.onError((err) => {
				console.log('onError event emit', err);
				agreePlay.value = true;
				console.log('下发奖励');
				console.log('播放');
				if (videoContent.value) {
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
					console.log('下发奖励');
					console.log('播放');
					if (videoContent.value) {
						videoContent.value.play();
					}
					count++;
				} else {}
			})
		}
	}
	//显示激励广告
	function showReward() {
		rewardAdv.value.show().catch(() => {
			console.log('load');
			rewardAdv.value.load().then(() => rewardAdv.value.show()).catch(err => {
				console.log('激励视频广告显示失败');
				agreePlay.value = true;
				if (videoContent.value) {
					videoContent.value.play();
				}
				count++;
			})
		})
	}
	//引导gif图
	const showYinDao = ref(false);
	//取消
	function cancelPop() {
		popupVisible.value = false;
		pop2.value = true;
		showYinDao.value = false;
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
		if (nextId.value != 0) {
			nextVideo();
		}
	}
	//点击播放三角
	function playVideo() {
		if (agreePlay.value) {} else {
			videoContent.value.pause();
			popupVisible.value = true;
		}
	}

	//判断前贴广告是否存在判断是否隐藏底部广告
	const advRefresh = ref(false);

	function onAdplay(e) {
		console.log('onAdplay', e)
		if (e.detail.type == "begin") {
			advRefresh.value = false;
		}
		if (e.detail.type == "end") {
			advRefresh.value = true;
			console.log(advRefresh.value, 'end');
		}
	}

	function onAdload(e) {
		console.log('onAdload', e)
	}

	function onAdclose(e) {
		console.log('onAdclose', e)
		advRefresh.value = true;
		console.log(advRefresh.value, 'close');
	}

	function onAderror(e) {
		console.log('onAdError', e)
		advRefresh.value = true;
		console.log(advRefresh.value, 'error');
	}

	const current = ref(0);
	const nextId = ref(null);
	const beforeId = ref(null);
	const tentId = ref(null);
	const loop = ref(0);
	const isSlid = ref(false);
	//返回数据处理
	function returnData(data) {
		console.log(data, 'mess');
		//上条视频的id
		nextId.value = data.nextId;
		//首页内容结束
		if (data.nextId == 0) {
			end.value = true;
		}
		//上条视频的id
		beforeId.value = data.prevId;
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
		// if (beforeId.value != 0) {
		current.value = 1;
		// } else {
		// current.value = 1;
		// }

		//todo,解析
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
					console.log(e, 'http');
				},
				fail(error) {},
				complete() {}
			})
		} else {
			tentId.value = null;
		}
	}
	//判断首页的内容结束
	const end = ref(false);
	//获取视频信息
	function f_getVideoInfo(o) {
		start = false;
		getApp().globalData.playNum++;
		console.log(getApp().globalData.playNum, 'playNum');
		if (from.value == "home" && !end.value) {
			if(o.id!=0){
			videoInfoHome({
				id: o.id,
				cateId: cateId.value
			}).then(data => {
				returnData(data);
			})
			}
		} else {
			console.log('noHome');
			videoInfo(o).then(data => {
				returnData(data);
				//上条视频的id
				// nextId.value = data.nextId;
				// //下条视频的id
				// beforeId.value = data.prevId;
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
				// if (beforeId.value != 0) {
				// 	current.value = 1;
				// } else {
				// 	current.value = 0;
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
				// 			console.log(e, 'http');
				// 		},
				// 		fail(error) {},
				// 		complete() {}
				// 	})
				// } else {
				// 	tentId.value = null;
				// }
			});
		}
	}

	const advS = ref({
		status: null,
		advId: null,
		finish: false,
	})
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
		firstNow: false
	});
	
	const advList = ref([]);
	//广告
	function f_getAdv(o) {
		Adv(o).then(res => {
			let typeT = null;
			let typeB = null;
			res.advertPlaceConfigs.forEach(element => {});
			res.advertTypes.forEach(element => {
				//底部广告
				if (element.type == 6 || element.type == 7 || element.type == 8) {
					advList.value.push(element.content.trim());
				}
				if (advList.value.length > 0) {
					let n = Math.floor(Math.random() * advList.value.length);
					advB.value.advId = advList.value[n];
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

	function closeYinDao() {
		showYinDao.value = false;
	}
	const backId = ref(null);
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
							console.log(element, 'ele');
							let shareTabBarId = element.id;
							const info = 'path=/pages_details/video_details/video_details' +
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
		from.value = res.from;
		cateId.value = res.cateId;
		console.log(res, 'res');
		// const info = 'path=/pages_details/video_details/video_details' +
		// 	'&type=noTabBar' +
		// 	'&share=true' +
		// 	'&backPage=/pages/video/video' +
		// 	'&id=' +
		// 	res.id+"&can=true";
		// + '&tabBarId=' + res.tabBarId
		//无配置分享
		// if(!res.can){
		// 	share(info);
		// }

		if (getApp().globalData.firstPage) {
			advC.value.firstNow = true;
			getApp().globalData.firstPage = false;
		}
		backId.value = res.tabBarId;
		console.log(backId.value, 'bac');
		isFromShare.value = res.share;
		backPage.value = res.backPage || '/pages/video/video';
		id.value = res.id - 0;
		f_getVideoInfo({
			id: id.value,
			appId: appId.value,
		});
	});
	onShow(() => {
		f_getAdv({
			appId: appId.value,
		})
		wx.hideShareMenu({
			menus: ['shareTimeline']
		})
		if (getApp().globalData.isFirst == 0) {
			getApp().globalData.isFirst++;
			showYinDao.value = true;
		}
		if (advC.value.interstitialAd) {
			console.log(1);
			//todo
			showAdv(advC.value);
		}
	});
	onHide(() => {
		clearTimer();
		// clearInterval(timer.value);
		// interstitialAd = null;
		rewardAdv.value = null;
	});
	onUnload(() => {
		clearTimer();
		// clearInterval(timer.value);
		// interstitialAd = null;
		rewardAdv.value = null;
		getApp().globalData.playNum = 0;
	});
	onMounted(() => {

	});

	//滚动距离顶部距离
	const scrollTop = ref(null);
	const oldScrollTop = ref(null);
	//监听滚动
	function f_scroll(e) {
		oldScrollTop.value = e.detail.scrollTop;
	}

	//点击下一条视频按钮
	function nextVideo() {
		advRefresh.value = false;
		if (nextId.value != 0 || end.value == true) {
			f_getVideoInfo({
				id: nextId.value,
				appId: appId.value,
			});
			//触发了两次请求，playNum 加了两次
			getApp().globalData.playNum--;
			current.value = 2;
			let t = setTimeout(() => {
				current.value = 1;
				clearTimeout(t);
			}, 100)
			//回滚到顶部,上滑时广告存在
			scrollTop.value = oldScrollTop.value;
			let tim = setTimeout(() => {
				scrollTop.value = 0;
				popupVisible.value = false;
				agreePlay.value = true;
				count = 0;
				clearTimeout(tim);
			}, 100);
		} else {
			uni.showToast({
				title: "已是最后一条视频",
				duration: 2000,
				icon: 'none'
			})
		}
		//底部广告
		if (advList.value.length > 0) {
			let n = Math.floor(Math.random() * advList.value.length);
			advB.value.advId = advList.value[n];
		}
	}
	let a = true;
	//滑动播放上一个或下一个视频
	function next1(e) {
		if (advList.value.length > 0) {
			let n = Math.floor(Math.random() * advList.value.length);
			advB.value.advId = advList.value[n];
		}
		advRefresh.value = false;
		console.log(advRefresh.value, '广告');
		advS.value.finish = false;
		advS.value.finish = true;
		//下滑
		if (e.detail.current == 0) {
			console.log('上');
			f_getVideoInfo({
				id: beforeId.value,
				appId: appId.value,
			});
			current.value = 0;
			let t = setTimeout(() => {
				current.value = 1;
				clearTimeout(t);
			}, 100)
		}

		//上滑
		if (e.detail.current == 2) {
			isSlid.value = true;
			console.log('下');
			f_getVideoInfo({
				id: nextId.value,
				appId: appId.value,
			});
			current.value = 2;
			let t = setTimeout(() => {
				current.value = 1;
				clearTimeout(t);
			}, 100);
			// 回滚到顶部
			scrollTop.value = oldScrollTop.value;
			let tim = setTimeout(() => {
				scrollTop.value = 0;
				clearTimeout(tim);
			}, 100);
		}
		let t1 = setTimeout(() => {
			//重置激励广告和弹出框状态
			popupVisible.value = false;
			agreePlay.value = true;
			count = 0;
			clearTimeout(t1);
		}, 200);
	}
	//////////////
	// function next(e) {
	// 	console.log('gungdong');
	// 	if (advList.value.length > 0) {
	// 		let n = Math.floor(Math.random() * advList.value.length);
	// 		advB.value.advId = advList.value[n];
	// 	}

	// 	advRefresh.value = false;
	// 	console.log(advRefresh.value, '广告');
	// 	advS.value.finish = false;
	// 	advS.value.finish = true;
	// 	//下滑
	// 	if (e.detail.current == 0 && beforeId.value != 0) {
	// 		console.log('上上');
	// 		f_getVideoInfo({
	// 			id: beforeId.value,
	// 			appId: appId.value,
	// 		});
	// 		current.value = 0;
	// 		let t = setTimeout(() => {
	// 			console.log(beforeId.value, 'before');
	// 			if (beforeId.value != 0) {
	// 				current.value = 1;
	// 			}
	// 			clearTimeout(t);
	// 		}, 100)
	// 	}
	// 	//上滑
	// 	if ((e.detail.current == 2 && nextId.value != 0 && a) || (beforeId.value == 0 && e.detail.current == 1) || (nextId.value == 0 && e.detail.current == 2)) {
	// 		isSlid.value = true;
	// 		console.log("下下");
	// 		a = false;
	// 		f_getVideoInfo({
	// 			id: nextId.value,
	// 			appId: appId.value,
	// 		});
	// 		current.value = 2;
	// 		let t = setTimeout(() => {
	// 			current.value = 1;
	// 			clearTimeout(t);
	// 		}, 100)
	// 		// 回滚到顶部
	// 		scrollTop.value = oldScrollTop.value;
	// 		let tim = setTimeout(() => {
	// 			scrollTop.value = 0;
	// 			clearTimeout(tim);
	// 			let t = setTimeout(()=>{
	// 				a = true;
	// 				clearTimeout(t)
	// 			},200)
	// 		}, 100);
	// 	}
	// 	let t1 = setTimeout(() => {
	// 		//重置激励广告和弹出框状态
	// 		popupVisible.value = false;
	// 		agreePlay.value = true;
	// 		count = 0;
	// 		clearTimeout(t1);
	// 	}, 200);
	// }

	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: title.value,
			path: '/pages/index/index?' + 'path=/pages_details/video_details/video_details' + '&type=noTabBar' +
				'&share=true' + '&backPage=/pages/video/video' + '&id=' + id.value + "&can=true" + "&tabBarId=" +
				backId.value,
		};
	});

	// onShareAppMessage(() => {
	// 		return {
	// 			title: title.value,
	// 			path: '/pages_details/video_details/video_details' + '?id=' + id.value
	// 		};
	// 	});
	// 分享到朋友圈;
	// onShareTimeline(() => {
	// 	return {
	// 		: '朋友圈',
	// 		qury:
	// 			'/pages/index/index?' +
	// 			'path=/pages_details/video_details/video_details' +
	// 			'&sign=false' +
	// 			'&type=noTabBar' +
	// 			'&share=true' +
	// 			'&backPage=/pages/video/video' +
	// 			'&id=' +
	// 			id.value+
	// 			'&vid='+vid.value+
	// 			'&videoSrc='+videoSrc.value,
	// 	};
	// });
</script>

<style lang="scss">
	button::after {
		border: 0;
	}

	.btn:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>