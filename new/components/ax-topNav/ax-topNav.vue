<template>
	<view class="topNav"
		style="box-sizing: border-box;width:100vw;display: flex;justify-content: center;position: relative;"
		:style="{'background-color':props.color?props.color:'#F43530','height':bottom}">
		<view class="" style="display: flex;align-items: flex-end;justify-content: center;margin-bottom:28rpx;">
			<view class=""
				style="color:white;width:300rpx;overflow: hidden;text-align: center;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;word-break: break-all;">
				<text style="font-size: 34rpx;color:white;"
					:style="{ 'font-size': type == 'ios' ? '34rpx' : '34rpx' }">{{ props.name }}</text>
			</view>
		</view>
		<view class="" v-if="props.back + '' != 'undefined'"
			style="position: absolute;left:0;height:100%;display: flex;">
			<view class=""
				style="height:40rpx; padding:20rpx 0;display: flex;align-items: center;padding: 10rpx 20rpx;background-color: rgba(0, 0, 0, 0.5);border-radius: 25rpx;margin-left:20rpx;"
				:style="{'background-color':props.color?'#F43530':'rgba(0,0,0,0.5)','margin-top':top}"
				@click="f_navBack">
				<view class="" style="width:30rpx;height:30rpx;"><img
						:src="props.color?'/static/svg/s-left_gold.svg':'/static/svg/s-left.svg'" alt=""
						style="width: 100%;height:100%;vertical-align: top;" /></view>
				<view class="" style=""><text style="word-wrap:unset;font-size: 30rpx;"
						:style="{color:props.color?'gold':'white'}">返回</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ax-topNav',
		data() {
			return {};
		},
	};
</script>
<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		ref,
		watch,
	} from 'vue';
	//需要返回，返回的页面
	const props = defineProps(['back', 'name', 'isShare', 'backPage', 'color', 'backId']);
	let type = ref('');
	const menuButtonInfo = ref(null);
	const top = ref('0px');
	const bottom = ref('0px');
	onLoad(() => {
		uni.getSystemInfo({
			success(e) {
				type.value = e.osName;
			},
		});
		menuButtonInfo.value = uni.getMenuButtonBoundingClientRect();
		top.value = menuButtonInfo.value.top + 'px';
		bottom.value = menuButtonInfo.value.bottom + 10 + 'px';
	});

	function f_navBack() {
		if (props.isShare) {
			if (props.backPage) {
				getApp().globalData.tabBarId = props.backId;
				uni.switchTab({
					url: props.backPage,
				});
			}
		} else {
			uni.navigateBack({
				fail: () => {
					if (props.backPage) {
						getApp().globalData.tabBarId = props.backId;
						uni.switchTab({
							url: props.backPage,
						});
					}
				}
			});
		}
	}
</script>
<style lang="scss"></style>