<template>
	<div class="bank">
		<h4 class="text">Date: {{ slot.startTime | formatDate }}</h4>
		<h4 class="text">Time: {{ slot.startTime | formatTime }}</h4>
		<h4 class="text">Quantity: {{ slot.quantity }}</h4>
		<!-- <button @click="book">{{ "Place Order" }}</button> -->
	</div>
</template>

<script>
import moment from "moment";

export default {
	name: "SlotComponent",
	components: {},
	props: {
		slot: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {};
	},
	filters: {
		formatDate: function (value) {
			if (value) {
				return moment(String(value)).format("MM/DD/YYYY");
			}
		},
		formatTime: function (value) {
			if (value) {
				return moment(String(value)).format("hh:mm");
			}
		},
	},
};
</script>
formatDate

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

.text {
	padding: 0px 0px 10px 0px;
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
