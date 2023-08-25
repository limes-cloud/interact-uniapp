<template>
	<view>
		<DynamicComponent :config="jsonConfig" />
	</view>
</template>
<script>
import CustomImage from './custom-image.vue';
import CustomContainer from './custom-container.vue';
import { h } from 'vue';
export default {
	components: {
		CustomImage,
		CustomContainer,
		DynamicComponent: {
			// 递归组件，根据传入的配置渲染对应组件
			props: ['config'],
			render() {
				const { component, data, children } = this.config;

				// 渲染子组件
				const childComponents = children
					? children.map((childConfig) =>
							h('DynamicComponent', { props: { config: childConfig } })
					  )
					: [];
				console.log(component, childComponents);
				// 根据组件名称动态生成组件
				return h(CustomContainer, { props: data }, childComponents);
			}
		}
	},
	data() {
		return {
			jsonConfig: {
				component: 'CustomContainer',
				children: [
					{
						component: 'CustomImage',
						data: {
							src: 'path/to/inner-image.jpg',
							alt: 'An inner example image'
						}
					},
					{
						component: 'CustomImage',
						data: {
							src: 'path/to/inner-image.jpg',
							alt: 'An inner example image'
						}
					}
				]
			}
		};
	}
};
</script>