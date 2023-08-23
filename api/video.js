const {
	http
} = uni.$uv

export default {
	getVideo: (params) => http.get('/api/v1/video', {
		params: params
	})
}