<!-- Default home page -->

<template>
	<main>
		<section v-if="$store.state.username">
			<header>
				<h2>Welcome back {{ $store.state.username }}</h2>
			</header>
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
export default {
	name: "HomePage",
	beforeCreate() {
		// GET orders a user has placed
		fetch("/api/orders", {
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
