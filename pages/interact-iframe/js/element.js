export default {
	data: {
		element: {},
		el: null,
	},
	set(elems) {
		this.init(elems)
		this.element = elems
	},
	register(el) {
		this.el = el
	},
	get() {
		return this.element
	},
	getById(id) {
		return this.element[id]
	},
	init: function(elems) {
		Object.keys(elems).forEach(key => {
			const el = elems[key]
			elems[key].style = this.parseStyle(el.style)
		})
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
		const toRpxAttr = ["height", "width", "left", "top", "right", "bottom", "padding", "paddingTop",
			"paddingLeft", "paddingRight", "paddingBottom", "lineHeight", "borderWidth", "borderRadius",
			"letterSpacing", "fontSize"
		]

		Object.keys(style).forEach(key => {
			if (toRpxAttr.includes(key) && Number.isFinite(style[key])) {
				console.log(style[key], key)
				style[key] = (style[key] * 2) + "rpx"
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
		if (!animate) {
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
}