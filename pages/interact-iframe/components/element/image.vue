<template>
	<Resource :id="element.resourceId"></Resource>
</template>

<script>
import Resource from '../resource/index.vue';
export default {
	props: {
		element: Object
	},
	components: { Resource },
	methods: {
		onload(e) {
			// console.log(e);
		}
	}
};
</script>

<style>
.image {
	width: 100%;
	height: 100%;
	display: inline-block;
}
</style>
