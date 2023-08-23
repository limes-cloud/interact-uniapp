<template>
	<view></view>
</template>

<script>
import resource from '../../js/resource.js';

export default {
	data() {
		return {
			ctx: null
		};
	},
	emits: ['loaded'],
	props: {
		isPreload: Boolean,
		id: String,
		src: String,
		loop: Boolean
	},
	created() {
		if (this.isPreload) {
			const ctx = uni.createInnerAudioContext();
			ctx.src = this.src;
			ctx.loop = this.loop;
			ctx.onCanplay(() => {
				resource.setCtx(this.id, ctx);
				this.$emit('loaded', ctx);
			});
			ctx.onPlay(this.onPlay);
			ctx.onWaiting(this.onWaiting);
			ctx.onPause(this.onPause);
			ctx.onEnded(this.onEnded);
			ctx.onError(this.onError);
			ctx.onTimeUpdate(() => {
				this.onTimeupdate(ctx);
			});
		} else {
			this.$emit('loaded');
		}
	},
	onLoad() {},
	methods: {
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
		onTimeupdate(ctx) {
			resource.onTimeupdate(this.id, Math.ceil(ctx.currentTime * 1000));
		}
	}
};
</script>

<style></style>