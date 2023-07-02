<template>
	<view class="level1">
		<view class="" style="position: fixed;top:0;"><ax-topNav  :name="topTitle"></ax-topNav></view>
		<!-- name="分类" -->
		<view class="main" style="padding: 0 20rpx;" :style="{'margin-top':topH,'margin-bottom':bottomH}">
			<view class="search" style="padding:16rpx 0;">
				<t-search :value="search" placeholder="请输入搜索内容/关键字" shape="round" @blur="f_search($event)"
					style="width:100%;" />
				<!-- <input type="text" name="" id="" v-model="search" @input="f_search"> -->
			</view>
			<view class="" style="padding:16rpx;"><text>搜索热点</text></view>
			<view class="" style="width:100%;display: flex;flex-wrap: wrap;">
				<view v-for="(item, index) in categoryList" :key="index"
					style="width:50%;padding:10rpx 0;margin:10rpx 0;" @click="f_goSearchList(item)">
					<view class="" style="display: flex;">
						<view
							style="width:50rpx;aspect-ratio: 1 / 1;background-color: #fff;text-align: center;line-height: 50rpx;background-color: red;color:white;border-radius: 10rpx;;">
							{{ index + 1 }}
						</view>
						<view style="margin-left:10rpx;">{{ item.title }}</view>
					</view>
				</view>
				<view class="" style="width:100%;"><t-divider dashed content="已无更多数据" /></view>
			</view>
		</view>
		<view class="tabBar" style="position: fixed;bottom: 0;z-index:10;" v-if="showTabBar"><ax-tabBar :id="tabBarId"
				@setTabBarId="getTabBarId"></ax-tabBar></view>
				<!-- name="美文分类" -->
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
		categoryItems,
		Adv,
		getTabBarList,
	} from '../../utils/api.js';
	import {
		createAdv,
		clearTimer,
		showAdv,
	} from "../../utils/adv.js";
	import {
		onMounted,
		ref,
		inject,
	} from 'vue';
	import {
		onLoad,
		onShow,
		onHide,
		onUnload,
		onShareAppMessage,
	} from '@dcloudio/uni-app';
	import {share} from "/utils/share.js"
	const appId = inject('appId');
	const showTabBar = getApp().globalData.showTabBar;
	let tabBarId = ref(null);

	function getTabBarId(item) {
		tabBarId.value = getApp().globalData.tabBarId;
		f_getPage({
			appId: appId.value
		});
	}
	//搜索内容
	const search = ref('');
	const categoryList = ref([]);

	function f_getCategoryItems(o) {
		categoryItems(o).then(data => {
			categoryList.value = data.articleCateList;
		});
	}
	//顶部标题
	const topTitle = ref(null);
	function f_getPage(o) {
		//获取tabBar列表
		getTabBarList(o).then((data) => {
			data.xcxPageList.forEach((element) => {
				if (element.pageType == "4" && element.id == tabBarId.value) {
					topTitle.value = element.xcxPage.siteTitle;
				}
			})
		})
	}
	//全局广告插屏广告
	const advC = ref({
		status: null,
		advId: null,
		intervalNum: null,
		interstitialAd:null,
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
	// 			console.log('插屏广告已关闭，重新开始定时拉取');
	// 			timer.value = setInterval(() => {
	// 				showAdv1();
	// 			}, advC.value.intervalNum * 1000);
	// 			console.log('onClose event emit', res);
	// 		});
			
	// 		timer.value = setInterval(() => {
	// 			showAdv1();
	// 			clearInterval(timer.value);
	// 		}, advC.value.intervalNum * 1000);
	// 	}
	// }
	//获取广告
	function getAdv() {
		Adv({
			appId: appId.value,
		}).then(res => {
			res.advertPlaceConfigs.forEach(element => {
			});
			res.advertTypes.forEach(element => {
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
	onShow(() => {
		uni.hideTabBar({
			animation: false,
		});
		wx.hideShareMenu({
			menus: ['shareTimeline']
		})
		getAdv({
			appId: appId.value,
		});
		tabBarId.value = getApp().globalData.tabBarId;
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
	onLoad((res) => {
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
						if (element.pageType == "4") {
							let shareTabBarId = element.id;
							console.log(element, 'ele');
							const info = 'path=/pages/category/category' +
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
		f_getCategoryItems({
			appId: appId.value,
		});
		f_getPage({
			appId: appId.value
		});
	});
	//根据分类跳转
	function f_goSearchList(item) {
		uni.navigateTo({
			url: '/pages_details/SearchList/SearchList' + '?name=' + item.title + '&id=' + item.id + '&typeId=' +
				item.type,
		});
	}
	//根据搜索跳转
	function f_search(e) {
		search.value = e.detail.value;
		uni.navigateTo({
			url: '/pages_details/SearchList/SearchList' + '?name=' + '' + '&id=' + null + '&search=' + search
				.value,
		});
	}
	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: topTitle.value,
			path: '/pages/index/index?' + 'path=/pages/category/category' +"&tabBarId="+getApp().globalData.tabBarId,
			// + '&type=tabBar' + '&share=true',
		};
	});
	// onShareAppMessage(() => {
	// 	return {
	// 		title: topTitle.value,
	// 		path: '/pages/category/category' ,
	// 		// + '&type=tabBar' + '&share=true',
	// 	};
	// });
	//分享到朋友圈
	// onShareTimeline(() => {
	// 	return {
	// 		title: '',
	// 		qury: '/pages/index/index?' + 'path=/pages/category/category' + '&sign=false' + '&type=tabBar' + '&share=true',
	// 	};
	// });
</script>

<style lang="scss"></style>