<template>
	<!-- 浮动框组件 -->
		<view id="flashGet" class="" style="position:absolute;top:65%;right:0;z-index:10;border-radius: 10rpx;" :style="{'left':offsetLeft+'px!important','top':offsetTop+'px!important',
		transform:'translateY('+110 * props.index +'%)'}" @touchstart="f_start" @touchmove="f_move" @touchend="f_end" @click="f_navigateNewMiNi">
			<view class="" v-for="(item,index) in list" :key="index" style="width:140rpx;height:140rpx;border-radius: 10rpx;overflow: hidden;margin:2px;">
				<image :src="'https://xcx.wujingchuanmei.com/api' + props.img" mode="" style="width:100%;height:100%;"></image>
			</view>
		</view>
</template>

<script>
	export default {
		name:"ax-flashGet",
		data() {
			return {
				
			};
		}
	}
</script>
<script setup>
	import { ref,onMounted, getCurrentInstance} from 'vue';
	const props = defineProps(["index","appId","href","isApp",'img']);
	const {proxy} = getCurrentInstance();
	const list = ref([{id:0}])
	const h = ref(null);
	const w = ref(null);
	const screenWidth = ref(null);
	const screenHeight = ref(null);
	const topHeight = ref(null);
	const isT = ref(null);
	//初始元素位置
	const offsetLeft = ref(null);
	const offsetTop = ref(null);
	
	const clientLeft = ref(null);
	const clientTop = ref(null);
	
	const startPoint = ref({});
	function f_start(e){
		offsetLeft.value = e.currentTarget.offsetLeft;
		offsetTop.value = e.currentTarget.offsetTop;
		startPoint.value = e.changedTouches[0];
	}
	function f_move(e){
		let x,y;		
		x = e.changedTouches[0].clientX - startPoint.value.clientX;
		y = e.changedTouches[0].clientY - startPoint.value.clientY;
		offsetLeft.value += x;
		offsetTop.value += y;
		if(offsetLeft.value < 0){
			offsetLeft.value = 0;
		}
		if(offsetTop.value - topHeight.value + h.value*1.1*props.index < 0){
			offsetTop.value = topHeight.value - h.value*1.1*props.index;
		}
		if(offsetLeft.value + w.value > screenWidth.value){
			offsetLeft.value = screenWidth.value - w.value;
		}
		if(offsetTop.value + h.value + h.value*1.1*props.index > screenHeight.value){
			offsetTop.value = screenHeight.value - h.value - h.value*1.1*props.index;
		}
		startPoint.value = e.changedTouches[0];
	}
	function f_end(e){
		startPoint.value = e.changedTouches[0]
	}
	onMounted(()=>{
		uni.getSystemInfo({
			success(data) {
				screenWidth.value = data.windowWidth;
				screenHeight.value = data.windowHeight;
			}
		})
		let menuButton = uni.getMenuButtonBoundingClientRect();
		topHeight.value = menuButton.bottom + 10;
		uni.createSelectorQuery().in(proxy).select("#flashGet").boundingClientRect((data)=>{
			h.value = data.height;
			w.value = data.width;
		}).exec();
	})
	//跳转别的小程序
	function f_navigateNewMiNi(){
		if(props.isApp){
			console.log('isapp');
			uni.navigateToMiniProgram({
				appId:props.appId,
				path:props.href
			})
		}else{
			uni.navigateTo({
				url:"/pages_details/webview/webview?src=" + props.href
			})
		}
	}
	
</script>

<style lang="scss">
</style>