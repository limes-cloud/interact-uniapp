export default {
	data: {
		action: {},
		scene: null,
		element: null,
	},
	set(action) {
		this.data.action = action
	},
	setScene(scene) {
		this.data.scene = scene
	},
	setElement(element) {
		this.data.element = element
	},
	// 通过id列表执行
	execActionByIds(ids) {
		ids.forEach((id) => {
			this.execActionById(id)
		});
	},
	// 查找指定的动作
	execActionById(id) {
		const action = this.data.action[id]
		switch (action.type) {
			case "playSceneById":
				this.playSceneById(action.data);
				break;
			case "playScene":
				this.playScene();
				break;
			case "pauseScene":
				this.pauseScene();
				break;
			case "playAudioById":
				this.playAudioById();
				break;
			case "pauseAudioById":
				this.pauseAudioById();
				break;
			case "pauseAudioById":
				this.pauseAudioById();
				break;
			case "pauseAudioById":
				this.pauseAudioById();
				break;
			case "hideElementByIds":
				this.hideElementByIds(action.data);
				break;
			case "showElementByIds":
				this.showElementByIds(action.data);
				break;
		}
	},
	// todo 

	// 从指定时间播放
	playSceneSeek(that, time) {
		that.ctx.currentTime = time
		that.ctx.play()
	},
	// 播放指定场景
	playSceneById(id) {
		console.log("播放指定视频")
		this.scene.setCurrentScene(id)
		this.scene.startPlay()
	},
	// 播放当前场景
	playScene() {
		console.log("播放当前视频")
		this.data.scene.play()
	},
	// 暂停播放当前场景
	pauseScene() {
		console.log("暂停当前视频")
		this.data.scene.pause()
	},
	// 播放指定音乐
	playAudioById(id) {
		console.log("播放指定音乐")
		useAudioStore().get(id).play()
	},
	pauseAudioById(id) {
		console.log("暂停指定音乐")
		useAudioStore().get(id).pause()
	},
	showElementByIds(ids) {
		ids.forEach((id) => {
			this.showElementById(id)
		});
	},
	// 隐藏指定id列表的元素
	hideElementByIds(ids) {
		ids.forEach((id) => {
			this.hideElementById(id)
		});
	},
	showElementById(id) {
		const elem = this.data.element.getById(id)
		elem.show = true
		if (elem.showAnimate && elem.showAnimate.length) {
			Object.assign(elem.style, this.data.element.parseAnimate(elem.showAnimate))
		}
	},
	// 隐藏指定id列表的元素
	hideElementById(id) {
		const elem = this.data.element.getById(id)
		if (elem.hideAnimate && elem.hideAnimate.length) {
			Object.assign(elem.style, this.data.element.parseAnimate(elem.hideAnimate))
		} else {
			elem.show = false
		}
	},
}