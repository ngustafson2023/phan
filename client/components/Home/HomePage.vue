<!-- Default home page -->

<template>
	<main>
		<!-- regular user -->
		<section v-if="this.$store.state.user.username && !this.$store.state.user.isFoodBank">
			<div>
				<h2>My Past Orders</h2>
			</div>
			<div v-if="!orders.length" style="padding-bottom: 15px">No order to display</div>
			<PastOrderComponent v-else v-for="order in orders" :key="order._id" :order="order" />
			<FindPage />
		</section>
		<section v-else-if="this.$store.state.user.username && this.$store.state.user.isFoodBank">
			<FoodBankHome />
		</section>
		<section v-else>
			<!-- <b-router-link to="/login">go </b-router-link> -->
			<div class="container">
				<header class="welcome" id="welcome">
					<h2>Welcome Back</h2>
				</header>
				<div class="loginContainer">
					<LoginForm />
				</div>
				<router-link
					to="/login"
					tag="button"
					v-bind:class="{
						'pill-button': !value,
					}">
					Create New Account
				</router-link>
			</div>
		</section>
	</main>
</template>

<script>
import BookSlot from "@/components/Find/BookSlot.vue";
import PastOrderComponent from "./PastOrder.vue";
import FindPage from "@/components/Find/FindPage.vue";
import FoodItemComponent from "@/components/FoodItem/SingleFoodItem.vue";
import FoodBankHome from "@/components/FoodBank/FoodBankHome.vue";
import LoginForm from "@/components/Login/LoginForm.vue";

export default {
	name: "HomePage",
	components: {
		BookSlot,
		PastOrderComponent,
		FindPage,
		FoodBankHome,
		LoginForm,
	},
	beforeCreate() {
		// GET orders a user has placed
		if (this.$store.state.user.username && !this.$store.state.user.isFoodBank) {
			fetch(`/api/order?username=${this.$store.state.user.username}`, {
				credentials: "same-origin",
			})
				.then((res) => res.json())
				.then((res) => {
					this.orders = res;
				});
		}
	},
	data() {
		return {
			orders: [],
			alerts: {}, // Displays success/error messages encountered during form submission
		};
	},
};
</script>

<style scoped>
section div {
	display: flex;
	flex-direction: column;
}

form {
	width: 50%;
}

header,
header > * {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

.loginContainer {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

.welcome {
	margin-top: 40px;
	margin-bottom: 0;
	padding-bottom: 0;
}

section .scrollbox {
	flex: 1 0 50vh;
	padding: 3%;
	overflow-y: scroll;
}
.pill-button {
	width: 46%;
	margin: auto;
	height: 35px;
	border-radius: 6px;
	color: black;
	background-color: darkgrey;
	border: 2px solid black;
}

.pill-button:hover {
	cursor: pointer;
}
</style>
