<script>
export default {
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import '@/uni_modules/uv-ui-tools/index.scss';
@import 'static/css/animate.min.css';
// @import 'static/css/interact.scss';
.uv-loading-icon {
	display: flex;
	flex-direction: column !important;
}
</style>
