import action from "./action.js"
export default {
	data: {
		m: {}, //场景集合 id=>配置
		cur_id: "", //当前的场景id
		ctxs: {}, //id=>dom
		funcs: {},
		timelineIndex: 0,
	},
	set(res) {
		this.data.m = res
	},
	// 获取集合
	get() {
		return this.data.m
	},
	// 注册id=>dom的组件控制器
	setCtx(id, ctx) {
		this.data.ctxs[id] = ctx
	},
	// 设置当前需要播放的场景id
	setCurrentSceneId(id) {
		this.data.cur_id = id
	},
	currentId() {
		return this.data.cur_id
	},
	// 播放指定场景
	playSceneById(id) {
		let curScene = this.currentScene()
		if (!!this.data.cur_id) {
			// 隐藏之前的场景
			curScene.show = false
			this.currentCtx().pause()
		}

		// 播放现在的场景
		this.data.id = id
		this.data.timelineIndex = 0

		const nextScene = this.getSceneById(id)
		nextScene.show = true
		// 通过控制上下文播放
		const ctx = this.getCtxById(id)
		ctx.play()

		// 注册当前的ctx到action
		action.setSceneCtx(ctx)
	},
	playCurrentScene() {
		const ctx = this.currentCtx()
		const scene = this.currentScene()
		scene.show = true
		ctx.play()
	},
	pauseCurrentScene() {
		const ctx = this.currentCtx()
		ctx.pause()
	},
	// 获取当前的场景
	currentScene() {
		return this.data.m[this.data.cur_id]
	},
	// 获取指定场景
	getSceneById(id) {
		return this.data.m[id]
	},
	// 获取当前的ctx
	currentCtx() {
		return this.data.ctxs[this.data.cur_id]
	},
	// 获取指定ctx
	getCtxById(id) {
		return this.data.ctxs[id]
	},
	// 设置播放处理
	setPlayFunc(f) {
		this.data.funcs.onPlay = f
	},
	// 设置缓冲处理
	setWaitingFunc(f) {
		this.data.funcs.onWaiting = f
	},
	// 设置暂停播放处理
	setPauseFunc(f) {
		this.data.funcs.onPause = f
	},
	// 设置播放结束处理
	setEndedFunc(f) {
		this.data.funcs.onEnded = f
	},
	// 设置播放错误处理
	setErrorFunc(f) {
		this.data.funcs.onError = f
	},
	// 设置播放进度更新处理函数
	setTimeupdateFunc(f) {
		this.data.funcs.onTimeupdate = f
	},
	// 播放监听
	onPlay() {
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
	},
	// 执行场景更新处理
	timeupdate(ms) {
		const curScene = this.currentScene()
		const index = this.data.timelineIndex
		if (curScene.timeline.length < index) {
			return
		}

		const item = curScene.timeline[index]
		if (item.time * 1000 <= ms && item.status != "end") {
			if (item.status === 'no-exec') {
				// 时间线会触发暂停事件
				this.currentCtx().pause()
				// 设置当前为执行状态
				curScene.timeline[index].status = "exec"
				// 展示当前时间线需要展示的元素
				action.showElementByIds(item.elements)
				// 执行时间线展示事件
				action.execActionByIds(item.lifeCycle.show)
			} else if (item.status === 'exec') {
				// 更新时间线执行结束状态
				curScene.timeline[index].status = "end"
				// 隐藏当前时间线的所有元素
				action.hideElementByIds(item.elements)
				// 执行时间线退出事件
				action.execActionByIds(item.lifeCycle.hide)
				// 时间线下标偏移
				this.data.timelineIndex++
			}
		}
	},
	lifeCycleInit() {
		const scene = this.currentScene()
		action.execActionByIds(scene.lifeCycle.init)
	},
	lifeCycleDestroy() {
		const scene = this.currentScene()
		action.execActionByIds(scene.lifeCycle.destroy)
	},
}

// import {
// 	defineStore
// } from 'pinia';

// import useActionStore from "./action.js"

// const action = useActionStore()


// const useSceneStore = defineStore('scene', {
// 	state: () => {
// 		return {
// 			m: {}, //场景集合 id=>配置
// 			cur_id: "", //当前的场景id
// 			ctxs: {}, //id=>dom
// 			funcs: {},
// 			timelineIndex: 0,
// 		};
// 	},
// 	actions: {
// 		// 设置集合
// 		set(res) {
// 			this.m = res
// 		},
// 		// 获取集合
// 		get() {
// 			return this.m
// 		},
// 		// 注册id=>dom的组件控制器
// 		setCtx(id, ctx) {
// 			this.ctxs[id] = ctx
// 		},
// 		// 设置当前需要播放的场景id
// 		setCurrentSceneId(id) {
// 			this.cur_id = id
// 		},
// 		currentId() {
// 			return this.cur_id
// 		},
// 		toAction() {
// 			action.setScene(this)
// 		},
// 		// 播放指定场景
// 		playSceneById(id) {
// 			let curScene = this.currentScene()
// 			if (!!this.cur_id) {
// 				// 隐藏之前的场景
// 				curScene.show = false
// 				this.currentCtx().pause()
// 			}

