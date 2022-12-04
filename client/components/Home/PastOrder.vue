<!-- Reusable component representing a single order and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
	<article class="order">
		<header>
			<input v-if="editing" class="editArea" :value="draftName" @input="draftName = $order.target.value" />
			<h2 class="topItem" v-else>{{ order.slot.foodbank.name }}</h2>
		</header>
		<h5 class="item">Time: In {{ order.slot.start }} to {{ order.slot.end }}</h5>
		<h5 class="item">Location: {{ order.slot.foodbank.location }}</h5>
		<button>{{ "View Order" }}</button>
	</article>
</template>

<script>
export default {
	name: "PastOrderComponent",
	props: {
		// Data from the stored freet
		order: {
			type: Object,
			required: true,
		},
	},
	methods: {
		viewOrder() {
			// Pass into a past order modal
		},
	},
};
</script>

<style scoped>
.order {
	border: 1px solid #111;
	padding: 20px;
	position: relative;
	margin-bottom: 20px;
	border-radius: 15px;
	background-color: whitesmoke;
	border-style: none;
}

.item {
	margin: 10px 0px;
}

.topItem {
	margin-bottom: 5px;
}

.editArea {
	border-style: none;
	border-radius: 10px;
	background-color: white;
	width: 400px;
	padding: 5px;
}

.editButton {
	margin-right: 10px;
	padding: 10px 30px;
	border: none;
	border-radius: 10px;
	background-color: cornflowerblue;
}

.editButton:hover {
	cursor: pointer;
}

.actions {
	margin-top: 10px;
}
</style>
