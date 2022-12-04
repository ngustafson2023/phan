<template>
	<main>
		<section>
			<header>
				<h2>{{ foobank.name }}</h2>
			</header>
		</section>
		<div>
			<h2>{{ foobank.name }}</h2>
			<div>
				<h5>Location: {{ foobank.name }}</h5>
			</div>
			<button @click="book">{{ "Place Order" }}</button>
		</div>
		<section v-if="!foodbanks.length">None found</section>
		<section class="alerts">
			<article v-for="(status, alert, index) in alerts" :key="index" :class="status">
				<p>{{ alert }}</p>
			</article>
		</section>
	</main>
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
	},
	beforeCreate() {
		// GET food banks
		fetch("/api/foodbank", {
			credentials: "same-origin",
			params: {
				stockLevels: this.stocks,
				restrictions: this.filters,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				this.foodbanks = res.foodbanks;
			});
	},
	data() {
		return {};
	},
	methods: {
		async book() {
			// Nick add stuff here and redirect
			// this.foodbank._id should have the id
		},
	},
};
</script>

<style scoped>
section {
	display: flex;
	flex-direction: column;
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
