<template>
	<template v-for="(element, id) in elementSet" :key="id">
		<CustomContainer
			v-if="element.type === 'container'"
			:element="element"
			:width="width"
			:height="height"
		></CustomContainer>
		<CustomComponent
			v-else-if="!element.in"
			:element="element"
			:width="width"
			:height="height"
		></CustomComponent>
	</template>
</template>

<script>
import CustomComponent from './component.vue';
import CustomContainer from './container.vue';

import element from '../../js/element.js';
import setting from '../../js/setting.js';
import action from '../../js/action';

export default {
	data() {
		return {
			elementSet: {},
			isLandscape: false,
			width: 0,
			height: 0
		};
	},
	components: { CustomComponent, CustomContainer },
	created() {
		this.width = setting.getWidth();
		this.height = setting.getHeight();
		this.isLandscape = !setting.getIsPortrait();
		this.elementSet = element.get();
		action.setElement(element);
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
// page {
// 	width: 100%;
// 	height: 100%;
// }
.elem-item {
	position: absolute;
	display: inline-block;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
}
</style>
