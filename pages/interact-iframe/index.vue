<template>
	<view
		@touchmove.stop.prevent="() => {}"
		class="interact-iframe"
		:style="{
			height: height + 'px',
			width: width + 'px',
			transform: isPortrait ? '' : 'rotateZ(90deg) translateY(-' + height + 'px)'
		}"
	>
		<Loading v-if="isLoading" :count="resourceCount" :current="loadedResourceCount"></Loading>
		<Interact v-if="isLoaded"></Interact>
		<preLoadResource
			v-if="preLoad"
			:resource="interact.data.resource"
			@loaded="resourceLoaded"
		></preLoadResource>
	</view>
</template>

<script>
import getMock from './mocki/mocki.js';
import Interact from './components/interact.vue';
import preLoadResource from './components/resource/preload.vue';
import Loading from './components/loading/loading.vue';
import toolJs from './js/tool.js';
import { getSysInfo } from '../../util/lib/index.js';

import scene from './js/scene.js';
import setting from './js/setting.js';
import element from './js/element.js';
import resource from './js/resource.js';
import action from './js/action.js';
export default {
	components: { Interact, preLoadResource, Loading },
	data() {
		return {
			width: 375,
			height: 667,
			isPortrait: true, //是否竖屏
			isLoading: true,
			isLoaded: false,
			currentSceneId: '',
			currentSceneTime: 0,
			preLoad: false,
			loadedResourceCount: 0,
			resourceCount: 0,
			resource: {},
			scene: {},
			element: {}
		};
	},
	onLoad(query) {
		this.init(query);
		this.getInteract();
	},
	onUnload() {
		audio.pauseAll();
	},
	destroyed() {
		audio.pause();
	},
	methods: {
		async init(query) {
			if (query.w) {
				this.width = Number(query.w);
			}
			if (query.h) {
				this.height = Number(query.h);
			}
			if (query.il) {
				this.isPortrait = false;
			}

			if (query.fullscreen) {
				const info = await getSysInfo();
				this.width = info.screenWidth;
				this.height = info.screenHeight;
			}

			// 横屏时转换宽高
			if (!this.isPortrait) {
				const temp = this.width;
				this.width = this.height;
				this.height = temp;
			}

			setting.set(this.width, this.height, this.isPortrait);
		},
		getInteract() {
			this.interact = getMock();
			this.resourceCount = this.interact.data.resource.length;
			this.currentSceneId = this.interact.data.scene[0].id;
			// 转换resource数组为集合
			this.resource = toolJs.listToSet(this.interact.data.resource);
			// 转换为scene数组为集合
			this.scene = toolJs.listToSet(this.interact.data.scene);
			// 处理样式转换
			this.element = toolJs.listToSet(this.interact.data.element);
			// 执行将动作转换
			this.action = toolJs.listToSet(this.interact.data.action);
			// 开始预加载
			this.preLoad = true;
		},
		// 处理资源预加载
		resourceLoaded(res, id) {
			// 挂载原始对象到source字段上
			this.resource[id].source = res;
			this.loadedResourceCount++;
			if (this.resourceCount == this.loadedResourceCount) {
				resource.set(this.resource);
				scene.set(this.scene);
				scene.setCurrentSceneId(this.currentSceneId);
				element.set(this.element);
				action.set(this.action);
				this.isLoading = false;
				this.preLoad = false;
				this.isLoaded = true;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.interact-iframe {
	width: 100%;
	height: 100%;
	background-color: white;
	top: 0;
	left: 0px;
	position: fixed;
	overflow: hidden;
	background-color: #fff;
	transform-origin: 0px 0px 0px;
}
</style>
