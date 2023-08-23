<template>
	<view class="scene">
		<Scene></Scene>
	</view>
	<view class="element">
		<Element></Element>
	</view>
</template>

<script>
import Scene from './scene/index.vue';
import Element from './element/index.vue';
export default {
	components: { Scene, Element },
	data() {
		return {
			scenceId: ''
		};
	},
	mounted() {
		console.log('interact mounted');
	}
};
</script>

<style lang="scss">
.scene,
.element,
Scene,
Element {
	width: 100%;
	height: 100%;
	z-index: 1;
	position: absolute;
	top: 0px;
	left: 0px;
}

.element,
Element {
	z-index: 10;
}
</style>