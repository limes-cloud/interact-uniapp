export default function getMock() {
	return {
		// orientation : "portrait", landscape
		orientation: "portrait",
		title: "测试视频",
		desc: "这是一个测试视频",
		data: {
			scene: [
				// {
				// 	id: "scene_001",
				// 	time: 2,
				// 	duration: 60,
				// 	type: "image",
				// 	resourceId: "resource_001",
				// 	bgAudioResourceId: "resource_002",
				// 	timeline: [{
				// 		time: 3,
				// 		status: 'no-exec', //no-exec exec end
				// 		elements: ["element_001", "element_002"],
				// 		lifeCycle: {
				// 			show: [],
				// 			hide: []
				// 		}
				// 	}],
				// 	lifeCycle: {
				// 		init: [],
				// 		destroy: ["action_001"]
				// 	}
				// },
				{
					id: "scene_002",
					time: 2,
					duration: 60,
					type: "video",
					resourceId: "resource_003",
					timeline: [{
						time: 1,
						status: 'no-exec',
						elements: [],
						lifeCycle: {
							show: ["action_005"],
							hide: []
						},
					}],
					lifeCycle: {
						init: [],
						destroy: ["action_002"]
					}
				}
			],
			element: [{
				id: "element_001",
				type: "text",
				show: false,
				text: "hello world\n你好\n你在干嘛\nhello world\n你好\n你在干嘛",
				showAnimate: [{
					count: 1,
					type: "bounceInRight",
					timing: 'initial',
					duration: 1,
					delay: 0,
				}],
				hideAnimate: [{
					count: 1,
					type: "bounceOutDown",
					timing: 'initial',
					duration: 1,
					delay: 1,
				}],
				style: {
					zIndex: 2,
					border: "1px solid red",
					borderRadius: "4px",
					whiteSpace: "nowarp",
					padding: 20,
					color: "#fff",
					height: 100,
					width: 50,
					top: 100,
					left: 200,
					overflowY: "scroll"
				},
				events: {
					"click": ["action_003"],
				}
			}, {
				id: "element_002",
				type: "text",
				show: false,
				text: "he1111llo world\n你好\n你在干嘛\nhello world\n你好\n你在干嘛",
				style: {
					zIndex: 2,
					border: "1px solid red",
					borderRadius: "4px",
					whiteSpace: "nowarp",
					padding: 20,
					color: "#fff",
					height: 100,
					width: 50,
					top: 180,
					left: 200,
					overflowY: "scroll"
				},
				events: {
					"click": ["action_003"],
				}
			}, {
				id: "element_003",
				type: "image",
				show: false,
				resourceId: "resource_001",
				style: {
					zIndex: 2,
					border: "1px solid red",
					borderRadius: "4px",
					whiteSpace: "nowarp",
					padding: 20,
					color: "#fff",
					height: 100,
					width: 50,
					top: 180,
					left: 200,
					overflowY: "scroll"
				},
				events: {
					"click": ["action_003"],
				}
			}, {
				id: "element_004",
				type: "container",
				show: false,
				children: ["element_006", "element_005"],
				style: {
					zIndex: 2,
					border: "1px solid red",
					borderRadius: "4px",
					whiteSpace: "nowarp",
					padding: 20,
					display: "flex",
					color: "#fff",
					height: "auto",
					width: "100%",
					top: 280,
					left: 0,
					flexDirection: "row",
					justifyContent: "space-around",
					overflowY: "scroll"
				},
				events: {
					"click": ["action_003"],
				}
			}, {
				id: "element_005",
				in: "element_004",
				type: "text",
				show: false,
				text: "he1111llo world\n你好\n你在干嘛\nhello world\n你好\n你在干嘛",
				style: {
					zIndex: 2,
					border: "1px solid red",
					borderRadius: "4px",
					whiteSpace: "nowarp",
					padding: 20,
					color: "#fff",
					height: 100,
					width: 50,
					overflowY: "scroll"
				},
				events: {
					"click": ["action_003"],
				}
			}, {
				id: "element_006",
				in: "element_004",
				type: "text",
				show: false,
				text: "he1111llo world\n你好\n你在干嘛\nhello world\n你好\n你在干嘛",
				style: {
					zIndex: 2,
					border: "1px solid red",
					borderRadius: "4px",
					whiteSpace: "nowarp",
					padding: 20,
					color: "#fff",
					height: 100,
					width: 50,
					overflowY: "scroll"
				},
				events: {
					"click": ["action_003"],
				}
			}],
			action: [{
				id: "action_001",
				type: "playSceneById",
				data: "scene_002"
			}, {
				id: "action_002",
				type: "playSceneById",
				data: "scene_001"
			}, {
				id: "action_003",
				type: "playScene",
			}, {
				id: "action_004",
				type: "hideElementByIds",
				data: ["element_001"]
			}, {
				id: "action_005",
				type: "showElementByIds",
				data: ["element_004"]
			}],
			resource: [{
				id: "resource_001",
				type: "image",
				src: "https://interact-1301828925.cos.ap-chengdu.myqcloud.com/bg.png"
			}, {
				id: "resource_002",
				type: "audio",
				src: "https://interact-1301828925.cos.ap-chengdu.myqcloud.com/bg.mp3",
				loop: true,
			}, {
				id: "resource_003",
				type: "video",
				src: "https://interact-1301828925.cos.ap-chengdu.myqcloud.com/201952003.mp4",
				loop: false,
			}]
		}
	}
}