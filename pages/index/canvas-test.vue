<template>
	<view class="page-body">
		<canvas width="300" height="300" canvas-id="canvas"></canvas>
		<video id="video" @play="play" autoplay controls :src="src"></video>
	</view>
</template>

<script>
export default {
	data() {
		return {
			canvasCtx: null,
			videoCtx: null,
			src: 'https://interact-1301828925.cos.ap-chengdu.myqcloud.com/201952003.mp4'
		};
	},
	onReady() {
		this.canvasCtx = uni.createCanvasContext('canvas', this);
		this.videoCtx = uni.createVideoContext('video', this);
	},
	methods: {
		play() {
			console.log(this.canvasCtx);
			this.canvasCtx.drawImage(this.videoCtx, 0, 0, 100, 100);
			// this.canvasCtx.draw();
		}
	}
};
</script>

<style>
canvas {
	width: 300px;
	height: 300px;
}
</style>
