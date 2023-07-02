<template>
	<view class="" style="height:100%;width:100%;">
		<t-tabs :defaultValue="navList[0].id" style="height:100%;width:100%;" :space-evenly="false" v-if="navList.length" @click="changeTab">
			<t-tab-panel :label="item.title" :value="item.id" style="" v-for="(item, index) in navList" :key="index">
				<view class="" style="height:100%;overflow: hidden;">
					<scroll-view scroll-y="true" style="height:100%;" @scrolltolower="scrollBottom(item)">
						<!-- <ad v-if="advT.status == 1 && advT.advId && advT.type == 3" ad-type="video" ad-theme="white"
								:unit-id="advT.advId"></ad> -->
						<view class="" style="width:100%;">
							<!-- <ad unit-id="adunit-8de70fb1883bcfc5"></ad> -->
							<ad v-if="advT.status == 1 && advT.advId && advT.type == 3" ad-type="video" ad-theme="white" :unit-id="advT.advId"></ad>
							<ad v-if="advT.status == 1 && advT.advId && advT.type == 1" :unit-id="advT.advId"></ad>
						</view>
						<view
							v-for="(item1, index1) in item.list"
							:key="index1"
							@click="f_goDetails(item, item1)"
							style="width:100%;padding:10rpx 20rpx;padding-bottom:0;box-sizing: border-box;position:relative;vertical-align: top;"
						>
							<view class="" style="height:400rpx;position:relative;margin-bottom:10rpx;">
								<t-image
									:src="'https://xcx.wujingchuanmei.com/api' + (item1.picPath ? item1.picPath : item1.icon)"
									mode="aspectFill"
									width="72"
									height="72"
									shape="round"
									aria-label="img"
									style="width:100%;height:100%;vertical-align: top;"
								/>
								<view
									class=""
									v-if="item.type == 2"
									style="position:absolute;z-index:10;top:50%;transform: translateY(-50%);display: flex;justify-content: center;width:100%;"
								>
									<view
										class=""
										style="background-color: rgba(0, 0, 0, 0.6);height:100rpx;width:100rpx;border-radius: 50%;display: flex;justify-content: center;align-items: center;border:2px solid white;"
									>
										<view
											class=""
											style="border:40rpx solid white;width:0;border-top:30rpx solid transparent;border-right:0;border-bottom:30rpx solid transparent;transform: translateX(20%);"
										></view>
									</view>
								</view>
								<view
									class=""
									style="background-color:rgba(0,0,0,0.4);position: absolute;bottom:0rpx;left:0rpx;right:0rpx;z-index:10;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-break: break-all;color:white;padding:0 10rpx;border-radius: 8rpx;"
								>
									<text style="font-size:40rpx;color:white;font-weight:700;">{{ item1.title }}</text>
								</view>
							</view>
							<view class="" v-if="item.type == 2" style="position:absolute;top:10rpx;right:10rpx;height:60rpx;display: flex;align-items:center;margin-right:10rpx;">
								<view class="" style="display: flex;margin-right:14rpx;">
									<view class="" style="width:40rpx;height:40rpx;"><img src="/static/fire.png" alt="" style="width:100%;height:100%;" /></view>
									<text style="color:white;margin:0 8rpx;">{{ item1.playNum > 10000 ? (item1.playNum / 10000).toFixed(1) + '万' : item1.playNum }}</text>
								</view>
							</view>
							<ad
								v-if="
									item.adv &&
										item.adv.status == 1 &&
										item.adv.advId &&
										item.adv.acticleCnt != 0 &&
										index1 != 0 &&
										(index1 + 1) % item.adv.acticleCnt == 0 &&
										item.adv.advertTypeId == 1
								"
								:unit-id="item.adv.advId"
							></ad>
							<ad
								v-if="
									item.adv &&
										item.adv.status == 1 &&
										item.adv.advId &&
										item.adv.acticleCnt != 0 &&
										index1 != 0 &&
										(index1 + 1) % item.adv.acticleCnt == 0 &&
										item.adv.advertTypeId == 3
								"
								ad-type="video"
								ad-theme="white"
								:unit-id="item.adv.advId"
							></ad>
							<!-- <ad unit-id="adunit-8de70fb1883bcfc5" v-if="(index1 + 1) % 3 == 0"></ad> -->
						</view>
						<view class=""><t-divider dashed content="已无更多数据" /></view>
						<!-- <ad unit-id="adunit-8de70fb1883bcfc5"></ad> -->
						<ad v-if="advB.status == 1 && advB.advId && advB.type == 3" ad-type="video" ad-theme="white" :unit-id="advB.advId"></ad>
						<ad v-if="advB.status == 1 && advB.advId && advB.type == 1" :unit-id="advB.advId"></ad>
					</scroll-view>
				</view>
			</t-tab-panel>
		</t-tabs>
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
import { Adv, getTabBarList, getItems, getVideoItems, homeNewList, videoList } from '../../utils/api.js';
import { ref, inject, onMounted } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
const appId = inject('appId');
const props = defineProps(['isShow']);
const navList = ref([]);
const selectId = ref(0);
//切换选项卡
function changeTab(e) {
	navList.value.forEach(element => {
		if (element.id == e.detail.value) {
			if (!element.alive) {
				getList(element);
			}
		}
	});
}
//
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

