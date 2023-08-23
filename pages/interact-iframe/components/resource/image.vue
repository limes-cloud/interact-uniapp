<template>
	<image :src="src" @load="load"></image>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		isPreload: Boolean,
		id: String,
		src: String
	},
	emits: ['loaded'],
	methods: {
		load(res) {
			this.$emit('loaded', res, this);
		}
	}
};
</script>

<style scoped>
image {
	width: 100%;
	height: 100%;
}
</style>
