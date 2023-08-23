<template>
	<text class="text">{{ element.text }}</text>
</template>

<script>
export default {
	props: {
		element: Object
	}
};
</script>

<style>
.text {
	display: inline-block;
}
</style>
