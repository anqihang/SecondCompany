<template>
	<view class="level1" style="align-items: center;">
		<view class="" style="position: fixed;top:0;z-index:10"><ax-topNav :name="title" :back="true" :isShare="isFromShare" :backPage="backPage"></ax-topNav></view>
		<view class="main" style="overflow: hidden;display: flex;flex-direction: column;" :style="{'margin-top':topH}">
			<view class="scroll" style="padding:10rpx 0;flex:1;overflow: auto;background-color: #fff;display: flex;flex-direction: column;position:relative;">
				<!-- <view class="" style="padding:10rpx 20rpx;flex:1;overflow: auto;background-color: #fff;"> -->
				<scroll-view class="" scroll-y="true" style="flex:1;overflow: auto;" @scrolltolower="f_touchBottom">
					<view class="" v-for="(item, index) in list" :key="index">
						
						<view
							@click="f_go(item)"
							style="height:206rpx; background-color: white;margin:10rpx 20rpx 10rpx 20rpx;padding:10rpx;border-bottom:1px solid #d8d8d8"
						>
							<view class="" style="display: flex;">
								<view class="" style="flex:7;display: flex;flex-direction: column;justify-content: space-between;">
									<view class="" style="flex:1;overflow: hidden;margin-bottom: 8rpx;">
										<text
											style="font-size: 36rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;word-break: break-all;"
										>
											{{ item.title }}
										</text>
									</view>
									<view class="" style="font-size: 26rpx;padding:10rpx 0;color:darkgray;height:34rpx;">
										<text>{{ item.createTime }}</text>
									</view>
								</view>
								<view class="" style="flex:5;background-color: white;margin-left:40rpx;padding:10rpx;height:186rpx;">
									<!-- :src="item.img" -->
									<t-image
										:src="'https://xcx.wujingchuanmei.com/api' + item.picPath"
										mode="aspectFill"
										width="72"
										height="72"
										shape="round"
										aria-label="img"
										style="width:100%;height:100%;"
									/>
								</view>
							</view>
						</view>
						<ad v-if="adv.status == 1 && adv.advId && adv.every != 0 && index != 0 && (index+1) % adv.every == 0 && adv.type == 1" :unit-id="adv.advId"></ad>
						<ad
							v-if="adv.status == 1 && adv.advId && adv.every != 0 && index != 0 && (index+1) % adv.every == 0 && adv.type == 3"
							ad-type="video"
							ad-theme="white"
							:unit-id="adv.advId"
						></ad>
					</view>
					<view class=""><t-divider dashed content="已无更多数据" /></view>
				</scroll-view>
			</view>
		</view>
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
import { homeNewList, Adv } from '../../utils/api.js';
import { createAdv, clearTimer,showAdv } from '../../utils/adv.js';
import { ref, inject, onMounted } from 'vue';
import { onLoad, onShow, onHide, onUnload, onShareAppMessage } from '@dcloudio/uni-app';
const appId = inject('appId');

const list = ref([]);
//获取新闻列表
const newsObject = ref({
	appId: appId.value,
	page: 1,
	cityId: null,
	cid: null,
	title: null,
});
const refresh = ref(true);
//刷新
//滚动触底
function f_touchBottom() {
	if (refresh.value) {
		newsObject.value.page += 1;
		f_getNewList(newsObject.value);
	}
}

function f_getNewList(o) {
	homeNewList(o).then(data => {
		console.log('homeNewList', data);
		if (data.articleList.length > 0) {
			data.articleList.forEach(item => {
				item.picPath = item.picPath.split(',')[0];
			});
		}
		if (data.articleList.length < 1) {
			refresh.value = false;
		}
		list.value = list.value.concat(data.articleList);
	});
}
const title = ref('');
//分类id
const id = ref(null);
const search = ref(null);
const isFromShare = ref(false);
const backPage = ref(null);
const typeId = ref(null);

const topH = ref(null);
const bottomH =ref(null);

onLoad(res => {
	topH.value = getApp().globalData.top;
	bottomH.value = getApp().globalData.bottom;
	if(getApp().globalData.firstPage){
		advC.value.firstNow = true;
		getApp().globalData.firstPage = false;
	}
	console.log(res, 'searchList');
	isFromShare.value = !!res.share;
	backPage.value = res.backPage;
	title.value = res.name;
	id.value = res.id;
	typeId.value = res.typeId;
	if (typeId.value == '1') {
		newsObject.value.cityId = id.value - 0;
		newsObject.value.cid = null;
	} else if (typeId.value == '2') {
		newsObject.value.cid = id.value - 0;
		newsObject.value.cityId = null;
	} else {
		newsObject.value.cid = null;
		newsObject.value.cityId = null;
	}
	search.value = res.search;
	if (res.search == 'undefined') {
		newsObject.value.title = null;
	} else {
		newsObject.value.title = res.search;
	}
	f_getNewList(newsObject.value);
});
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
	interstitialAd:null,
	firstNow:false,
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
// 			if(!timer){
// 				timer.value = setInterval(() => {
// 					console.log(2);
// 					showAdv1();
// 				}, advC.value.intervalNum * 1000);
// 				console.log('onClose event emit', res);
// 			}
// 		});
// 		timer.value = setInterval(() => {
// 			console.log(1);
// 			showAdv1();
// 			clearInterval(timer.value);
// 		}, advC.value.intervalNum * 1000);
// 	}
// };
//广告
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
				adv.value.advId = element.content;
			}
			if (element.type == 2) {
				advC.value.status = element.status;
				advC.value.advId = element.content;
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
	wx.hideShareMenu({
		menus: ['shareTimeline'],
	});
	f_getAdv({
		appId: appId.value,
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

//跳详情
function f_go(item) {
	uni.navigateTo({
		url: '/pages_details/article_details/article_details' + '?id=' + item.id,
	});
}
//右上角分享好友
onShareAppMessage(() => {
	return {
		title: '',
		path:
			'/pages/index/index?' +
			'path=/pages_details/SearchList/SearchList' +
			'&type=noTabBar' +
			'&share=true' +
			'&backPage=/pages/category/category' +
			'&id=' +
			id.value +
			'&typeId=' +
			typeId.value +
			'&search=' +
			search.value,
	};
});
//分享到朋友圈
// onShareTimeline(() => {
// 	return {
// 		title: '',
// 		qury:
// 			'/pages/index/index?' +
// 			'path=/pages_details/SearchList/SearchList' +
// 			'&sign=false' +
// 			'&type=noTabBar' +
// 			'&share=true' +
// 			'&backPage=/pages/category/category' +
// 			'&id=' +
// 			id.value +
// 			'&typeId=' +
// 			typeId.value +
// 			'&search=' +
// 			search.value,
// 	};
// });
</script>

<style lang="scss"></style>
