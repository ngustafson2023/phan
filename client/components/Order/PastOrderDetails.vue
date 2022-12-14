<template>
	<div class="container">
		<h3 class="title">My Items</h3>
		<p v-if="!Object.keys(cart).length">No items in order</p>
		<div v-else>
			<div class="row">
				<p class="item" style="font-weight: bold">Name</p>
				<p class="item" style="font-weight: bold">Quantity</p>
			</div>
			<hr />
			<div v-for="item in fetched">
				<div class="row">
					<p class="item">{{ item.name }}</p>
					<p class="item">{{ item.quantity }}</p>
				</div>
				<hr />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "PastOrderDetails",
	components: {},
	props: {
		cart: {
			type: Array,
			required: true,
		},
	},
	mounted() {
		this.getItems();
	},
	data() {
		return {
			fetched: [],
		};
	},
	methods: {
		async getItems() {
			fetch(`/api/fooditem`, {
				credentials: "same-origin",
			})
				.then((res) => res.json())
				.then((res) => {
					const cartIds = this.cart.map((i) => i.foodItemId);
					for (const foodItem of res.foodItems) {
						console.log(foodItem);
						if (cartIds.includes(foodItem._id)) {
							this.fetched.push({
								name: foodItem.name,
								quantity: foodItem.quantity,
							});
						}
						// const obj = {
						// 	quantity: parseInt(foodItem.quantity),
						// 	restrictions: foodItem.restrictions,
						// };
						// this.$set(this.inventory, foodItem.name, obj);
						// this.$set(this.numSelected, foodItem.name, 0);
					}
					this.$forceUpdate();
				});
		},
	},
};
</script>

<style scoped>
.row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.row > * {
	flex: 1;
}

.container {
	padding-top: 20px;
	border-radius: 10px;
	background-color: whitesmoke;
}

.title {
	margin: 0;
	margin-bottom: 10px;
}

.item {
	margin: 0;
}
</style>
