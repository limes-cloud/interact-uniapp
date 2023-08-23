// 引入配置
import config from '@/common/config'

export default {
	// event:{

	// },

	element: {
		init: function(elementList) {
			elementList.forEach((elem, index) => {
				elementList[index].style = this.parseStyle(elem.style)
				// 处理动画
				Object.assign(elementList[index].style, this.parseAnimate(elem.animate))
			})
			return elementList
		},
		isSetStyle: function(attr) {
			if (!attr) {
				return false
			}
			let is = false
			Object.keys(attr).forEach(key => {
				is = is || !!attr[key]
			})
			return is
		},
		parseStyle: function(style) {
			const toRpxAttr = ["height", "width", "left", "top", "right", "bottom", "paddingTop", "paddingLeft",
				"paddingRight", "paddingBottom", "lineHeight", "borderWidth", "borderRadius",
				"letterSpacing", "fontSize"
			]

			Object.keys(style).forEach(key => {
				if (toRpxAttr.includes(key) && Number.isFinite(style[key])) {
					console.log(style[key], key)
					style[key] = (style[key] * 2) + "rpx"
					// style[key] = (style[key]) + "px"
				}
			})

			// 处理特殊的css
			if (style.backgroundImage) {
				style.backgroundImage = 'url(' + config.cosUrl + style.backgroundImage + ')'
			}

			// 处理transform
			if (this.isSetStyle(style.transform)) {
				let attr = []
				Object.keys(style.transform).forEach(key => {
					attr.push(`${key}(${style.transform[key]}deg)`)
				})
				style.transform = attr.join(" ")
			}

			// 处理box-shadow
			if (this.isSetStyle(style.boxShadow)) {
				style.boxShadow = `${style.shadowX} ${style.shadowX} ${style.shadowX} ${style.shadowColor}`
			}
			return style

		},
		parseAnimate: function(animate) {
			if (!!!animate) {
				return {}
			}
			const types = []
			const speeds = []
			const durations = []
			const counts = []
			const delays = []
			const animationFillModes = []
			for (const i in animate) {
				const item = animate[i]
				if (!item.type) continue
				if (i === 'out' && item.delay <= 0) continue

				item.count = item.count === 0 ? 1 : item.count
				types.push(item.type)
				speeds.push(item.speed + 's')
				durations.push(item.duration + 's')
				counts.push(item.count === -1 ? 'infinite' : item.count)
				delays.push(item.delay + 's')
				animationFillModes.push('forwards')
			}
			return {
				animationName: types.join(','),
				animationDuration: durations.join(','),
				animationTimingFunction: speeds.join(','),
				animationDelay: delays.join(','),
				animationIterationCount: counts.join(','),
				animationFillMode: animationFillModes.join(',')
			}
		}
	},
	resource: {
		preloadVideo(id, src) {
			return new Promise((resolve, reject) => {
				const videoContext = uni.createVideoContext('myVideo', this);
				// 'myVideo' 是 video 组件的 id
				videoContext.src = src;

				// 设置事件监听器以确保视频加载成功
				videoContext.onLoadedmetadata(() => {
					resolve(videoContext);
				});

				// 处理视频加载失败的情况
				videoContext.onError((error) => {
					reject(error);
				});
			});
		},
		preloadAudio(src) {
			return new Promise((resolve, reject) => {
				const audioContext = uni.createInnerAudioContext();
				audioContext.src = src;

				// 设置事件监听器以确保音频加载成功
				audioContext.onCanplay(() => {
					resolve(audioContext);
				});

				// 处理音频加载失败的情况
				audioContext.onError((error) => {
					reject(error);
				});
			});
		},
		// preloadImage(src) {
		// 	return new Promise((resolve, reject) => {
		// 		uni.getImageInfo({
		// 			src: src,
		// 			success: (res) => {
		// 				resolve(res.path);
		// 			},
		// 			fail: (error) => {
		// 				reject(error);
		// 			},
		// 		});
		// 	});
		// }
	}

}

// export default obj