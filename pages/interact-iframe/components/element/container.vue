<template>
	<!-- <template v-for="(element, id) in elementSet" :key="id"> -->
	<view
		v-if="element.show"
		:id="element.id"
		@mousedown.stop.prevent="touchstart($event, element.id)"
		@mousemove.stop.prevent="touchmove($event, element.id)"
		@mouseup.stop.prevent="touchend($event, element.id)"
		@mouseleave.stop.prevent="touchend($event, element.id)"
		@touchstart.stop.prevent="touchstart($event, element.id)"
		@touchmove.stop.prevent="touchmove($event, element.id)"
		@touchend.stop.prevent="touchend($event, element.id)"
		@touchcancel.stop.prevent="touchend($event, element.id)"
		class="container"
		:style="element.style"
	>
		<template v-for="id in element.children">
			<!-- <view class=""> -->
			<CustomComponent
				:element="getElementById(id)"
				:width="width"
				:height="height"
			></CustomComponent>
			<!-- </view> -->
		</template>
	</view>
	<!-- </template> -->
</template>

<script>
import CustomComponent from './component.vue';

import element from '../../js/element.js';
import setting from '../../js/setting.js';
import action from '../../js/action';

export default {
	components: { CustomComponent },
	props: {
		element: Object,
		width: Number,
		height: Number,
		isLandscape: Boolean
	},
	computed: {},
	data() {
		return {
			movable: {
				start: {
					x: 0,
					y: 0
				},
				point: {
					x: 0,
					y: 0
				},
				area: {
					width: 0,
					height: 0
				},
				element: {
					width: 0,
					height: 0
				},
				touch: {
					timestamp: 0,
					count: 0,
					timer: null
				}
			}
		};
	},
	mounted() {
		this.movable.area.width = this.width;
		this.movable.area.height = this.height;
	},
	methods: {
		getElementById(id) {
			return element.getById(id);
		},
		touchstart(e, id) {
			uni.createSelectorQuery()
				.in(this)
				.select('#' + id)
				.boundingClientRect((rect) => {
					this.movable.element.width = rect.width;
					this.movable.element.height = rect.height;
				})
				.exec();

			this.movable.point.x = e.touches[0].pageX;
			this.movable.point.y = e.touches[0].pageY;

			if (this.isLandscape) {
				this.movable.start.x = e.touches[0].pageY - e.currentTarget.offsetLeft;
				this.movable.start.y =
					this.movable.area.height - e.touches[0].pageX - e.currentTarget.offsetTop;
			} else {
				this.movable.start.x = e.touches[0].pageX - e.currentTarget.offsetLeft;
				this.movable.start.y = e.touches[0].pageY - e.currentTarget.offsetTop;
			}

			// 处理点击事件
			this.movable.touch.timestamp = new Date().getTime();
		},
		touchmove(e, id) {
			if (this.movable.point.x == 0 || this.movable.point.y == 0) {
				return;
			}
			// 阻止点击之后移动距离过短触发移动事件
			const moveLen =
				Math.abs(e.touches[0].pageX - this.movable.point.x) +
				Math.abs(e.touches[0].pageY - this.movable.point.y);
			if (moveLen <= 2) {
				return;
			}

			// 产生了移动需要重置touch
			this.movable.touch.count = 0;
			this.movable.touch.timestamp = 0;

			if (this.isLandscape) {
				var x = e.touches[0].pageY - this.movable.start.x;
				var y = this.movable.area.height - e.touches[0].pageX - this.movable.start.y;
			} else {
				var x = e.touches[0].pageX - this.movable.start.x;
				var y = e.touches[0].pageY - this.movable.start.y;
			}
			if (x < 0) {
				x = 0;
			}
			if (y < 0) {
				y = 0;
			}
			if (x > this.movable.area.width - this.movable.element.width) {
				x = this.movable.area.width - this.movable.element.width;
			}
			if (y > this.movable.area.height - this.movable.element.height) {
				y = this.movable.area.height - this.movable.element.height;
			}
			this.move(e, id, { x: x, y: y });
		},
		touchend(e, id) {
			this.movable.touch.count++;
			const duration = new Date().getTime() - this.movable.touch.timestamp;
			this.movable.point.x = 0;
			this.movable.point.y = 0;
			if (duration < 500) {
				setTimeout(() => {
					if (this.movable.touch.count == 1) {
						this.click(e, id);
					}
					if (this.movable.touch.count >= 2) {
						this.dbclick(e, id);
					}
					this.movable.touch.count = 0;
					this.movable.touch.timestamp = 0;
				}, 350);
			} else if (this.movable.touch.timestamp) {
				this.movable.touch.count = 0;
				this.movable.touch.timestamp = 0;
				this.longpress(e, id, duration);
			}
		},
		move(e, id, target) {
			if (!this.element.events.move) {
				return;
			}
			this.element.style.left = target.x + 'px';
			this.element.style.top = target.y + 'px';
			action.execActionByIds(this.element.events.move);
		},
		click(e, id) {
			if (!this.element.events.click) {
				return;
			}
			action.execActionByIds(this.element.events.click);
			console.log('单击事件');
		},
		dbclick(e, id) {
			if (!this.element.events.dbclick) {
				return;
			}
			action.execActionByIds(this.element.events.dbclick);
			console.log('双击事件');
		},
		longpress(e, id, duration) {
			if (!this.element.events.longpress) {
				return;
			}
			action.execActionByIds(this.element.events.longpress);
			console.log('长按事件');
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	display: inline-block;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	.elem-item {
		position: relative !important;
	}
}
</style>