const advType = ref({});
//获取tabBar列表
async function f_getTabBar(o) {
	await Adv({ appId: appId.value }).then(res => {
		let type = null;
		let type1 = null;
		let typeT = null;
		let typeB = null;
		res.advertPlaceConfigs.forEach(element => {
			if (element.title == 'config_adv') {
				type = element.advertTypeId;
				advType.value['artical'] = element;
			}
			if (element.title == 'config_vid') {
				type1 = element.advertTypeId;
				advType.value['video'] = element;
			}
			if (element.title == 'top_index') {
				typeT = element.advertTypeId;
				advT.value.status = element.status;
				advT.value.every = element.acticleCnt;
				advT.value.type = element.advertTypeId;
			}
			if (element.title == 'bottom_index') {
				typeB = element.advertTypeId;
				advB.value.status = element.status;
				advB.value.every = element.acticleCnt;
				advB.value.type = element.advertTypeId;
			}
		});
		res.advertTypes.forEach(element => {
			if (type == element.type) {
				advType.value['artical'].advId = element.content.trim();
			}
			if (type1 == element.type) {
				advType.value['video'].advId = element.content.trim();
			}
			if (typeT == element.type) {
				advT.value.advId = element.content.trim();
			}
			if (typeB == element.type) {
				advB.value.advId = element.content.trim();
			}
		});
	});
	await getTabBarList(o).then(data => {
		if (data.xcxPageList) {
			data.xcxPageList.forEach(element => {
				if (element.pageType == '2') {
					// console.log(element,'video1');
					videoType.value = element.xcxPage.adConfig;
				}
				if (element.id == getApp().globalData.tabBarId) {
					if (element.pageConfigs) {
						element.pageConfigs.forEach(item => {
							let a = {};
							a.id = item.id;
							a.title = item.baseTitle;
							//美文
							a.name = item.videoTypeName;
							//视频
							a.type = item.baseColumnType;
							a.list = [];
							a.styleNum = item.styleNum;
							a.page = 1;
							//标签页激活状态
							a.alive = false;
							//是否允许触底获取数据
							a.isRefresh = true;
							a.cateId = item.baseVideoType;
							if (a.type == 3 && advType.value['artical']) {
								a.adv = advType.value['artical'];
							}
							if (a.type == 2 && advType.value['video']) {
								a.adv = advType.value['video'];
							}
							navList.value.push(a);
						});
						//获取默认第一个数据
						getList(navList.value[0]);
					}
				}
			});
		}
	});
}
//
function getList(element) {
	console.log(element, 'elementaaa');
	switch (element.type) {
		case '2':
			{
				element.path = '/pages/video/video';
				videoList({
					// appId: appId.value,
					page: element.page,
					type: element.cateId,
				}).then(data => {
					if (data.videoList.length > 0) {
						element.page++;
						element.alive = true;
						data.videoList.forEach(item => {
							item.icon = item.icon.split(',')[0];
						});
					} else {
						//获取不到数据后禁止触底请求
						element.isRefresh = false;
					}
					element.list = element.list.concat(data.videoList);
				});
			}
			break;
		case '3':
			{
				element.path = '/pages/article/article';
				homeNewList({
					// appId: appId.value,
					page: element.page,
					cid: element.cateId,
				}).then(data => {
					if (data.articleList.length > 0) {
						element.page++;
						element.alive = true;
						data.articleList.forEach(item => {
							if (item.picPath) {
								//可能不上传图片,非空判断
								item.picPath = item.picPath.split(',')[0];
							}
						});
					} else {
						//获取不到数据后禁止触底请求
						element.isRefresh = false;
					}
					element.list = element.list.concat(data.articleList);
				});
			}
			break;
		default:
			break;
	}
}

//滚动触底
function scrollBottom(item) {
	if (item.isRefresh) {
		getList(item);
	}
}
const videoType = ref(null);
//跳转到详情页
function f_goDetails(item, item1) {
	console.log(item, item1, 'itee');
	if (item.type == 2) {
		console.log(videoType.value, 'videoType');
		//todo
		if (videoType.value == 1) {
			uni.navigateTo({
				url: '/pages_details/videoDetails/videoDetails' + '?id=' + item1.id + '&can=true' + '&from=home' + '&cateId=' + item.cateId,
			});
		} else if (videoType.value == 2) {
			uni.navigateTo({
				url: '/pages_details/video_details/video_details' + '?id=' + item1.id + '&can=true' + '&from=home' + '&cateId=' + item.cateId,
			});
		}
	} else if (item.type == 3) {
		uni.navigateTo({
			url: '/pages_details/article_details/article_details' + '?id=' + item1.id + '&can=true' + '&from=home',
		});
	}
}
//切换首页
function tf() {
	if (navList.value.length < 1) {
		f_getTabBar({
			appId: appId.value,
		});
	}
}
onShow(() => {});
//暴露
defineExpose({
	tf,
});
</script>
<style lang="scss">
//到app.vue里改样式才生效
.t-tabs__content {
	height: calc(100% - 48px);
}

.t-tabs__content-inner {
	height: 100%;
}

.t-tabs__track {
	background-color: red !important;
}

.t-tabs__item--active {
	color: red !important;
}

.bigger {
	--tab-font-size: 32rpx !important;
}
</style>
