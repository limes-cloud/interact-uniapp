export function getSysInfo() {
	return new Promise((reslove) => {
		uni.getSystemInfo({
			success: (e) => {
				reslove(e);
			}
		});
	})
}