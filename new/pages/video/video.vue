<template>
	<view class="level1">
		<view class="" style="position: fixed;top:0;"><ax-topNav :name="topTitle"></ax-topNav></view>
		<view class="main" style="overflow: hidden;display: flex;flex-direction: column;" :style="{'margin-top':topH,'margin-bottom':bottomH}">
			<!-- 搜索框 -->
			<view class="" style="padding:10rpx;">
				<t-search :value="search" placeholder="请输入搜索内容/关键字" shape="round" @change="f_search($event)"
					@clear="f_clear" style="width:100%;" />
			</view>
			<!-- 分类选项 -->
			<view class="" style="width:100vw;background-color: gray;">
				<view class="" style="background-color: white;">
					<view class="scroll" style="display: flex;height:100%;align-items: center;overflow: auto;font-size:34rpx;font-weight:700;">
						<view class="" style="padding:14rpx 0 14rpx 40rpx;" @click="f_changeSelect({ id: -1 })">
							<text style="white-space: nowrap;padding: 4rpx 14rpx;box-sizing: border-box;"
								:class="{ topActive: select == -1 }">全部</text>
						</view>
						<view class="" v-for="(item, index) in navList" :key="index" @click="f_changeSelect(item)"
							style="padding:8rpx 20rpx;">
							<text style="white-space: nowrap;padding: 4rpx 14rpx;box-sizing: border-box;"
								:class="{ topActive: item.id == select }">{{ item.title }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="scroll"
				style="flex:1;overflow: auto;background-color: #fff;display: flex;flex-direction: column;">
				<scroll-view class="" scroll-y="true" style="flex:1;overflow: auto;" @scrolltolower="f_touchBottom">
					<view class="" v-for="(item, index) in list" :key="index">
						<view @click="f_go(item)"
							style="height:428rpx; background-color: white;margin:10rpx 20rpx 10rpx 20rpx;padding:10rpx;border-radius: 10rpx;">
							<view class="" style="display: flex;flex-direction: column;height:100%;">
								<view class="" style="flex:1;position:relative;">
									<t-image :src="'https://xcx.wujingchuanmei.com/api' + item.icon" mode="aspectFill"
										shape="round" aria-label="img"
										style="width:100%;height:100%;" />
									<view class="" style="position:absolute;z-index:30;bottom:18rpx;right:20rpx;">
										<text
											style="color:white;font-size: 26rpx;background-color: rgba(0,0,0,0.9);padding:4rpx 8rpx;border-radius:10rpx;">视频</text>
									</view>
									<view class=""
										style="position:absolute;z-index:10;top:50%;transform: translateY(-50%);display: flex;justify-content: center;width:100%;">
										<view class=""
											style="background-color: rgba(0, 0, 0, 0.6);height:100rpx;width:100rpx;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
											<view class=""
												style="border:40rpx solid white;width:0;border-top:30rpx solid transparent;border-right:0;border-bottom:30rpx solid transparent;transform: translateX(20%);">
											</view>
										</view>
									</view>
								</view>
								<view class="" style="">
									<view class=""
										style="display:flex;align-items:center;padding-top:10rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;word-break: break-all;margin-bottom: 8rpx;">
										<text style="font-size: 36rpx;">{{ item.title }}</text>
									</view>
								</view>
							</view>
						</view>
						<ad v-if="adv.status == 1 && adv.advId && adv.every != 0 && index != 0 && (index + 1) % adv.every == 0 && adv.type == 1"
							:unit-id="adv.advId"></ad>
						<ad v-if="adv.status == 1 && adv.advId && adv.every != 0 && index != 0 && (index + 1) % adv.every == 0 && adv.type == 3"
							ad-type="video" ad-theme="white" :unit-id="adv.advId"></ad>
					</view>
					<view class=""><t-divider dashed content="已无更多数据" /></view>
				</scroll-view>
			</view>
		</view>
		<view class="tabBar" style="position: fixed;bottom: 0;z-index:10;" v-if="showTabBar"><ax-tabBar :id="tabBarId"
				@setTabBarId="getTabBarId"></ax-tabBar>
		</view>
		<ax-Flash v-if="showFlash"></ax-Flash>
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
		Adv,
		videoList,
		getVideoItems,
		getTabBarList,
	} from '../../utils/api.js';
	import {
		createAdv,
		clearTimer,
		showAdv,
	} from '../../utils/adv.js';
	import {
		ref,
		inject,
		onMounted,
		nextTick
	} from 'vue';
	import {
		onLoad,
		onShow,
		onHide,
		onUnload,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {share} from "../../utils/share.js"
	const appId = inject('appId');
	let tabBarId = ref(null);
	const showTabBar = getApp().globalData.showTabBar;

	function getTabBarId(item) {
		tabBarId.value = getApp().globalData.tabBarId;
		f_getPage({
			appId: appId.value
		});
	}

	const navList = ref([]);
	let select = ref(-1);

	const list = ref([]);
	const page = ref(1);
	//视频请求对象
	const newsObject = ref({
		appId: appId.value,
		page: page.value,
		type: null,
	});
	const buttom = ref(false);
	const refresh = ref(true);
	//获取视频列表
	function f_getVideoList(o) {
		videoList(o).then(data => {
			if (data.videoList.length > 0) {
				data.videoList.forEach(item => {
					item.icon = item.icon.split(',')[0];
				});
			}
			//
			if (data.videoList.length < 1) {
				refresh.value = false;
			}
			//触底获取到的新数据采取拼接
			if (buttom.value) {
				list.value = list.value.concat(data.videoList);
				buttom.value = false;
			} else {
				list.value = data.videoList;
			}

		});
	}
	//顶部分类
	function f_getItems(o) {
		getVideoItems(o).then(res => {
			navList.value = res.xcxVideoTypeList;
		});
	}
	const search = ref("");
	//选择nav
	function f_changeSelect(item) {
		select.value = item.id;
		if (item.id == -1) {
			newsObject.value.type = null;
		} else {
			newsObject.value.type = item.id;
		}
		newsObject.value.title = search.value;
		refresh.value = true;
		page.value = 1;
		f_getVideoList(newsObject.value);
	}
	//顶部搜索
	function f_search(e) {
		page.value = 1;
		search.value = e.detail.value;
		const title = e.detail.value;
		f_getVideoList({
			appId: appId.value,
			page: page.value,
			title: title,
			type: newsObject.value.type,
		});
	}
	//清除搜索内容
	function f_clear() {
		search.value = '';
		newsObject.value.title = '';
		refresh.value = true;
		page.value = 1;
		f_getVideoList(newsObject.value);
	}
	//todo
	//顶部标题,导航id
	const topTitle = ref(null);
	const showFlash = ref(false);
	const videoInfoType = ref(false);

	function f_getPage(o) {
		//获取tabBar列表
		getTabBarList(o).then((data) => {
			data.xcxPageList.forEach((element) => {
				//多个的时候只过滤一个
				if (element.pageType == "2" && element.id == tabBarId.value) {
					showFlash.value = element.xcxPage.isShow=='0'?false:true;
					topTitle.value = element.xcxPage.siteTitle;
					tabBarId.value = element.id;
					
				}
				//不会有多个视频页有不同的详情页
				if(element.pageType == "2"){
					//视频详情页类型判断
					if (element.xcxPage.adConfig == '1') { //单页
						videoInfoType.value = false;
					} else if (element.xcxPage.adConfig == '2') { //滑动
						videoInfoType.value = true;
					}
				}
			})
		})
	}
	const adv = ref({
		status: null,
		every: null,
		advId: null,
		type: null,
	});
	//全局广告
	const advC = ref({
		status: null,
		advId: null,
		intervalNum: null,
		interstitialAd: null,
		firstNow:false
	});
	// const timer = ref(null);
	// let interstitialAd = null;

	// function showAdv1() {
	// 	interstitialAd
	// 		.show()
	// 		.then(() => {
	// 			console.log('插屏广告显示中，不再定时拉取广告');
	// 		})
	// 		.catch(err => {
	// 			console.error(err);
	// 		});
	// }

	// const createAdv1 = function() {
	// 	if (wx.createInterstitialAd) {
	// 		interstitialAd = wx.createInterstitialAd({
	// 			adUnitId: advC.value.advId,
	// 		});
	// 		interstitialAd.onLoad(() => {
	// 			console.log('onLoad event emit');
	// 		});
	// 		interstitialAd.onError(err => {
	// 			console.log('onError event emit', err);
	// 		});
	// 		interstitialAd.onClose(res => {
	// 			console.log('onClose event emit', res);
	// 		});
	// 		timer.value = setInterval(() => {
	// 			showAdv1();
	// 		}, advC.value.intervalNum * 1000);
	// 	}
	// };
	//广告
	function f_getAdv(o) {
		Adv(o).then(res => {
			let type = null;
			res.advertPlaceConfigs.forEach(element => {
				if (element.title == 'config_vid') {
					type = element.advertTypeId;
					adv.value.status = element.status;
					adv.value.every = element.acticleCnt;
					adv.value.type = element.advertTypeId;
				}
			});
			res.advertTypes.forEach(element => {
				if (type == element.type) {
					adv.value.advId = element.content.trim();
				}
				if (element.type == 2) {
					advC.value.status = element.status;
					advC.value.advId = element.content.trim();
					advC.value.intervalNum = element.intervalNum;
				}
			});
			if (advC.value.status) {
				console.log(advC.value);
				//todo
				// createAdv1(); 
				createAdv(advC.value);
			}
		});
	}
	onShow(() => {
		uni.hideTabBar({animation:false})
		wx.hideShareMenu({
			menus: ['shareTimeline'],
		});
		f_getAdv({
			appId: appId.value,
		});
		tabBarId.value = getApp().globalData.tabBarId;
		f_getPage({
			appId: appId.value
		});
		if(advC.value.interstitialAd){
			//todo
			showAdv(advC.value);
		}
	});
	onHide(() => {
		clearTimer();
	});
	onUnload(() => {
		clearTimer();
	});
	const topH = ref(null);
	const bottomH =ref(null);
	onLoad(res => {
		topH.value = getApp().globalData.top;
		bottomH.value = getApp().globalData.bottom;
		let rre='';
		try{
			const re = getApp().globalData.options.replace(/\&/g,'","').replace(/\=/g,'":"');
			rre = JSON.parse('{"'+re+'"}');
		}catch(err){}
		if (!rre.can) {
			getTabBarList({
				appId: appId.value
			}).then((data) => {
				console.log('arti');
				try {
					data.xcxPageList.forEach((element) => {
						if (element.pageType == "2") {
							let shareTabBarId = element.id;
							console.log(element, 'ele');
							const info = 'path=/pages/video/video' +
								'&type=tabBar' +
								'&share=true' + "&can=true" + "&tabBarId=" + shareTabBarId;
							share(info);
							throw new Error();
						}
					})
				} catch (e) {
				}
			})
		}
		
		if(getApp().globalData.firstPage){
			advC.value.firstNow = true;
			getApp().globalData.firstPage = false;
		}
		f_getItems({
			appId: appId.value,
		});
		f_getPage({
			appId: appId.value
		});
		f_getVideoList(newsObject.value);
	});
	//跳视频详情
	function f_go(item) {
		console.log(videoInfoType.value,'12');
		if (videoInfoType.value) {
			uni.navigateTo({
				url: '/pages_details/video_details/video_details' + '?id=' + item.id +"&can=true"+"&tabBarId="+tabBarId.value
				// + '&tabBarId=' + tabBarId					.value,
			});
		} else {
			uni.navigateTo({
				url: '/pages_details/videoDetails/videoDetails' + '?id=' + item.id +"&can=true"+"&tabBarId="+tabBarId.value
				// + '&tabBarId=' + tabBarId.value,
			});
		}
	}

	//滚动触底
	function f_touchBottom(e) {
		if (refresh.value) {
			buttom.value = true;
			page.value += 1;
			f_getVideoList({
				appId: appId.value,
				page: page.value,
				type: newsObject.value.type,
				title: search.value,
			});
		}
	}
	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: topTitle.value,
			path: '/pages/index/index?' + 'path=/pages/video/video' + "&tabBarId="+getApp().globalData.tabBarId
			// + '&type=tabBar' + '&share=true' + '&id=' +				newsObject.value.type,
		};
	});
	// onShareAppMessage(() => {
	// 	return {
	// 		title: topTitle.value,
	// 		path: '/pages/video/video'
	// 		// + '&type=tabBar' + '&share=true' + '&id=' +				newsObject.value.type,
	// 	};
	// });
	//分享到朋友圈
	// onShareTimeline(() => {
	// 	return {
	// 		title: '',
	// 		qury: '/pages/index/index?' + 'path=/pages/video/video' + '&sign=false' + '&type=tabBar' + '&share=true'+'&id='+newsObject.value.type,
	// 	};
	// });
</script>
<style lang="scss">
	.topActive {
		color: red;
		font-weight: 700;
		// background-color: #e3e3e3;
		padding: 8rpx;
		border-bottom:2px solid red;
		// border-radius: 20rpx;
		transform: scale(1.2);
	}

	.scroll::-webkit-scrollbar {
		display: none;
	}
</style>