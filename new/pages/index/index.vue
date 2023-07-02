<template>
	<!-- 页面主体 -->
	<view class="content level1" style="">
		<!-- inex -->
		<!-- <view class="" style="position: relative;top:0;"><ax-topNav :back="true" name="启动页"></ax-topNav></view>
		<view class="main">
		</view> -->
		<!-- <view class="tabBar" style="position: relative;bottom: 0;"><ax-tabBar name="启动页"></ax-tabBar></view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
		};
	},
	onLoad() {},
	methods: {},
};
</script>
<script setup>
import { ref, provide, onMounted, getCurrentInstance, inject } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { Adv, getTabBarList } from '../../utils/api.js';
import { createAdv } from '../../utils/adv.js';
import login from '../../utils/login.js';
const appId = inject('appId');

//跳转路径
const path = ref(null);
//跳转页面的类型 tabBar 或 其他
const type = ref(null);
let menuButtonInfo = uni.getMenuButtonBoundingClientRect();

getApp().globalData.top = menuButtonInfo.bottom + 10 + 'px';
uni.getSystemInfo({
	success(e) {
		type.value = e.osName;
		if (type.value == 'ios') {
			getApp().globalData.bottom = '164rpx';
		} else {
			getApp().globalData.bottom = '130rpx';
		}
	},
});
onLoad(options => {
	console.log(options, 'options');
	if (options.tabBarId) {
		getApp().globalData.tabBarId = options.tabBarId;
	}
	appId.value = wx.getAccountInfoSync().miniProgram.appId;
	//将对象转为路径的带参
	let s = JSON.stringify(options)
		.replace(/,/g, '&')
		.replace(/"/g, '')
		.replace(/:/g, '=')
		.replace(/{/, '')
		.replace(/}/, '');
	//默认跳转路径和页面类型，分享传入的
	path.value = options.path || null;
	type.value = options.type || 'tabBar';

	if (!path.value) {
		//默认跳转路径
		// path.value = "/pages/homeIndex/homeIndex";
		// path.value = "/pages/video/video";
	}

	login(appId.value).then(res => {
		// 注入默认路径，正常进入
		// if (!path.value) {
		getTabBarList({
			appId: appId.value,
		}).then(data => {
			//浮动框
			getApp().globalData.flashList = data.xcxFloatings;

			let tabType = data.xcxPageList[0].pageType;
			const _list = ref([]);
			data.xcxPageList.forEach(res => {
				if (res.bottomStatus == '1') {
					_list.value.push(res);
				}
			});
			tabType = _list.value[0].pageType;
			getApp().globalData.tabBarId = _list.value[0].id;
			switch (tabType) {
				case '1':
					{
						path.value = '/pages/homeIndex/homeIndex';
					}
					break;
				case '2':
					{
						path.value = '/pages/video/video';
					}
					break;
				case '3':
					{
						path.value = '/pages/article/article';
					}
					break;
				case '4':
					{
						path.value = '/pages/category/category';
					}
					break;
				case '5':
					{
						// url="/pages/"
					}
					break;
				case '6':
					{
					}
					break;
			}
			if (_list.value.length <= 1) {
				//单页面隐藏tabBar
				getApp().globalData.showTabBar = false;
				getApp().globalData.bottom = 0;
				// path.value = "/pages/homeIndex/homeIndex"
			}
			if (options.path) {
				console.log(options);
				getApp().globalData.tabBarId = options.tabBarId;
				//导航页
				if (type.value == 'tabBar') {
					getApp().globalData.options = s;
					uni.switchTab({
						url: options.path,
					});
				} else {
					uni.redirectTo({
						url: options.path + '?' + s,
					});
				}
			} else {
				getApp().globalData.options = 'can=true';
				uni.switchTab({
					url: path.value,
				});
			}
		});
		// } else {

		// 	if (type.value == 'tabBar') {
		// 		uni.switchTab({
		// 			url: path.value,
		// 		});
		// 	} else {
		// 		uni.redirectTo({
		// 			url: path.value + '?' + s,
		// 		});
		// 	}
		// }
	});
});
onMounted(() => {});
</script>

<style></style>
