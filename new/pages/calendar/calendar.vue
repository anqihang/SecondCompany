<template>
	<view class="level1">
		<view class="" style="position: fixed;top:0;"><ax-topNav :name="topTitle"></ax-topNav></view>
		<view class="main" style="overflow: auto;display: flex;flex-direction: column;" :style="{'margin-top':topH,'margin-bottom':bottomH}">
			<ad v-if="advT.status == 1 && advT.advId && advT.type == 3" ad-type="video" ad-theme="white"
				:unit-id="advT.advId"></ad>
			<ad v-if="advT.status == 1 && advT.advId && advT.type == 1" :unit-id="advT.advId"></ad>
			<Calendar @dayChange='dayChange' @monthChange='monthChange'>
			</Calendar>
			<view class="bg-white padding " style="margin-top: 10rpx;">
				
				<view class="flex  solid-bottom padding padding-bottom align-center">
					<view class="" style="padding:30rpx;margin-right:20rpx;font-size: 70rpx;color:#d84e41;">
						{{currentDay}}
					</view>
				<!-- 	<view class="text-xl text-bold padding bg-blue shadow round light solid-right">
						<view class="text-red">农</view>
						<view class="text-red">历</view>
					</view> -->
					<view class="">
						<view class="text-xxl text-shadow text-black" style="color:black;">农历 {{dayStr}}</view>
						<view class="flex align-center solid-left">
							<view class="text-bold text-df">{{weekStr}}</view>
							<view class="text-yellow text-lg" style="color:black;margin-left:4rpx;">{{yearStr}}</view>
							<!-- <view class="">
								{{new Date(time.time).getDay()}}
							</view> -->
						</view>
					</view>
				</view>
				<view class="padding" style="border-top:1px solid red;">
					<view class="flex align-center cu-card padding-bottom-xs" >
						<view class="cu-tag round" style="border:1px solid green;color:green;">宜</view>
						<view class="text-gray text-content text-sm margin-left" style="color:black;font-size:30rpx;">{{yi}}</view>
					</view>
					<view class="flex align-center cu-card ">
						<view class="cu-tag round" style="border:1px solid red;color:red;">忌</view>
						<view class="text-gray text-content text-sm margin-left" style="color:black;font-size:30rpx;">{{ji}}</view>
					</view>
				</view>
			</view>
			<!--  -->
			<ad v-if="advM.status == 1 && advM.advId && advM.type == 3" ad-type="video" ad-theme="white"
				:unit-id="advM.advId"></ad>
			<ad v-if="advM.status == 1 && advM.advId && advM.type == 1" :unit-id="advM.advId"></ad>
			<!--  -->
			<view class="bg-white">
				<view class="cu-timeline" v-for='item in holidays.data.allHolidays' v-bind:key='item.key'>
					<view  style="padding:30rpx;border-radius: 6rpx;">
						<view class="content shadow-blur"
							:class="{'bg-green light':item.cur,'bg-blue light':(!item.cur&&item.ju>0)}">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view class="" style="display: flex;flex-direction: column;">
									<view class="" style="font-weight: 700;">
										{{item.name}}
									</view>
									<view class="" style="color:#d84e41">
										{{item.date.replace("-",'月')}}日
									</view>
								</view>
								<view class="" style="color:#d84e41">
									{{item.days}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<ad v-if="advB.status == 1 && advB.advId && advB.type == 3" ad-type="video" ad-theme="white"
				:unit-id="advB.advId"></ad>
			<ad v-if="advB.status == 1 && advB.advId && advB.type == 1" :unit-id="advB.advId"></ad>
		</view>
		<view class="tabBar" style="position: fixed;bottom: 0;z-index:10;" v-if="showTabBar"><ax-tabBar
				@setTabBarId="getTabBarId" :id="tabBarId"></ax-tabBar>
		</view>
	</view>
</template>

<script>
	import Calendar from '/components/Li-Calendar/Li-Calendar.vue';
	import {
		e
	} from "/pages/calendar/calendar.js"
	import {
		Solar,
		SolarMonth,
		Lunar,
		HolidayUtil
	} from '/common/lunar.js';
	import {
		Adv
	} from "../../utils/api.js"
	export default {
		components: {
			Calendar
		},
		data() {
			return {
				time:"",
				currentDay:(new Date().getDate()),
				selectDay: '',
				dayStr: '',
				weekStr: '',
				yearStr: '',
				yi: '',
				ji: '',
			}
		},
		created() {
			let curDate = new Date();
			this.selectDay = curDate.getFullYear() + "/" + (curDate.getMonth() + 1) + "/" + curDate.getDate();
			this.render();
		},
		onLoad() {
			// this.render1();
		},
		onReady() {
			// this.scrollPosition1();
		},
		onShow() {
			// this.scrollPosition1();
		},
		methods: {
			render(setDateStr) {
				console.info("开始进行首页下数据渲染:" + setDateStr)
				let dd = setDateStr ? new Date(setDateStr) : new Date(this.selectDay);
				let d = Lunar.fromDate(dd);
				this.dayStr = d.getMonthInChinese() + '月' + d.getDayInChinese();
				this.yearStr = d.getYearInGanZhi() + '(' + d.getYearShengXiao() + ')年';
				this.weekStr = '星期' + d.getWeekInChinese();
				this.ji = d.getDayJi().join(' ');
				this.yi = d.getDayYi().join(' ');
			},
			dayChange(data) {
				this.selectDay = data.time;
				this.render(data.time);
				console.log("日期选择变更", data)
				this.currentDay = data.day;
				console.log(this.currentDay,'curr');
				// this.$set('currentDay',data.day)
			},
			// monthChange(data) {
			// 	console.log("月份选择变更", data)
				
			// },
		}
	}
</script>
<script setup>
	import {
		onLoad,
		onShow,
		onHide,
		onUnload,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {
		Adv,
		videoList,
		getVideoItems,
		getTabBarList,
		
	} from '../../utils/api.js';
	import {
		ref,
		inject,
		computed,
	} from "vue";
	import {
		createAdv,
		clearTimer,
		showAdv,
	} from '../../utils/adv.js';
	import {
		ca
	} from "/pages/calendar/index.js";
	import {share} from "../../utils/share.js"
	const showTabBar = getApp().globalData.showTabBar;
	const topTitle = ref("万年历");
	const appId = inject('appId');
	let tabBarId = ref(null);

	function getTabBarId(item) {
		tabBarId.value = getApp().globalData.tabBarId;
		console.log(tabBarId, 'TABid');
		f_getPage({
			appId: appId.value
		});
	}

	function f_getPage(o) {
		//获取tabBar列表
		getTabBarList(o).then((data) => {
			data.xcxPageList.forEach((element) => {
				//多个的时候只过滤一个
				if (element.pageType == "5" && element.id == tabBarId.value) {
					topTitle.value = element.xcxPage.siteTitle;
					tabBarId.value = element.id;
				}
			})
		})
	}
	const advT = ref({
		
	})
	const advM = ref({
		
	})
	const advB = ref({
		status: null,
		every: null,
		advId: null,
		type: null,
	});
	//全局广告插屏广告
	const advC = ref({
		status: null,
		advId: null,
		intervalNum: null,
		interstitialAd: null,
		firstNow: false,
	});

	function f_getAdv(o) {
		Adv(o).then((res) => {
			let type = null;
			let typeT = null;
			let typeM = null;
			res.advertPlaceConfigs.forEach(element => {
				if (element.title == "bottom_day") {
					type = element.advertTypeId;
					advB.value.status = element.status;
					advB.value.every = element.acticleCnt;
					advB.value.type = element.advertTypeId;
				}
				if (element.title == "top_day") {
					typeT = element.advertTypeId;
					advT.value.status = element.status;
					advT.value.every = element.acticleCnt;
					advT.value.type = element.advertTypeId;
				}
				if (element.title == "middle_day") {
					typeM = element.advertTypeId;
					advM.value.status = element.status;
					advM.value.every = element.acticleCnt;
					advM.value.type = element.advertTypeId;
				}
			});
			res.advertTypes.forEach(element => {
				if (type == element.type) {
					advB.value.advId = element.content.trim();
				}
				if (typeT == element.type) {
					advT.value.advId = element.content.trim();
				}
				if (typeM == element.type) {
					advM.value.advId = element.content.trim();
				}
				
				//插屏广告
				if (element.type == 2) {
					advC.value.status = element.status;
					advC.value.advId = element.content.trim();
					advC.value.intervalNum = element.intervalNum - 0;
				}
				if (advC.value.status) {
					//todo
					createAdv(advC.value);
				}
			});
		})
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
				console.log('arti');
				try {
					data.xcxPageList.forEach((element) => {
						if (element.pageType == "5") {
							let shareTabBarId = element.id;
							console.log(element, 'ele');
							const info = 'path=/pages/calendar/calendar' +
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
		
		if (getApp().globalData.firstPage) {
			advC.value.firstNow = true;
			getApp().globalData.firstPage = false;
		}
		f_getPage({
			appId: appId.value
		});
		holidays.value.nowMonth = new Date().getMonth()+1;
		holidays.value.nowYear = new Date().getFullYear();
		//获取假期列表
		ca.initPageData(holidays);
		// f_getAdv();
	})
	onShow(() => {
		uni.hideTabBar({
			animation: false
		})
		wx.hideShareMenu({
			menus: ['shareTimeline'],
		});
		f_getAdv({
			appId: appId.value,
		});
		tabBarId.value = getApp().globalData.tabBarId;

		if (advC.value.interstitialAd) {
			showAdv(advC.value);
		}
	})
	const holidays = ref({
		title: "",
		desc: "",
		nowDate: new Date(),
		isDown: !1,
		nowMonth:'',
		nowYear:"",
		data: {
			ad: [],
			jiejiariData: {
				activeClass: "active",
				height: 0,
				time: 300,
				list: []
			},
			termData: {
				activeClass: "",
				height: 0,
				time: 300,
				list: []
			},
			hotData: {
				activeClass: "",
				height: 0,
				time: 300,
				list: []
			},
			allHolidays: [],
		},
	});
	function monthChange(data) {
		console.log("月份选择变更", data,'1')
		holidays.value.nowMonth = data.date.split("/")[1];
		holidays.value.nowYear = data.date.split("/")[0];
		console.log(holidays.value.nowMonth,'mo');
		ca.initPageData(holidays);
		console.log('22');
	}
	onHide(() => {
		clearTimer();
	})
	onUnload(() => {
		clearTimer();
	})
	//右上角分享好友
	onShareAppMessage(() => {
		return {
			title: topTitle.value,
			path: '/pages/index/index?' + 'path=/pages/calendar/calendar' + "&tabBarId="+getApp().globalData.tabBarId
			// + '&type=tabBar' + '&share=true' + '&id=' +				newsObject.value.type,
		};
	});
	// onShareAppMessage(() => {
	// 	return {
	// 		title: topTitle.value,
	// 		path: '/pages/calendar/calendar'
	// 		// + '&type=tabBar' + '&share=true' + '&id=' +				newsObject.value.type,
	// 	};
	// });
</script>
<style lang="scss">
	/*每个页面公共css */
	@import "/common/colorui/main.css";
	@import "/common/colorui/icon.css";
</style>