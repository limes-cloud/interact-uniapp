const useApp = {
	ctxs: {},
	update(set) {
		Object.assign(this.ctxs, set);
	},
	get() {
		return this.ctxs
	}
}

export default useApp