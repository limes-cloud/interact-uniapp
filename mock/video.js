export default {
	"scene": [{
		"id": "scene_001",
		"time": 1,
		"duration": 60,
		"type": "video",
		"src": "https://interact-1301828925.cos.ap-chengdu.myqcloud.com/201952003.mp4",
		"timeline": [{
			"time": 3,
			"elements": ["element_001", "element_002"],
			"lifeCycle": {
				"show": ["action_xxx", "actionxxx"],
				"hide": ["action_xxx", "actionxxx"],
				"init": ["action_xxx", "actionxxx"],
				"destroy": ["action_xxx", "actionxxx"]
			}
		}],
		"lifeCycle": {
			"show": ["action_xxx", "actionxxx"],
			"hide": ["action_xxx", "actionxxx"],
			"init": ["action_xxx", "actionxxx"],
			"destroy": ["action_xxx", "actionxxx"]
		}
	}],
	"element": [{
		"id": "element_001",
		"type": "text",
		"show": true,
		"text": "hello world\n你好\n你在干嘛\nhello world\n你好\n你在干嘛",
		"style": {
			"zIndex": 2,
			"border": "1px solid red",
			"white-space": "nowarp",
			"padding": 20,
			"color": "#fff",
			"height": 100,
			"width": 50,
			"top": 100,
			"left": 200,
			"overflowY": "scroll"
		},
		"enableEvent": {
			"move": true,
		},
		"animation": "xxx",
		"events": ["event_xxx", "event_xxx"]
	}, {
		"id": "element_002",
		"type": "image",
		"show": true,
		"src": "https://interact-1301828925.cos.ap-chengdu.myqcloud.com/No1img5.png",
		"style": {
			"border": "1px solid red",
			"padding": 40,
			"color": "#fff",
			"height": 100,
			"width": 100
		},
		"enableEvent": {
			"click": true,
		},
		"animation": "xxx",
		"events": ["event_xxx", "event_xxx"]
	}],
	"event": [{
		"id": "event_xxx",
		"type": "click",
		"actions": ["action_xxx", "action_xxx"]
	}],
	"action": [{
		"id": "action_xxx",
		"type": "playMusic",
		"resource": [""]
	}]

}