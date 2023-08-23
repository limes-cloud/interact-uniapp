<template>
	<view class="page-body">
		<page-head title="movable-view,可拖动视图"></page-head>
		<div class="movable-area">
			<view
				ref="movable"
				@touchstart.stop.prevent="touchstart"
				@touchmove.stop.prevent="touchmove"
				@touchend="touchend"
				@touchcancel="touchcancel"
				class="movable-view"
				:style="{ top: point.y + 'px', left: point.x + 'px' }"
			>
				text
			</view>
		</div>
	</view>
</template>

<script>
import useApp from './index.js';
export default {
	data() {
		return {
			start: {
				x: 0,
				y: 0
			},
			point: {
				x: 0,
				y: 0
			},
			max: {
				x: 375,
				y: 623
			},
			el: {
				width: 75,
				height: 75
			},
			isLandscape: false
		};
	},
	mounted() {
		const key = new Date().getTime();
		useApp.update({ key: key });
		console.log(useApp.get());
	},
	methods: {
		touchstart(e) {
			console.log(uni.$uv.sys());
			if (this.isLandscape) {
				this.start.x = e.touches[0].pageY - e.target.offsetLeft;
				this.start.y = this.max.x - e.touches[0].pageX - e.target.offsetTop;
			} else {
				this.start.x = e.touches[0].pageX - e.target.offsetLeft;
				this.start.y = e.touches[0].pageY - e.target.offsetTop;
			}
			console.log(this.start);
		},
		touchmove(e) {
			if (this.isLandscape) {
				var x = e.touches[0].pageY - this.start.x;
				var y = this.max.x - e.touches[0].pageX - this.start.y;
			} else {
				var x = e.touches[0].pageX - this.start.x;
				var y = e.touches[0].pageY - this.start.y;
			}

			if (x < 0) {
				x = 0;
			}
			if (y < 0) {
				y = 0;
			}

			if (this.isLandscape) {
				if (x > this.max.y - this.el.width) {
					x = this.max.y - this.el.width;
				}
				if (y > this.max.x - this.el.height) {
					y = this.max.x - this.el.height;
				}
			} else {
				if (x > this.max.x - this.el.width) {
					x = this.max.x - this.el.width;
				}
				if (y > this.max.y - this.el.height) {
					y = this.max.y - this.el.height;
				}
			}

			this.point.x = x;
			this.point.y = y;
		},

		touchend(e) {
			console.log('end');
			console.log(e);
		},
		touchcancel(e) {
			console.log('cancel');
			console.log(e);
		}
	}
};
</script>

<style>
.movable-area {
	width: 100vh;
	height: 100vw;
	/* 	transform-origin: 0px 0px 0px;
	transform: rotateZ(90deg) translateY(-100vw); */
	transition: 1s;
	background-color: #d8d8d8;
	position: relative;
}

.movable-view {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 150rpx;
	width: 150rpx;
	background-color: #007aff;
	color: #fff;
	position: absolute;
}

/* movable-area {
	height: 100vh;
	width: 100vw;
	background-color: #d8d8d8;
	position: relative;
} */
</style>
