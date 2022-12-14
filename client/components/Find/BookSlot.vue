<template>
	<div class="bank" :class="{ selected: selected }">
		<h4 class="text">{{ foodbank.username }}</h4>
		<h5 class="text">Location: {{ foodbank.location }}</h5>
		<h5 class="text">Distance: {{ distance }} mi</h5>
		<button @click="book">{{ "Place Order" }}</button>
	</div>
</template>

<script>
export default {
	name: "BookSlot",
	components: {},
	props: {
		foodbank: {
			type: Object,
			required: true,
		},
		selected: {
			type: Boolean,
			required: true,
		},
		distance: {
			type: String,
			required: true,
		},
	},
	data() {
		return {};
	},
	methods: {
		async book() {
			// Nick add stuff here and redirect
			// this.foodbank._id should have the id
			this.$store.commit("setOrderingFrom", this.foodbank.name);
			this.$store.commit("setOrderingFromId", this.foodbank._id);
			this.$router.push("/order/");
		},
	},
};
</script>

<style scoped>
section {
	display: flex;
	flex-direction: column;
}

.bank {
	display: flex;
	flex-direction: column;
	background-color: whitesmoke;
	padding: 20px;
	margin-bottom: 20px;
	border-radius: 20px;
}

.selected {
	border-color: black;
	border-width: 4px;
	border-style: solid;
}

.text {
	padding: 0px 0px 15px 0px;
	margin: 0px;
}

header,
header > * {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

section .scrollbox {
	flex: 1 0 50vh;
	padding: 3%;
	overflow-y: scroll;
}

button {
	padding: 10px;
	border-radius: 10px;
	background-color: lightgreen;
	border-style: none;
	font-family: inherit;
	font-size: 16px;
}

button:hover {
	cursor: pointer;
}

.alerts {
	position: absolute;
	z-index: 99;
	bottom: 0;
	top: 100%;
	left: 50%;
	transform: translate(-50%, 10%);
	width: 100%;
	text-align: center;
}

.alerts article {
	border-radius: 5px;
	padding: 10px 20px;
	color: #fff;
}

.alerts p {
	margin: 0;
}

.alerts .error {
	background-color: rgb(166, 23, 33);
}

.alerts .success {
	background-color: rgb(45, 135, 87);
}
</style>
