<template>
	<div class="custom-image">
		container
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		src: String,
		alt: String
	}
};
</script>

<style scoped>
/* 样式定义 */
</style>
