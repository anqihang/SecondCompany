<template>
	<view class="level1">
		<view class="" style="position: fixed;top:0;"><ax-topNav :name="topTitle"></ax-topNav></view>
		<view class="main" style="overflow: hidden;display: flex;flex-direction: column;" :style="{'margin-top':topH,'margin-bottom':bottomH}">
			<!-- 搜索框 -->
			<view class="" style="padding:10rpx;">
				<t-search :value="search" placeholder="请输入搜索内容/关键字" shape="round" @change="f_search($event)"
					@clear="f_clear" style="width:100%;" />
			</view>
			<view class="" style="width:100vw;background-color: gray;">
				<view class="" style="background-color: white;">
					<view class="scroll" style="display: flex;height:100%;align-items: center;overflow: auto;font-size:34rpx;font-weight:700">
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
							style="height:266rpx; background-color: white;margin:10rpx 20rpx 10rpx 20rpx;padding:10rpx;"
							:style="{'height':BS?'266rpx':'428rpx','border-bottom':BS?'1px solid #d8d8d8':''}">
							<view v-if="BS" class="" style="display: flex;">
								<view class=""
									style="flex:7;display: flex;flex-direction: column;justify-content: space-between;">
									<view class="" style="flex:1;overflow: hidden;margin-bottom: 8rpx;">
										<text
											style="font-size: 36rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;line-clamp: 3;-webkit-box-orient: vertical;word-break: break-all;">
											{{ item.title }}
										</text>
									</view>
									<view class=""
										style="font-size: 26rpx;padding:10rpx 0;color:darkgray;height:34rpx;">
										<text>{{ item.createTime }}</text>
									</view>
								</view>
								<view class=""
									style="flex:5;background-color: white;margin-left:40rpx;padding:10rpx;height:246rpx;">
									<t-image :src="'https://xcx.wujingchuanmei.com/api' + item.picPath"
										mode="aspectFill" width="72" height="72" shape="round" aria-label="img"
										style="width:100%;height:100%;" />
								</view>
							</view>
							<view v-else class="" style="display: flex;flex-direction: column;height:100%;">
								<view class="" style="flex:1;position:relative;">
									<t-image :src="'https://xcx.wujingchuanmei.com/api' + item.picPath"
										mode="aspectFill" shape="round" aria-label="img"
										style="width:100%;height:100%;" />
									<view class="" style="position:absolute;z-index:30;bottom:18rpx;right:20rpx;">
										<text
											style="color:white;font-size: 26rpx;background-color: rgba(0,0,0,0.9);padding:4rpx 8rpx;border-radius:10rpx;">图文</text>
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
						<ad v-if="adv.status == 1 && adv.advId && adv.every != 0 && index != 0 && (index+1) % adv.every == 0 && adv.type == 1"
							:unit-id="adv.advId"></ad>
						<ad v-if="adv.status == 1 && adv.advId && adv.every != 0 && index != 0 && (index+1) % adv.every == 0 && adv.type == 3"
							ad-type="video" ad-theme="white" :unit-id="adv.advId"></ad>
					</view>
					<view class=""><t-divider dashed content="已无更多数据" /></view>
				</scroll-view>
			</view>
		</view>
		<view class="tabBar" style="position: fixed;bottom: 0;z-index:10;" v-if="showTabBar"><ax-tabBar
				@setTabBarId="getTabBarId" :id="tabBarId"></ax-tabBar>
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
		homeNewList,
		getItems,
		Adv,
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
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app';
	import {share} from "../../utils/share.js";
	const showTabBar = getApp().globalData.showTabBar;
	const appId = inject('appId');
	let tabBarId = ref(null);
	//布局切换
	const BS = ref(true);

	function getTabBarId(item) {
		tabBarId.value = getApp().globalData.tabBarId;
		f_getPage({
			appId: appId.value
		});
	}
	//分类项列表
	const navList = ref([]);
	//选择的分类项的id
	let select = ref(-1);
	const search = ref('');
	//获取分类项列表
	function f_getItems(o) {
		getItems(o).then(res => {
			navList.value = res.articleCateList;
		});
	}
	//选择nav
	function f_changeSelect(item) {
		select.value = item.id;
		//默认的全部分类
		if (item.id == -1) {
			newsObject.value.cid = "";
		}
		if (item.type == 2) {
			newsObject.value.cid = item.id;
		}
		newsObject.value.title = search.value;
		//切换分类后允许触底刷新
		isRefresh.value = true;
		//重置页码数
		newsObject.value.page = 1;
		//获取文章列表
		f_getNewList(newsObject.value);
	}
	//顶部搜索
	function f_search(e) {
		newsObject.value.page = 1;
		search.value = e.detail.value;
		f_getNewList({
			appId: appId.value,
			page: newsObject.value.page,
			title: e.detail.value,
			cid: newsObject.value.cid,
		});
	}
	//清除搜索内容
	function f_clear() {
		newsObject.value.page = 1;
		search.value = '';
		newsObject.value.title = '';
		isRefresh.value = true;
		f_getNewList(newsObject.value);
	}
	//文章列表
	const list = ref([]);
	//获取新闻列表对象
	const newsObject = ref({
		appId: appId.value,
		page: 1,
		cid: '',
		title: ''
	});
	//是否是触底刷新
	const buttom = ref(false);
	//是否能够触底刷新
	const isRefresh = ref(true);
	//获取文章列表
	function f_getNewList(o) {
		homeNewList(o).then(data => {
			//有文章列表，文章图片有多张，传的值是逗号分隔的路径，取第一张
			if (data.articleList.length > 0) {
				data.articleList.forEach(item => {
					if (item.picPath) { //可能不上传图片,非空判断
						item.picPath = item.picPath.split(',')[0];
					}
				});
			}
			//触底刷新获取的列表采取拼接方式，并初始化buttom
			if (buttom.value) {
				list.value = list.value.concat(data.articleList);
				buttom.value = false;
			} else {
				list.value = data.articleList;
			}
			//传的文章数不到  条时禁止再触底刷新拉取数据
			if (data.articleList.length < 1) {
				isRefresh.value = false;
			}
		});
	}
	//滚动触底
	function f_touchBottom(e) {
		if (isRefresh.value) {
			buttom.value = true;
			newsObject.value.page += 1;
			f_getNewList(newsObject.value);
		}
	}
	//顶部标题
	const topTitle = ref(null);
	const showFlash = ref(false);
	//获取页面配置
	function f_getPage(o) {
		//获取tabBar列表
		getTabBarList(o).then((data) => {
			data.xcxPageList.forEach((element) => {
				if (element.pageType == "3" && element.id == tabBarId.value) {
					topTitle.value = element.xcxPage.siteTitle;
					showFlash.value = element.xcxPage.isShow=='0'?false:true;
					//大小图判断
					if (element.xcxPage.adConfig == '1') { //大图
						BS.value = false;
					} else if (element.xcxPage.adConfig == '2') { //小图，默认
						BS.value = true;
					}
				}
			})

		})
	}

	//列表广告
	const adv = ref({
		status: null,
		every: null, //间隔
		advId: null,
		type: null,
	});
	//全局广告插屏广告
	const advC = ref({
		status: null,
		advId: null,
		intervalNum: null,
		interstitialAd:null,
		firstNow:false
	});
	// //定时器
	// const timer = ref(null);
	// //插屏广告实例
	// let interstitialAd = ref(null);
	// //创建插屏广告
	// const createAdv1 = function() {
	// 	if (wx.createInterstitialAd) {
	// 		interstitialAd.value = wx.createInterstitialAd({
	// 			adUnitId: advC.value.advId,
	// 		});
	// 		interstitialAd.value.onLoad(() => {
	// 			console.log('onLoad event emit');
	// 		});
	// 		interstitialAd.value.onError(err => {
	// 			console.log('onError event emit', err);
	// 			clearInterval(timer.value);
	// 			timer.value = setInterval(() => {
	// 				showAdv1();
	// 			}, advC.value.intervalNum * 1000);
	// 		});
	// 		interstitialAd.value.onClose(res => {
	// 			clearInterval(timer.value);
	// 			timer.value = setInterval(() => {
	// 				showAdv1();
	// 				clearInterval(timer.value);
	// 			}, advC.value.intervalNum * 1000);
	// 			console.log('onClose event emit', res);
	// 		});

	// 		timer.value = setInterval(() => {
	// 			showAdv1();
	// 			clearInterval(timer.value);
	// 		}, 1 * 1000);
	// 	}
	// };
	// //显示插屏广告
	// function showAdv1() {
	// 	interstitialAd.value
	// 		.show()
	// 		.then(() => {
	// 			console.log('插屏广告显示中');
	// 		})
	// 		.catch(err => {
	// 			console.error(err);
	// 		});
	// }
	//获取广告id
	function f_getAdv(o) {
		Adv(o).then(res => {
			let type = null;
			res.advertPlaceConfigs.forEach(element => {
				if (element.title == 'config_adv') {
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
				//插屏广告
				if (element.type == 2) {
					advC.value.status = element.status;
					advC.value.advId = element.content.trim();
					advC.value.intervalNum = element.intervalNum - 0;
				}
			});
			if (advC.value.status) {
				//todo
				// createAdv1();
				createAdv(advC.value);
			}
		});
	}
	const topH = ref(null);
	const bottomH = ref(null);
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
						if (element.pageType == "3") {
							let shareTabBarId = element.id;
							console.log(element, 'ele');
							const info = 'path=/pages/article/article' +
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
		console.log('aaa');
		f_getNewList(newsObject.value);
		f_getItems({
			appId: appId.value,
		});
		f_getPage({
			appId: appId.value
		});
	});

	onShow(() => {
		uni.hideTabBar({
			animation: false,
		});
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
		clearTimer()
	});
	onUnload(() => {
		clearTimer()
	});

	//跳详情
	function f_go(item) {
		uni.navigateTo({
			url: '/pages_details/article_details/article_details' + '?id=' + item.id + "&tabBarId=" + tabBarId.value+"&can=true"
		});
	}

	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: topTitle.value,
			// path: '/pages/index/index?' + 'path=/pages/article/article' + '&share=true',
			path:'/pages/index/index?'+'path=/pages/article/article'+"&tabBarId="+getApp().globalData.tabBarId,
		};
	});
	// onShareAppMessage(() => {
	// 	return {
	// 		title: topTitle.value,
	// 		// path: '/pages/index/index?' + 'path=/pages/article/article' + '&share=true',
	// 		path:'/pages/article/article',
	// 	};
	// });
</script>
<style lang="scss">
	.topActive {
		color: red;
		// font-weight: 700;
		// background-color: #e3e3e3;
		padding: 8rpx;
		// border-radius: 20rpx;
		border-bottom:2px solid red;
		transform: scale(1.2);
	}

	.scroll::-webkit-scrollbar {
		display: none;
	}
</style>