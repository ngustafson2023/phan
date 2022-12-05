<!-- Reusable component for a form in an inline style (input and button on same line) -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
	<button @click="alternateValue" v-bind:class="{ 'pill-button-active': value, 'pill-button': !value }">
		{{ title }}
	</button>
</template>

<script>
export default {
	name: "ClickablePill",
	props: {
		title: {
			type: String,
			default: "",
		},
		callback: {
			type: Function,
		},
	},
	data() {
		return { value: false, alerts: {} };
	},
	methods: {
		alternateValue() {
			this.value = !this.value;
			this.callback(this.title, this.value);
		},
	},
};
</script>

<style scoped>
.pill-button {
	padding: 10px 20px;
	background-color: lightyellow;
	border-radius: 20px;
	margin: 0px 10px;
	border-style: none;
}

.pill-button-active {
	padding: 10px 20px;
	background-color: lightyellow;
	border-radius: 20px;
	margin: 0px 10px;
	border-style: solid;
	border-width: 3px;
	border-color: black;
}

.pill-button:hover {
	cursor: pointer;
}
</style>
