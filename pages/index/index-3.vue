<template>
	<view></view>
</template>

<script>
import useApp from './index.js';
export default {
	data() {
		return {
			ctx: null,
			src: 'https://interact-1301828925.cos.ap-chengdu.myqcloud.com/bg.mp3'
		};
	},
	created() {
		console.log(useApp.get());
		// this.ctx = uni.createInnerAudioContext();
		// this.ctx.src = this.src; // 这里为什么会报错
		// this.ctx.loop = true;
		// this.ctx.onCanplay(() => {
		// 	// this.$emit('loaded', ctx);
		// });
	},
	onLoad() {},
	methods: {}
};
</script>

<style></style>
