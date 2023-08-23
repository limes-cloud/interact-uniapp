<template>
	<template v-for="scene in sceneSet" :key="scene.id">
		<view v-show="scene.show" class="scene-item">
			<VideoScene
				v-if="scene.type === 'video'"
				:scene="scene"
				@play="onPlay"
				@waiting="onWaiting"
				@pause="onPause"
				@ended="onEnded"
				@error="onError"
				@timeupdate="onTimeupdate"
				@loaded="onLoaded"
			></VideoScene>
			<ImageScene
				v-if="scene.type === 'image'"
				:scene="scene"
				@play="onPlay"
				@waiting="onWaiting"
				@pause="onPause"
				@ended="onEnded"
				@error="onError"
				@timeupdate="onTimeupdate"
				@loaded="onLoaded"
			></ImageScene>
		</view>
	</template>
</template>

<script>
import VideoScene from './video.vue';
import ImageScene from './image.vue';
import scene from '../../js/scene.js';
import action from '../../js/action.js';
export default {
	data() {
		return {
			sceneSet: {}, //场景集合
			isPlay: false, //是否开始播放
			ctx: null, //具体的实例上下文
			ms: 0 //播放的毫秒数
		};
	},
	components: { VideoScene, ImageScene },
	created() {
		this.sceneSet = scene.get();
		action.setScene(scene);
	},
	methods: {
		onLoaded(ctx, id) {
			scene.setCtx(id, ctx);
			if (id === scene.currentId()) {
				scene.playCurrentScene();
			}
		},
		onPlay() {
			this.isPlay = true;
			this.$emit('play', this.video);
			this.handleTimeupdate();
		},
		onWaiting() {
			this.isPlay = false;
			this.$emit('waiting', this.video);
		},
		onPause() {
			this.isPlay = false;
			this.$emit('pause', this.video);
		},
		onEnded() {
			this.isPlay = false;
			this.$emit('ended', this.video);
		},
		onError() {
			this.isPlay = false;
			this.$emit('error', this.video);
		},
		onTimeupdate(ms) {
			this.ms = ms;
			if (!this.isPlay) {
				this.isPlay = true;
				this.handleTimeupdate();
			}
		},
		// timeupdate触发间隙太大，主动进行修正。
		handleTimeupdate() {
			if (this.isPlay) {
				setTimeout(() => {
					this.ms += 50;
					this.handleTimeupdate();
				}, 50);
				console.log('更新', this.ms);
				// 执行具体的动作逻辑
				scene.timeupdate(this.ms);
			}
		}
	}
};
</script>

<style lang="scss">
.scene-item {
	position: relative;
	display: inline-block;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
}
</style>