// 			// 播放现在的场景
// 			this.id = id
// 			this.timelineIndex = 0

// 			const nextScene = this.getSceneById(id)
// 			nextScene.show = true
// 			// 通过控制上下文播放
// 			const ctx = this.getCtxById(id)
// 			ctx.play()

// 			// 注册当前的ctx到action
// 			action.setSceneCtx(ctx)
// 		},
// 		playCurrentScene() {
// 			const ctx = this.currentCtx()
// 			const scene = this.currentScene()
// 			scene.show = true
// 			ctx.play()
// 		},
// 		pauseCurrentScene() {
// 			const ctx = this.currentCtx()
// 			ctx.pause()
// 		},
// 		// 获取当前的场景
// 		currentScene() {
// 			return this.m[this.cur_id]
// 		},
// 		// 获取指定场景
// 		getSceneById(id) {
// 			return this.m[id]
// 		},
// 		// 获取当前的ctx
// 		currentCtx() {
// 			return this.ctxs[this.cur_id]
// 		},
// 		// 获取指定ctx
// 		getCtxById(id) {
// 			return this.ctxs[id]
// 		},
// 		// 设置播放处理
// 		setPlayFunc(f) {
// 			this.funcs.onPlay = f
// 		},
// 		// 设置缓冲处理
// 		setWaitingFunc(f) {
// 			this.funcs.onWaiting = f
// 		},
// 		// 设置暂停播放处理
// 		setPauseFunc(f) {
// 			this.funcs.onPause = f
// 		},
// 		// 设置播放结束处理
// 		setEndedFunc(f) {
// 			this.funcs.onEnded = f
// 		},
// 		// 设置播放错误处理
// 		setErrorFunc(f) {
// 			this.funcs.onError = f
// 		},
// 		// 设置播放进度更新处理函数
// 		setTimeupdateFunc(f) {
// 			this.funcs.onTimeupdate = f
// 		},
// 		// 播放监听
// 		onPlay() {
// 			if (!this.funcs[id].onPlay) {
// 				return
// 			}
// 			this.funcs[id].onPlay()
// 		},
// 		// 缓冲监听
// 		onWaiting(id, f) {
// 			if (!this.funcs[id].onWaiting) {
// 				return
// 			}
// 			this.funcs[id].onWaiting()
// 		},
// 		// 暂停监听
// 		onPause(id, f) {
// 			if (!this.funcs[id].onPause) {
// 				return
// 			}
// 			this.funcs[id].onPause()
// 		},
// 		// 播放结束监听
// 		onEnded(id, f) {
// 			if (!this.funcs[id].onEnded) {
// 				return
// 			}
// 			this.funcs[id].onEnded()
// 		},
// 		// 错误监听
// 		onError(id, f) {
// 			if (!this.funcs[id].onError) {
// 				return
// 			}
// 			this.funcs[id].onError()
// 		},
// 		// 进度更新监听
// 		onTimeupdate(id, t) {
// 			if (!this.funcs[id].onTimeupdate) {
// 				return
// 			}
// 			this.funcs[id].onTimeupdate(t)
// 		},
// 		// 执行场景更新处理
// 		timeupdate(ms) {
// 			const curScene = this.currentScene()
// 			if (curScene.timeline.length < this.timelineIndex) {
// 				return
// 			}

// 			const item = curScene.timeline[this.timelineIndex]

// 			if (item.time <= ms && item.status != "end") {
// 				if (item.status === 'no-exec') {
// 					// 时间线会触发暂停事件
// 					this.currentCtx().pause()
// 					// 设置当前为执行状态
// 					curScene.timeline[index].status = "exec"
// 					// 展示当前时间线需要展示的元素
// 					action.showElementByIds(item.elements)
// 					// 执行时间线展示事件
// 					action.execActionByIds(item.lifeCycle.show)
// 				} else if (item.status === 'exec') {
// 					// 更新时间线执行结束状态
// 					curScene.timeline[index].status = "end"
// 					// 隐藏当前时间线的所有元素
// 					action.hideElementByIds(item.elements)
// 					// 执行时间线退出事件
// 					action.execActionByIds(item.lifeCycle.hide)
// 					// 时间线下标偏移
// 					this.timelineIndex++
// 				}
// 			}
// 		},
// 		lifeCycleInit() {
// 			const scene = this.currentScene
// 			action.execActionByIds(scene.lifeCycle.init)
// 		},
// 		lifeCycleDestroy() {
// 			const scene = this.currentScene
// 			action.execActionByIds(scene.lifeCycle.destroy)
// 		},
// 	},
// });

// export default useSceneStore