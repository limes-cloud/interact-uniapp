<template>
	<Resource :id="scene.resourceId" @loaded="loaded"></Resource>
</template>

<script>
import Resource from '../resource/index.vue';
import resource from '../../js/resource.js';

export default {
	emits: ['play', 'waiting', 'pause', 'ended', 'error', 'timeupdate', 'loaded'],
	components: { Resource },
	props: {
		scene: Object
	},
	data() {
		return {};
	},
	async mounted() {},
	methods: {
		loaded() {
			const ctx = resource.getCtx(this.scene.resourceId);
			resource.setPlayFunc(this.scene.resourceId, () => {
				this.$emit('play');
			});
			resource.setWaitingFunc(this.scene.resourceId, () => {
				this.$emit('waiting');
			});
			resource.setPauseFunc(this.scene.resourceId, () => {
				this.$emit('pause');
			});
			resource.setEndedFunc(this.scene.resourceId, () => {
				this.$emit('ended');
			});
			resource.setErrorFunc(this.scene.resourceId, () => {
				this.$emit('error');
			});
			resource.setTimeupdateFunc(this.scene.resourceId, (t) => {
				this.$emit('timeupdate', t);
			});
			this.$emit('loaded', ctx, this.scene.id);
		}
	}
};
</script>

<style></style>
