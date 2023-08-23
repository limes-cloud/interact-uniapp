<template>
	<template v-for="(element, index) in elementSet" :key="index">
		<view
			v-if="element.show"
			:id="index"
			@mousedown.stop.prevent="touchstart($event, index)"
			@mousemove.stop.prevent="touchmove($event, index)"
			@mouseup.stop.prevent="touchend($event, index)"
			@mouseleave.stop.prevent="touchend($event, index)"
			@touchstart.stop.prevent="touchstart($event, index)"
			@touchmove.stop.prevent="touchmove($event, index)"
			@touchend.stop.prevent="touchend($event, index)"
			@touchcancel.stop.prevent="touchend($event, index)"
			class="elem-item"
			:style="element.style"
		>
			<TextElement v-if="element.type === 'text'" :element="element"></TextElement>
			<ImageElement v-if="element.type === 'image'" :element="element"></ImageElement>
		</view>
	</template>
</template>

<script>
import TextElement from './text.vue';
import ImageElement from './image.vue';

import element from '../../js/element.js';
import setting from '../../js/setting.js';
import action from '../../js/action';

export default {
	data() {
		return {
			elementSet: {},
			isLandscape: false,
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
	components: { TextElement, ImageElement },
	mounted() {
		this.movable.area.width = setting.getWidth();
		this.movable.area.height = setting.getHeight();
		this.isLandscape = !setting.getIsPortrait();
		this.elementSet = element.get();
		action.setElement(element);
	},
	methods: {
		touchstart(e, index) {
			uni.createSelectorQuery()
				.in(this)
				.select('#' + index)
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
		touchmove(e, index) {
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
			this.move(e, index, { x: x, y: y });
		},
		touchend(e, index) {
			this.movable.touch.count++;
			const duration = new Date().getTime() - this.movable.touch.timestamp;
			this.movable.point.x = 0;
			this.movable.point.y = 0;
			if (duration < 500) {
				setTimeout(() => {
					if (this.movable.touch.count == 1) {
						this.click(e, index);
					}
					if (this.movable.touch.count >= 2) {
						this.dbclick(e, index);
					}
					this.movable.touch.count = 0;
					this.movable.touch.timestamp = 0;
				}, 350);
			} else if (this.movable.touch.timestamp) {
				this.movable.touch.count = 0;
				this.movable.touch.timestamp = 0;
				this.longpress(e, index, duration);
			}
		},
		move(e, index, target) {
			if (!this.elementSet[index].events.move) {
				return;
			}
			this.elementSet[index].style.left = target.x + 'px';
			this.elementSet[index].style.top = target.y + 'px';
			action.execActionByIds(this.elementSet[index].events.move);
		},
		click(e, index) {
			if (!this.elementSet[index].events.click) {
				return;
			}
			action.execActionByIds(this.elementSet[index].events.click);
			console.log('单击事件');
		},
		dbclick(e, index) {
			if (!this.elementSet[index].events.dbclick) {
				return;
			}
			action.execActionByIds(this.elementSet[index].events.dbclick);
			console.log('双击事件');
		},
		longpress(e, index, duration) {
			if (!this.elementSet[index].events.longpress) {
				return;
			}
			action.execActionByIds(this.elementSet[index].events.longpress);
			console.log('长按事件');
		}
	}
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
