<template>
	<view class="loading">
		<uv-loading-icon mode="spinner" :text="loadText"></uv-loading-icon>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loadText: ''
		};
	},
	props: {
		text: String,
		count: Number,
		current: Number
	},
	watch: {
		current: {
			handler(newVal, oldVal) {
				this.setText();
			}
		}
	},
	mounted() {
		this.setText();
	},
	methods: {
		setText() {
			if (!this.text) {
				this.loadText = '资源加载中：' + this.current + '/' + this.count;
			} else {
				this.loadText = this.text;
			}
		}
	}
};
</script>

<style lang="scss">
.loading {
	width: 100%;
	height: 100%;
	position: absolute;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: #000;
	z-index: 100;
}
</style>
