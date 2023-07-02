<template>
	<view class="tabBar"
		style="box-sizing: border-box; width:100vw;height:164rpx;display: flex;border-top:2rpx solid #f0f0f0; background-color: white;"
		:style="{ height: type == 'ios' ? '164rpx' : '130rpx' }">
		<view class="tabBars" style="width:100%;display: flex;padding-top: 8rpx;">
			<view v-for="(item, index) in list" :key="index" style="flex:1;display: flex;justify-content: center;">
				<view class=""
					style="display: flex;flex-direction: column;align-items: center;background-color: white;padding:10rpx;"
					@click="f_navTo(item.url,item)">
					<view class="" style="margin-bottom:6rpx;width:56rpx;height:56rpx;">
					<!-- 	<image v-if="(props.name == item.title)  || (props.id == item.id)" :src="item.icon + '1.png'" mode=""
							style="width:100%;height:100%;vertical-align: top;"></image>
						<image v-else :src="item.icon + '.png'" mode=""
							style="width:100%;height:100%;vertical-align: top;"></image> -->
							<image v-if="props.id == item.id" :src="'https://xcx.wujingchuanmei.com/api'+ item.iconIng" mode=""
								style="width:100%;height:100%;vertical-align: top;"></image>
							<image v-else :src="'https://xcx.wujingchuanmei.com/api'+ item.icon" mode=""
								style="width:100%;height:100%;vertical-align: top;"></image>
					</view>
					<text style="font-size: 30rpx;font-weight:600;white-space: nowrap;"
						:style="{ 'font-size': type == 'ios' ? '28rpx' : '30rpx', color: (props.name == item.title)||(props.id == item.id) ? 'red' : '#000' }">
						{{ item.xcxPage.title }}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ax-tabBar',
		data() {
			return {};
		},
	};
</script>
<script setup>
	import {
		Adv,
		getTabBarList,
	} from '../../utils/api.js'
	import {
		onLoad,
		onShow,
	} from '@dcloudio/uni-app';
	import {
		ref,
		inject
	} from 'vue';
	const appId = inject('appId');
	let type = ref('');

	//判断颜色变红
	const props = defineProps(['name','id']);
	const emits = defineEmits(['setTabBarId'])

	const list = ref([
		// {
		// 	id: 0,
		// 	title: '视频',
		// 	url: '/pages/video/video',
		// 	icon: '/static/icon/video'
		// },
		// {
		// 	id: 1,
		// 	title: '美文',
		// 	url: '/pages/article/article',
		// 	icon: '/static/icon/article'
		// },
		// // {
		// // 	id: 11,
		// // 	title: '美文1',
		// // 	url: '/pages/article/article',
		// // 	icon: '/static/icon/article'
		// // },
		// // {
		// // 	id: 2,
		// // 	title: '美文分类',
		// // 	url: '/pages/category/category',
		// // 	icon: '/static/icon/category'
		// // },
		// {
		// 	id:3,
		// 	title:"首页",
		// 	url:"/pages/homeIndex/homeIndex",
		// 	icon:"/static/icon/home"
		// },
		// {
		// 	id:4,
		// 	title:"首页1",
		// 	url:"/pages/homeIndex/homeIndex",
		// 	icon:"/static/icon/home"
		// }
	]);
	const tabBarId = ref(null);
	//跳转tabBar
	function f_navTo(url1,item) {
		tabBarId.value = item.id;
		getApp().globalData.tabBarId = tabBarId.value;
		let m = getApp().globalData.tabBarId;
		console.log(m,item.pageType,'a');
		emits('setTabBarId',item);
		let url = null;
		switch(item.pageType){
			case '1':{
				url = "/pages/homeIndex/homeIndex"
			}break;
			case '2':{
				url = "/pages/video/video"
			}break;
			case '3':{
				url = "/pages/article/article"
			}break;
			case '4':{
				url = "/pages/category/category"
			}break;
			case '5':{
				url="/pages/calendar/calendar"
			}break;
			case '6':{
				uni.navigateToMiniProgram({
					appId:item.xcxPage.adConfig,
					path:item.xcxPage.path,
				})
				return;
			}break;
		}
		uni.switchTab({
			url: url,
		});
	}
	//获取tabBar列表
	function f_getTabBar(o) {
		getTabBarList(o).then((data) => {
			let _list =[];
			data.xcxPageList.forEach((element)=>{
				if(element.bottomStatus == '1'){
					_list.push(element);
				}
			})
			list.value = _list;
		})
	}
	onLoad(() => {
		//获取系统类型
		uni.getSystemInfo({
			success(e) {
				type.value = e.osName;
			}
		});
		f_getTabBar({
			appId: appId.value
		});
		f_getAdv({
			appId: appId.value
		});
	});
	const videoAble = ref(false);
	// 广告
	function f_getAdv(o) {
		Adv(o).then(res => {
			res.advertPlaceConfigs.forEach(element => {
				if (element.title == 'config_vid') {
					videoAble.value = true;
				}
			});
			if (videoAble.value) {
				// list.value.unshift({
				// 	id: 0,
				// 	title: '视频',
				// 	url: '/pages/video/video',
				// 	icon: '/static/icon/video'
				// })
			}
		});
	}
	onShow(()=>{
		
	})
</script>

<style lang="scss"></style>