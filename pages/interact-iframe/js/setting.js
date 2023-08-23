export default {
	data: {
		width: 0,
		height: 0,
		is_portrait: true,
	},
	set(width, height, is_portrait) {
		this.data.width = width
		this.data.height = height
		this.data.is_portrait = is_portrait
	},
	getWidth() {
		return this.data.width
	},
	getHeight() {
		return this.data.height
	},
	getIsPortrait() {
		return this.data.is_portrait
	}
}