<template>
	<video
		:id="id"
		:src="src"
		:controls="false"
		object-fit="fill"
		@loadedmetadata="loaded"
		@play="onPlay"
		@pause="onPause"
		@ended="onEnded"
		@waiting="onWaiting"
		@error="onError"
		@progress="onProgress"
		@timeupdate="onTimeupdate"
	></video>
</template>

<script>
import resource from '../../js/resource.js';
export default {
	emits: ['loaded'],
	data() {
		return {
			isLoad: false
		};
	},
	props: {
		isPreload: Boolean,
		id: String,
		src: String
	},
	methods: {
		loaded(res) {
			if (this.isLoad) {
				return;
			}
			this.isLoad = true;
			if (!this.isPreload) {
				const ctx = uni.createVideoContext(this.id, this);
				resource.setCtx(this.id, ctx);
				this.$emit('loaded', ctx);
			} else {
				this.$emit('loaded');
			}
		},
		onPlay() {
			resource.onPlay(this.id);
		},
		onWaiting() {
			resource.onWaiting(this.id);
		},
		onPause() {
			resource.onPause(this.id);
		},
		onEnded() {
			resource.onEnded(this.id);
		},
		onError() {
			resource.onError(this.id);
		},
		onTimeupdate(e) {
			resource.onTimeupdate(this.id, Math.ceil(e.detail.currentTime * 1000));
		}
	}
};
</script>

<style scoped>
video {
	width: 100%;
	height: 100%;
	object-fit: fill;
}
</style>
