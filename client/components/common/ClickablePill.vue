<!-- Reusable component for a form in an inline style (input and button on same line) -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
	<button @click="alternateValue">{{ title }}</button>
</template>

<script>
export default {
	name: "ClickablePill",
	props: {
		title: {
			type: String,
			default: "",
		},
	},
	data() {
		return { value: False, alerts: {} };
	},
	methods: {
		alternateValue() {
			this.value = !this.value;
		},
	},
};
</script>

<style scoped>
form {
	display: flex;
	position: relative;
}

input {
	padding: 0 5px;
	min-width: 200px;
}
</style>
