<template>
	<!-- 浮动框的父组件 -->
	<view>
		<view class="" v-for="(item,index) in flashList" :key="index" >
			<ax-flashGet class="flash" :index="index" :appId="item.jumpAppid" :href="item.jumpPath" :isApp="item.type==1?false:true" :img="item.icon">
			</ax-flashGet>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ax-Flash",
		data() {
			return {
				
			};
		}
	}
</script>
<script setup>
	// import 'ax-flashGet' from "/componetns/ax-flashGet/ax-flashGet"
	const flashList = getApp().globalData.flashList;
</script>
<style lang="less">

</style>