<!-- Reusable component for a form in an inline style (input and button on same line) -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
    <div class="button-container">
        <button @click="alternateValue" v-bind:class="{ 'pill-button-active': value, 'pill-button': !value }">
		    {{ title }}
	    </button>
    </div>
</template>

<script>
export default {
	name: "Tag",
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
	background-color:  whitesmoke;
	border-radius: 20px;
	border-style: none;
    margin-right: 10px;
    margin-bottom: 10px;
}

.pill-button-active {
	padding: 10px 20px;
	background-color:  whitesmoke;
	border-radius: 20px;
	margin-right: 10px;
    margin-bottom: 10px;
	border-style: solid;
	border-width: 2px;
	border-color: black;
}

.pill-button:hover {
	cursor: pointer;
}
</style>
