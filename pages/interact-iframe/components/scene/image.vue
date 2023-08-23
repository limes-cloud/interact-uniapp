<template>
	<Resource :id="scene.resourceId" @loaded="loaded"></Resource>
</template>

<script>
import Resource from '../resource/index.vue';
import resource from '../../js/resource.js';
import scene from '../../js/scene.js';

export default {
	emits: ['play', 'waiting', 'pause', 'ended', 'error', 'timeupdate', 'loaded'],
	components: { Resource },
	props: {
		scene: Object
	},
	data() {
		return {};
	},
	methods: {
		loaded() {
			let ctx = resource.getCtx(this.scene.bgAudioResourceId);

			resource.setPlayFunc(this.scene.bgAudioResourceId, () => {
				this.$emit('play');
			});
			resource.setWaitingFunc(this.scene.bgAudioResourceId, () => {
				this.$emit('waiting');
			});
			resource.setPauseFunc(this.scene.bgAudioResourceId, () => {
				this.$emit('pause');
			});
			resource.setEndedFunc(this.scene.bgAudioResourceId, () => {
				this.$emit('ended');
			});
			resource.setErrorFunc(this.scene.bgAudioResourceId, () => {
				this.$emit('error');
			});
			resource.setTimeupdateFunc(this.scene.bgAudioResourceId, (t) => {
				this.$emit('timeupdate', t);
			});
			this.$emit('loaded', ctx, this.scene.id);
		}
	}
};
</script>

<style></style>
