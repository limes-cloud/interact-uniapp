export default {
	data: {
		ctxs: {},
		funcs: {},
		rs: {},
	},
	// 设置控制器
	setCtx(id, ctx) {
		this.data.ctxs[id] = ctx
	},
	// 获取控制器
	getCtx(id) {
		return this.data.ctxs[id]
	},
	set(rs) {
		this.rs = rs
	},
	get() {
		return this.rs
	},
	getById(id) {
		return this.rs[id]
	},
	// 暂停播放所有
	// pauseAll() {
	// 	Object.keys(this.data.ctxs).forEach(key => {
	// 		this.data.ctxs[key].pause()
	// 	})
	// },
	// 初始化函数数据
	init(id) {
		if (!this.data.funcs[id]) {
			this.data.funcs[id] = {}
		}
	},
	// 设置播放处理
	setPlayFunc(id, f) {
		this.init(id)
		this.data.funcs[id].onPlay = f
	},
	// 设置缓冲处理
	setWaitingFunc(id, f) {
		this.init(id)
		this.data.funcs[id].onWaiting = f
	},
	// 设置暂停播放处理
	setPauseFunc(id, f) {
		this.init(id)
		this.data.funcs[id].onPause = f
	},
	// 设置播放结束处理
	setEndedFunc(id, f) {
		this.init(id)
		this.data.funcs[id].onEnded = f
	},
	// 设置播放错误处理
	setErrorFunc(id, f) {
		this.init(id)
		this.data.funcs[id].onError = f
	},
	// 设置播放进度更新处理函数
	setTimeupdateFunc(id, f) {
		this.init(id)
		this.data.funcs[id].onTimeupdate = f
	},
	// 播放监听
	onPlay(id) {
		if (!this.data.funcs[id].onPlay) {
			return
		}
		this.data.funcs[id].onPlay()
	},
	// 缓冲监听
	onWaiting(id, f) {
		if (!this.data.funcs[id].onWaiting) {
			return
		}
		this.data.funcs[id].onWaiting()
	},
	// 暂停监听
	onPause(id, f) {
		if (!this.data.funcs[id].onPause) {
			return
		}
		this.data.funcs[id].onPause()
	},
	// 播放结束监听
	onEnded(id, f) {
		if (!this.data.funcs[id].onEnded) {
			return
		}
		this.data.funcs[id].onEnded()
	},
	// 错误监听
	onError(id, f) {
		if (!this.data.funcs[id].onError) {
			return
		}
		this.data.funcs[id].onError()
	},
	// 进度更新监听
	onTimeupdate(id, t) {
		if (!this.data.funcs[id].onTimeupdate) {
			return
		}
		this.data.funcs[id].onTimeupdate(t)
	}
}