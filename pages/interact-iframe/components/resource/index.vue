<template>
	<template v-if="resource.type == 'video'">
		<resourceVideo @loaded="loaded" :id="id" :src="resource.src" :loop="loop"></resourceVideo>
	</template>
	<template v-if="resource.type == 'image'">
		<resourceImage @loaded="loaded" :id="id" :src="resource.src"></resourceImage>
	</template>
</template>

<script>
import resourceAudio from './audio.vue';
import resourceVideo from './video.vue';
import resourceImage from './image.vue';
import resource from '../../js/resource.js';
export default {
	emits: ['loaded'],
	components: { resourceAudio, resourceVideo, resourceImage },
	data() {
		return {
			resource: {}
		};
	},
	props: {
		id: String,
		loop: Boolean
	},
	mounted() {
		this.resource = resource.getById(this.id);
	},
	destroyed() {},
	methods: {
		loaded(ctx) {
			this.$emit('loaded', ctx);
		}
	}
};
</script>

<style></style>
