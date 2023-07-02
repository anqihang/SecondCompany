<template>
	<view class="level1" style="align-items: center;">
		<view class="" style="position: fixed;top:0;z-index:10;"><ax-topNav :name="title" :back="true" :isShare="isFromShare"
				:backId="backId" :backPage="backPage"></ax-topNav></view>
		<view id="main" class="main" style="display: flex;flex-direction: column;position: relative" :style="{'margin-top':topH,'margin-bottom':bottomH}">
			<view class="" style="margin:0 10rpx;flex:1;overflow: auto;">
				<scroll-view class="scroll" :scroll-top="scrollTop" style="height:100%;" scroll-y="true"
					@scroll="f_scroll">
					<ad v-if="advT.status == 1 && advT.advId && advT.type == 3" ad-type="video" ad-theme="white"
						:unit-id="advT.advId"></ad>
					<ad v-if="advT.status == 1 && advT.advId && advT.type == 1" :unit-id="advT.advId"></ad>
					<view class=""
						style="flex:1;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;word-break: break-all;margin-bottom: 8rpx;margin:20rpx 10rpx;">
						<text style="font-size: 36rpx;">{{ title }}</text>
					</view>
					<view class="" style="color:#d8d8d8;font-size: 26rpx;margin: 20rpx 10rpx;">{{ updataTime }}</view>
					<view class="" style="overflow: hidden;transition:all 0.4s;"
						:style="{ height: showAll ? 'unset' : '500rpx', 'box-shadow': !showAll ? '0 4rpx 2rpx 1rpx #fcfcfc' : 'unset' }">
						<view id="html" class="" v-html="content" style="width:100%;">

						</view>
						<view class="" style="display: flex;margin-top:50rpx;padding-bottom:30rpx;">
							<view class="" style="margin-right:20rpx;"><text>阅读</text></view>
							<view class="" style="margin-right:20rpx;">
								<text style="color:darkgray">{{ num.read }}</text>
							</view>
							<view class="" @click="f_up"><t-icon name="thumb-up" size="40rpx"
									:style="{ color: isLike ? 'red' : '' }" /></view>
							<view class="" style="margin-left:20rpx;">
								<text style="color:darkgray">{{ num.like }}</text>
							</view>
						</view>
					</view>
					<view class="" v-if="!showAll"
						style="display: flex;justify-content: center;padding:30rpx 0 30rpx 0;">
						<view class="" @click="f_showAll"
							style="padding:10rpx 20rpx;border-radius: 30rpx;color:white;background-color: red;">
							<text>点击阅读原文</text>
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
					<ad v-if="advB.status == 1 && advB.advId && advB.type == 3" ad-type="video" ad-theme="white"
						:unit-id="advB.advId"></ad>
					<ad v-if="advB.status == 1 && advB.advId && advB.type == 1" :unit-id="advB.advId"></ad>
					<view v-if="suggestList.length>0" class="" style="margin: 0 0 20rpx 0;">
						<view class="" style="">
							<view class="" style="text-align: center;padding:20rpx 0;"><text
									style="color:red;">热门推荐</text>
							</view>
							<view class="" @click="f_refresh(item)" style="margin-top:20rpx;"
								v-for="(item, index) in suggestList" :key="index">
								<view class=""
									style="display: flex;margin:0 10rpx;border-radius: 20rpx;padding:10rpx 0;">
									<view class=""
										style="flex:5;height:200rpx;padding:10rpx 20rpx;box-sizing: border-box;">
										<t-image :src="'https://xcx.wujingchuanmei.com/api' + item.picPath"
											mode="aspectFill" shape="round" aria-label="img"
											style="width:100%;height:100%;" />
									</view>
									<view class="" style="flex:6;padding-right:20rpx;">
										<text style="font-size:28rpx;">{{ item.title }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="tabBar" style="position: fixed;bottom: 0;z-index:10;" v-if="showTabBar"><ax-tabBar
				:id="backId"></ax-tabBar></view>
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
		newInfo,
		like,
		cancelLike,
		Adv,
		getTabBarList,
		newInfoHome
	} from '../../utils/api.js';
	import {
		createAdv,
		clearTimer,
		showAdv
	} from '../../utils/adv.js';
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
		onMounted,
		nextTick
	} from 'vue';
	import {
		get
	} from "/utils/request.js"
	import {
		share
	} from '../../utils/share.js';
	//系统类型
	const model = inject('model');
	const appId = inject('appId');
	const showTabBar = getApp().globalData.showTabBar;
	//顶部title
	const title = ref('');
	const updataTime = ref('');
	//富文本内容
	const content = ref('');
	//文章底部阅读点赞数
	const num = ref({
		read: 0,
		like: 0,
	});
	//文章id
	const id = ref(null);
	//获取文章信息
	function f_getNewInfo(o) {
		if(from.value == "home"){
			newInfoHome({id:o.id}).then(data => {
				title.value = data.article.title;
				updataTime.value = data.article.createTime;
				content.value = data.article.content;
				num.value.read = data.article.readCnt;
				num.value.like = data.article.likeCnt;
				isLike.value = data.article.liked;
				suggestList.value = data.recommends;
				//建议列表多张图片取第一张
				if (suggestList.length > 0) {
					suggestList.value.forEach(item => {
						if (item.picPath) {
							item.picPath = item.picPath.split(',')[0];
						}
					})
				}
			})
		}else{
		newInfo(o).then(data => {
			title.value = data.article.title;
			updataTime.value = data.article.createTime;
			content.value = data.article.content;
			num.value.read = data.article.readCnt;
			num.value.like = data.article.likeCnt;
			isLike.value = data.article.liked;
			suggestList.value = data.recommends;
			//建议列表多张图片取第一张
			if (suggestList.length > 0) {
				suggestList.value.forEach(item => {
					if (item.picPath) {
						item.picPath = item.picPath.split(',')[0];
					}
				})
			}
		})
		}
	}
	//是否点赞，控制颜色改变
	const isLike = ref(false);
	//推荐列表
	const suggestList = ref([]);
	//从分享进入
	const isFromShare = ref(false);
	const backPage = ref(null);
	//页面栈
	const pagesArr = ref(null);
	pagesArr.value = getCurrentPages();
	//from页的tabBarId
	const backId = ref(null);


	const advT = ref({
		status: null,
		every: null,
		advId: null,
		type: null,
	});
	const advB = ref({
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
	});
	//广告
	function f_getAdv(o) {
		Adv(o).then(res => {
			let typeT = null;
			let typeB = null;
			let typeC = null;
			res.advertPlaceConfigs.forEach(element => {
				if (element.title == 'top_adv') {
					typeT = element.advertTypeId;
					advT.value.status = element.status;
					advT.value.every = element.acticleCnt;
					advT.value.type = element.advertTypeId;
				}
				if (element.title == 'bottom_adv') {
					typeB = element.advertTypeId;
					advB.value.status = element.status;
					advB.value.every = element.acticleCnt;
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
				if (element.type == 2) {
					advC.value.status = element.status;
					advC.value.advId = element.content.trim();
					advC.value.intervalNum = element.intervalNum;
				}
			});
			if (advC.value.status) {
				//todo
				// createAdv1();
				createAdv(advC.value);
			}
		});
	}
	// let shareTabBarId;
	//获取页面配置
	//获取tabBar列表
	
	const from = ref('');
	const topH = ref(null);
	const bottomH =ref(null);
	//上页面传参
	onLoad(res => {
		topH.value = getApp().globalData.top;
		bottomH.value = getApp().globalData.bottom;
		from.value = res.from;
		console.log(res, 'res');
		if (!res.can) {
			getTabBarList({
				appId: appId.value
			}).then((data) => {
				try {
					data.xcxPageList.forEach((element) => {
						if (element.pageType == "3") {
							let shareTabBarId = element.id;
							console.log(element, 'ele');
							const info = 'path=/pages_details/article_details/article_details' +
								'&type=noTabBar' +
								'&share=true' +
								'&backPage=/pages/article/article' +
								'&id=' +
								res.id + "&can=true" + "&tabBarId=" + shareTabBarId;
							share(info);
							throw new Error();
						}
					})
				} catch (e) {
				}
			})
		}

		// const info = 'path=/pages_details/article_details/article_details' +
		// 	'&type=noTabBar' +
		// 	'&share=true' +
		// 	'&backPage=/pages/article/article' +
		// 	'&id=' +
		// 	res.id + "&can=true" + "&tabBarId=" + shareTabBarId;
		// 	// + '&tabBarId=' + res.tabBarId
		// //无配置分享
		// if(!res.can){
		// 	share(info);
		// }

		if (getApp().globalData.firstPage) {
			advC.value.firstNow = true;
			getApp().globalData.firstPage = false;
		}
		backId.value = res.tabBarId;
		if (res.share) {
			isFromShare.value = true;
		} else {
			isFromShare.value = false;
		}
		backPage.value = res.backPage || '/pages/article/article';
		id.value = res.id - 0;
		f_getNewInfo({
			id: id.value,
			appId: appId.value,
		});
	});
	onShow(() => {
		wx.hideShareMenu({
			menus: ['shareTimeline']
		})
		f_getAdv({
			appId: appId.value,
		})
		if (advC.value.interstitialAd) {
			//todo
			showAdv(advC.value);
		}
	});
	onHide(() => {
		clearTimer();
		// clearInterval(timer.value)
		// interstitialAd = null;
	});
	onUnload(() => {
		clearTimer();
		// clearInterval(timer.value)
		// interstitialAd = null;
	});
	onMounted(() => {

	});
	//点赞接口
	function f_like(o) {
		like(o).then(data => {
			if (data.code == 200) {
				isLike.value = true;
			}
		});
	}
	//取消点赞接口
	function f_cancelLike(o) {
		cancelLike(o).then(data => {
			if (data.code == 200) {
				isLike.value = false;
			}
		});
	}
	//点赞
	function f_up() {
		if (isLike.value) {
			f_cancelLike({
				id: id.value,
				appId: appId.value,
			});
			num.value.like -= 1;
		} else {
			f_like({
				id: id.value,
				appId: appId.value,
			});
			num.value.like += 1;
		}
	}
	const showAll = ref(false);

	function f_showAll() {
		showAll.value = true;
	}
	const scrollTop = ref(null);
	const oldScrollTop = ref(null);

	function f_scroll(e) {
		oldScrollTop.value = e.detail.scrollTop;
	}
	//推荐刷新
	function f_refresh(item) {
		f_getNewInfo({
			id: item.id,
			appId: appId.value,
		});
		scrollTop.value = oldScrollTop.value;
		let timer = setTimeout(() => {
			scrollTop.value = 0;
			clearTimeout(timer);
		}, 100);
	}
	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: title.value,
			path: '/pages/index/index?' +
				'path=/pages_details/article_details/article_details' +
				'&type=noTabBar' +
				'&share=true' +
				'&backPage=/pages/article/article' +
				'&id=' +
				id.value + '&tabBarId=' + backId.value+"&can=true",
		};
	});
	// onShareAppMessage(() => {
	// 	return {
	// 		title: title.value,
	// 		path: '/pages_details/article_details/article_details?' +
	// 			'id=' +
	// 			id.value
	// 	};
	// });
	// 分享到朋友圈;
	// onShareTimeline(() => {
	// 	return {
	// 		title: '朋友圈',
	// 		qury:
	// 			'/pages/index/index?' +
	// 			'path=/pages_details/article_details/article_details' +
	// 			'&sign=false' +
	// 			'&type=noTabBar' +
	// 			'&share=true' +
	// 			'&backPage=/pages/article/article' +
	// 			'&id=' +
	// 			id.value,
	// 	};
	// });
</script>

<style lang="scss">
	button::after {
		border: 0;
	}
</style>