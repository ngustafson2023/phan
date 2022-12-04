<!-- Default home page -->

<template>
	<main>
		<section v-if="this.$store.state.username">
			<header>
				<h2>My Past Orders</h2>
			</header>
			<div v-if="!orders.length">No order to display</div>
			<PastOrderComponent v-else v-for="order in orders" :key="order" :order="order" />
			<FindPage />
		</section>
		<section v-else>
			<header>
				<h2>Welcome to Phan!</h2>
			</header>
			<article>
				<h3>
					<router-link to="/login"> Sign in </router-link>
					.
				</h3>
			</article>
		</section>
	</main>
</template>

<script>
import BookSlot from "@/components/Find/BookSlot.vue";
import PastOrderComponent from "./PastOrder.vue";
import FindPage from "@/components/Find/FindPage.vue";

export default {
	name: "HomePage",
	components: { BookSlot, PastOrderComponent, FindPage },
	beforeCreate() {
		// GET orders a user has placed
		fetch(`/api/orders?username=${this.$store.state.username}`, {
			credentials: "same-origin",
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				this.orders = res;
			});
	},
	data() {
		return {
			orders: {},
			alerts: {}, // Displays success/error messages encountered during form submission
		};
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
</style>
