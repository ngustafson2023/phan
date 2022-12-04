<template>
	<input v-model="textInput" type="text" :placeholder="placeholder" />
</template>

<script>
export default {
	name: "TextPill",
	props: {
		placeholder: {
			type: String,
			default: "",
		},
		callback: {
			type: Function,
		},
	},
	data() {
		return { textInput: "", alerts: {} };
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
