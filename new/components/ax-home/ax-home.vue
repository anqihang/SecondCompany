<template>
	<view class="" style="height:100%;width:100%;background-color: #fff;">
		<!-- <view class="" style="position: relative;top:0;"><ax-topNav :name="topTitle"></ax-topNav></view> -->
		<!-- <view class="main" style="overflow: hidden;display: flex;flex-direction: column;box-sizing: border-box;"> -->
		<view class="" style="position:relative;height:100%;width:100%;">
			
		<scroll-view scroll-y="true" style="height:100%;width:100%;" v-if="vif" :refresher-enabled="false">
			<view class="" v-for="(item,index) in list" :key="item.id" style="box-sizing: border-box;">
				<view class="" style="width:100%;">
					<!-- <view class=""> -->
					<ad :unit-id="item.advId" style="width:100%!important;"
						v-if="item.adPosition == '2' && item.advId && item.adType == '1'">
					</ad>
					<ad :unit-id="item.advId" style="width:100%!important;"
						v-if="item.adPosition == '2' && item.advId && item.adType == '3'" ad-type="video"
						ad-theme="white">
					</ad>
					<view class="" style="height:80rpx;margin-top:20rpx;padding:0 18rpx;box-sizing: border-box;">
						<view class="" style="float: left;display: flex;height:100%;display: flex;align-items: center;">
							<view class="" style="width:40rpx;height:40rpx;" v-if="item.type != 6 && item.icon">
								<img :src="'https://xcx.wujingchuanmei.com/api' + item.icon" alt=""
									style="width:100%;height:100%;">
							</view>
							<view class="" style="margin:0 10rpx;">
								{{item.title}}
							</view>
							<view class="">
								<text style="font-size: 26rpx;color:red;">{{item.secondTitle}}</text>
							</view>
						</view>
						<view class="" style="float: right;height:100%;display: flex;align-items: center;"
							v-if="item.content.length && item.changeButton == 1 && !(item.type==6)">
							<view class="" style="background-color: red;padding:8rpx 18rpx;border-radius:30rpx;"
								@click="changeList(item)">
								<text style="color:white;">换一批</text>
							</view>
						</view>
					</view>
					<view class=""
						style="width:100%;display: flex;flex-wrap: wrap;display: flex;padding:0 18rpx;box-sizing: border-box;margin-top:8rpx;">
						<view class="item" v-for="(item1,index) in item.content" :key="item1.id"
							@click="f_goInfo(item,item1)"
							style="height:400rpx;box-sizing: border-box;display: flex;flex-direction: column;border-radius: 10rpx;margin-bottom:12rpx;padding:0 4rpx;"
							:style="{width:item.type==6?'100%':'calc(100% / '+ (item.vertical-0+1) +')'}">
							<view class=""
								style="height:100%;width:100%;display: flex;flex-direction: column;border-radius: 10rpx;overflow: hidden;">

								<view class="" style="flex:1;position:relative;">
									<t-image
										:src="'https://xcx.wujingchuanmei.com/api' + (item1.picPath?item1.picPath:(item1.icon?item1.icon:item1.baseIcon))"
										mode="aspectFill" aria-label="img" style="width:100%;height:100%;" />
									<view class="" style="position:absolute;z-index:30;bottom:18rpx;right:20rpx;"
										v-if="(item.type-0) == 3">
										<text
											style="color:white;font-size: 26rpx;background-color: rgba(0,0,0,0.9);padding:4rpx 8rpx;border-radius:10rpx;">图文</text>
									</view>
									<view class="" v-if="(item.type-0) == 2"
										style="position:absolute;z-index:10;top:50%;transform: translateY(-50%);display: flex;justify-content: center;width:100%;">
										<view class=""
											style="background-color: rgba(0, 0, 0, 0.6);height:100rpx;width:100rpx;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
											<view class=""
												style="border:40rpx solid white;width:0;border-top:30rpx solid transparent;border-right:0;border-bottom:30rpx solid transparent;transform: translateX(20%);">
											</view>
										</view>
									</view>
								</view>
								<view class=""
									style="margin:6rpx 10rpx 10rpx;;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;word-break: break-all;overflow: hidden;text-align:center;">
									<text style="">{{ item1.title }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="" style="margin:16rpx 0;border: 1px solid #d8d8d8;"
						v-if="item.adPosition == '3' && item.advId">
						<ad :unit-id="item.advId" v-if="item.adType == '1'"></ad>
						<ad :unit-id="item.advId" v-if="item.adType == '3'" ad-type="video" ad-theme="white">
						</ad>
					</view>
				</view>
			</view>
		</scroll-view>
		</view>
		<!-- <view class="tabBar" style="position: relative;bottom: 0;"><ax-tabBar :name="tabBarId"></ax-tabBar>
		</view> -->
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
		getPageConfig,
		getTabBarList,
		getItems,
		homeNewList,
		videoList,
		getVideoItems
	} from "/utils/api.js";
	import {
		ref,
		inject,
		watch,
		computed,
		watchEffect,
		onMounted,
	} from 'vue';
	import {
		onLoad,
		onShow,
	} from '@dcloudio/uni-app';
	const appId = inject('appId');
	const props = defineProps(['isShow'])


	const list = ref([]);
	//点击查看
	function f_goList(e) {
		uni.switchTab({
			url: e.path
		})
	}
	//换一批按钮
	function changeList(e) {
		switch (e.type) {
			case '3':
				f_getArticleList(e);
				break;
			case '2':
				f_getVideoList(e);
				break;
		}
	}
	const videoType = ref(null);
	//点击跳转到内容页面，分文章、视频
	function f_goInfo(item, item1) {
		if (item.type == 2) {
			//todo
			if(videoType.value==1){
				uni.navigateTo({
					url: "/pages_details/videoDetails/videoDetails" + '?id=' + item1.id+"&can=true"  +"&from=home" + "&cateId=" + item.cateId,
				})
			}else if(videoType.value == 2){
				uni.navigateTo({
					url: "/pages_details/video_details/video_details" + '?id=' + item1.id+"&can=true"  +"&from=home" + "&cateId=" + item.cateId,
				})
			}
		} else if (item.type == 3) {
			uni.navigateTo({
				url: "/pages_details/article_details/article_details" + '?id=' + item1.id+"&can=true"  +"&from=home",
			})
		}else if (item.type == 6) {
			uni.navigateToMiniProgram({
				appId: item1.baseAppid,
				path: item1.basePath,
			})
		} 
	}
	//新一批的文章获取
	function f_getArticleList(e) {
		const page = e.page + 1;
		e.page++;
		homeNewList({
			// appId: appId.value,
			page: page,
			cid: e.cateId,
			pageSize: e.num,
		}).then(data => {
			if (data.articleList.length > 0) {
				data.articleList.forEach(item => {
					if (item
						.picPath
					) { //可能不上传图片,非空判断
						item.picPath = item
							.picPath.split(
								',')[0];
					}
				});
				e.content = data.articleList;
			}
			// listen();
			if (data.articleList.length < 1) {
				e.page = 0;
				f_getArticleList(e);
			}
		});
	}
	//新一批的视频获取
	function f_getVideoList(e) {
		const page = e.page + 1;
		e.page++;
		videoList({
			// appId: appId.value,
			page: page,
			type: e.cateId,
			pageSize: e.num,
		}).then(data => {
			if (data.videoList.length > 0) {
				data.videoList.forEach(item => {
					item.icon = item.icon
						.split(',')[0];
				});
				e.content = data.videoList;
			}
			// listen();
			if (data.videoList.length < 1) {
				e.page = 0;
				f_getVideoList(e);
			}
		});
	}

	//获取tabBar列表
	async function f_getTabBar(o) {
		// let articleIdList = {};
		// let videoIdList = {};
		let advObject = {};

		await Adv({
			appId: appId.value
		}).then(res => {
			res.advertTypes.forEach((element) => {
				advObject[element.type] = element.content;
			})
		});
		await getTabBarList(o).then((data) => {
			if (data.xcxPageList) {
				data.xcxPageList.forEach((element) => {
					if(element.pageType == '2'){
						// console.log(element,'video1');
						videoType.value = element.xcxPage.adConfig;
					}
					if (element.id == getApp().globalData.tabBarId && props.isShow) {
						if (element.pageConfigs) {
							element.pageConfigs.forEach((item) => {
								let a = {};
								a.id = item.id;
								a.title = item.baseTitle;
								a.vertical = item.styleCss;
								a.name = item.videoTypeName;
								a.type = item.baseColumnType;
								a.content = [];
								a.adPosition = item.adSpace;
								// a.adType = item.adType;
								a.advId = advObject[item.adType];
								a.icon = item.baseIcon;
								a.page = 1;
								a.num = item.styleNum;
								a.adType = item.adType;
								a.changeButton = item.styleButton;
								a.secondTitle = item.baseSiteTitle;
								a.cateId = item.baseVideoType;
								switch (item.baseColumnType) {
									case '2': {
										a.path = "/pages/video/video";
										videoList({
											// appId: appId.value,
											page: 1,
											type: a.cateId,
											pageSize: item.styleNum,
										}).then(data => {
											if (data.videoList.length > 0) {
												data.videoList.forEach(item => {
													item.icon = item.icon
														.split(',')[0];
												});
											}
											a.content = data.videoList;
											listen();
										});
									}
									break;
									case '3': {
										a.path = "/pages/article/article";
										homeNewList({
											// appId: appId.value,
											page: 1,
											cid: a.cateId,
											pageSize: item.styleNum,
										}).then(data => {
											if (data.articleList.length > 0) {
												data.articleList.forEach(item => {
													if (item
														.picPath
													) { //可能不上传图片,非空判断
														item.picPath = item
															.picPath.split(
																',')[0];
													}
												});
											}
											a.content = data.articleList;
											listen();
										});
									}
									break;
									case '6': {
										a.content = [item];
										listen();
									}
									break;
									default:
										;
										break;
								}
								list.value.push(a);
							})
						}
						console.log(list.value, 'home');
					}
				})
			}
		})
	}

	//延迟渲染
	const vif = ref(true);
	//监听list的改变
	function listen() {
		vif.value = true;
		list.value.forEach((element) => {
			vif.value = false;
			let tim = setTimeout(() => {
				vif.value = true;
				clearTimeout(tim);
			}, 200);
		})
	}

	//父级元素触发,获取列表信息
	function tf() {
		if (!list.value.length) {
			f_getTabBar({
				appId: appId.value
			});
		}
	}


	onShow(() => {})
	//导出
	defineExpose({
		tf
	})
</script>
<style lang="scss">
	.topActive {
		color: red;
		// font-size:38rpx;
		font-weight: 700;
		background-color: #e3e3e3;
		padding: 8rpx;
		border-radius: 20rpx;
		transform: scale(1.2);
	}

	.scroll::-webkit-scrollbar {
		display: none;
	}

	.item {
		padding: 0 10rpx;
	}
</style>