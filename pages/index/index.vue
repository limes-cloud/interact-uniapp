<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
			<uv-button
				@click="goto('/pages/interact/landscape')"
				type="primary"
				text="进入横屏"
			></uv-button>
			<uv-button @click="goto('/pages/interact/portrait')" type="primary" text="进入竖屏"></uv-button>
			<uv-button @click="goto('/pages/index/index-2')" type="primary" text="进入测试"></uv-button>
			<uv-button @click="goto('/pages/index/index-3')" type="primary" text="进入测试3"></uv-button>
			<uv-button
				@click="goto('/pages/index/canvas-test')"
				type="primary"
				text="canvas测试"
			></uv-button>

			<uv-button @click="goto('/pages/index/webview')" type="primary" text="webview测试"></uv-button>
			<uv-button
				@click="goto('/pages/interact-iframe/index?fullscreen=true')"
				type="primary"
				text="interact-iframe测试-竖屏"
			></uv-button>

			<uv-button
				@click="goto('/pages/interact-iframe/index?il=true&fullscreen=true')"
				type="primary"
				text="interact-iframe测试-横屏"
			></uv-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '互动视频'
		};
	},
	onLoad() {
		console.log(uni.$uv.os());
	},
	methods: {
		goto(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style>
page {
	overflow: hidden;
}
.content {
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
