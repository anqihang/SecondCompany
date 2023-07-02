<template>
	<view class="level1">
		<view class="" style="position: fixed;top:0;z-index:10;"><ax-topNav :name="topTitle"></ax-topNav></view>
		<view class="main"
			style="overflow: hidden;display: flex;flex-direction: column;box-sizing: border-box;position:relative;" :style="{'margin-top':topH,'margin-bottom':bottomH}">
				<view class="" style=";">
					
				</view>
			<ax-home ref="home" id='home' style="height:100%;position:absolute;width:100%;"
				:style="{'z-index':type?'1':'-1'}" :is-show="type"></ax-home>
			<ax-home1 ref="home1" id="home1" style="height:100%;position:absolute;width:100%;"
				:style="{'z-index':type?'-1':'1'}" :is-show="!type"></ax-home1>
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
			return {

			};
		}
	}
</script>
<script setup>
	import {
		onShow,
		onLoad,
		onUnload,
		onHide,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {
		ref,
		inject,
		nextTick,
		getCurrentInstance
	} from "vue";
	import {
		getTabBarList,
		Adv,
	} from "../../utils/api.js";
	import {
		createAdv,
		showAdv,
		clearTimer,
	} from "/utils//adv.js";
	import {share} from "/utils/share.js"
	//
	const appId = inject('appId');
	let tabBarId = ref(null);
	const type = ref(false);
	const topTitle = ref('');
	const that = getCurrentInstance();

	function getTabBarId(item) {
		tabBarId.value = getApp().globalData.tabBarId;
		f_getPage({
			appId: appId.value
		});
	}
	const showFlash = ref(false);
	function f_getPage(o) {
		//限制只执行一次
		let a = false,
			b = false;
		//获取tabBar列表
		getTabBarList(o).then((data) => {
			data.xcxPageList.forEach((element) => {
				if (element.pageType == "1" && element.id == tabBarId.value) {
					topTitle.value = element.xcxPage.siteTitle;
					if (element.xcxPage.adConfig == '1') { //新首页
						showFlash.value = element.xcxPage.isShow=='0'?false:true;
						type.value = false;
						if (!a) {
							that.refs.home1.tf();
							a = true;
						}
					} else if (element.xcxPage.adConfig == '2') { //旧首页
						showFlash.value = element.xcxPage.isShow=='0'?false:true;
						type.value = true;
						if (!b) {
							that.refs.home.tf();
							b = true;
						}
					}
				}
			})
		})
	}
	const advC = ref({
		status: null,
		advId: null,
		intervalNum: null,
		interstitialAd: null,
		firstNow:false,
	});
	//获取广告id
	function f_getAdv(o) {
		Adv(o).then(res => {
			res.advertTypes.forEach(element => {
				//插屏广告
				if (element.type == 2) {
					advC.value.status = element.status;
					advC.value.advId = element.content.trim();
					advC.value.intervalNum = element.intervalNum - 0;
				}
			});
			if (advC.value.status) {
				//todo
				createAdv(advC.value);
			}
		});
	}
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
				try {
					data.xcxPageList.forEach((element) => {
						if (element.pageType == "1") {
							let shareTabBarId = element.id;
							console.log(element, 'ele');
							const info = 'path=/pages/homeIndex/homeIndex' +
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
		// f_getPage({
		// 	appId: appId.value
		// });
		f_getAdv({appId:appId.value});
	})
	// const fromOther = ref(false);
	onShow(() => {
		uni.hideTabBar({
			animation: false,
		});
		tabBarId.value = getApp().globalData.tabBarId;
		// if(fromOther.value){
			f_getPage({
				appId: appId.value
			});
			// fromOther.value = false;
		// }
		if(advC.value.intervalNum){
			showAdv(advC.value);
		}
	})
	onHide(()=>{
		clearTimer();
		// fromOther.value = true;
	})
	onUnload(()=>{
		clearTimer();
	})
	const flashList = getApp().globalData.flashList;
	const showTabBar = getApp().globalData.showTabBar;
	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: topTitle.value,
			path:'/pages/index/index?'+'path=/pages/homeIndex/homeIndex' + "&tabBarId="+getApp().globalData.tabBarId,
		};
	});
	// onShareAppMessage(() => {
	// 	return {
	// 		title: topTitle.value,
	// 		path:'/pages/homeIndex/homeIndex'
	// 	};
	// });
	// onShareAppMessage(() => {
	// 	return {
	// 		title: title.value,
	// 		path: '/pages/index/index?' +
	// 			'path=/pages_details/article_details/article_details' +
	// 			'&type=noTabBar' +
	// 			'&share=true' +
	// 			'&backPage=/pages/article/article' +
	// 			'&id=' +
	// 			id.value + '&tabBarId=' + backId.value+"&can=true",
	// 	};
	// });
</script>

<style lang="scss">
</style>