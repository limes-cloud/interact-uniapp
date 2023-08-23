<template>
	<template v-for="(item, index) in resource" :key="index">
		<resourceAudio
			v-if="item.type == 'audio'"
			v-show="false"
			@loaded="loaded($event, item.id)"
			:is-preload="true"
			:id="item.id"
			:src="item.src"
			:loop="item.loop"
		></resourceAudio>
		<resourceVideo
			v-if="item.type == 'video'"
			v-show="false"
			@loaded="loaded($event, item.id)"
			:is-preload="true"
			:id="item.id"
			:src="item.src"
			:loop="item.loop"
		></resourceVideo>
		<resourceImage
			v-if="item.type == 'image'"
			v-show="false"
			@loaded="loaded($event, item.id)"
			:is-preload="true"
			:id="item.id"
			:src="item.src"
		></resourceImage>
	</template>
</template>

<script>
import resourceAudio from './audio.vue';
import resourceVideo from './video.vue';
import resourceImage from './image.vue';
export default {
	components: { resourceAudio, resourceVideo, resourceImage },
	emits: ['loaded'],
	data() {
		return {};
	},
	props: {
		resource: Array
	},
	methods: {
		loaded(event, id) {
			this.$emit('loaded', event, id);
		}
	}
};
</script>

<style></style>
