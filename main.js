import App from './App'
import vconsole from "vconsole"
import uvUI from '@/uni_modules/uv-ui-tools'
import * as Pinia from 'pinia';

// // #ifndef VUE3
// import Vue from 'vue'
// import './uni.promisify.adaptor'
// Vue.config.productionTip = false
// App.mpType = 'app'
// const app = new Vue({
// 	...App
// })

// // 挂载插件
// Vue.use(uvUI)
// // #ifdef H5
// Vue.use(new vconsole())
// // #endif

// app.$mount()
// // #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	// 挂载插件
	app.use(uvUI)
	app.use(Pinia.createPinia());

	// #ifdef H5
	// app.use(new vconsole())
	// #endif

	return {
		app
	}
}
// #endif