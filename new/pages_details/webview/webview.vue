<template>
	<view>
		<web-view :src="href"></web-view>
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
	import { onLoad } from '@dcloudio/uni-app'
	import {
		ref
	} from "vue";
	const href = ref(null);
	onLoad((res) => {
		if (res.src) {
			href.value = res.src;
			console.log(href.value);
		}
	})
</script>

<style lang="scss">

</style>