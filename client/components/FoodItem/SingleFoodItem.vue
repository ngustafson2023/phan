<template>
	<div class="container">
		<article v-if="!updating">
			<header>
				<h2 class="topItem">{{ foodItem.name }}</h2>
			</header>
			<h5 class="item">Current Stock: {{ foodItem.quantity }}</h5>
			<h5 class="item">
				Item Tags:
				<TextPill v-for="tag in foodItem.restrictions"> {{ tag }} </TextPill>
			</h5>
			<button v-on:click="showModal = !showModal">Update Stock Level</button>
		</article>

		<article v-else>
			<h2 class="itemName" style="padding: 0px; margin: 10px 0px">{{ foodItem.name }}</h2>
			<div>
				<label class="stockLabel" name="quantity">Current stock:</label>
				<span> {{ foodItem.quantity }}</span>
			</div>

			<h5 v-if="foodItem.restrictions.length" class="item">
				Item Tags:
				<StaticPill v-for="tag in foodItem.restrictions" :title="tag" :callback="toggleTag" />
			</h5>
		</article>
	</div>
</template>

<script>
import ClickablePill from "@/components/common/ClickablePill.vue";
import StaticPill from "@/components/common/StaticPill.vue";

import Modal from "@/components/common/Modal.vue";

export default {
	name: "FoodItemComponent",
	components: { Modal, ClickablePill, StaticPill },
	data() {
		return {
			updating: true,
			showModal: false,
			tagsToUpdate: [],
			foodItemName: "",
			quantity: null,
		};
	},
	props: {
		foodItem: { type: Object, required: true },
	},
	methods: {
		async updateFoodItem() {
			this.tagsToUpdate.sort();

			// update food item
			const options = {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin", // Sends express-session credentials with request
			};
			const fieldsMap = [
				["quantity", this.quantity],
				["restrictions", this.tagsToUpdate],
				["foodItemId", this.foodItem._id],
				["name", this.foodItemName],
			];
			options.body = JSON.stringify(Object.fromEntries(fieldsMap));

			try {
				const r = await fetch("/api/foodItem", options);
				if (!r.ok) {
					const res = await r.json();
					throw new Error(res.error);
				}
				Object.assign(this.foodItem, this.foodItem, ...options.body);

				// reset
				this.quantity = null;
				this.tagsToUpdate = [];
				this.updating = false;
			} catch (e) {
				this.$set(this.alerts, e, "error");
				setTimeout(() => this.$delete(this.alerts, e), 3000);
			}
		},

		toggleTag(tag) {
			const tags = new Set(this.tagsToUpdate);
			if (tags.has(tag)) {
				tags.delete(tag);
			} else {
				tags.add(tag);
			}
			this.tagsToUpdate = [...tags];
			//console.log("tags updated to", this.tagsToUpdate);
		},
	},
};
</script>

<style scoped>
.container {
	background-color: whitesmoke;
	padding: 25px;
	margin-bottom: 20px;
	border-radius: 15px;
}

.item {
	padding: 15px 0px;
	margin: 0px;
}

input {
	border-radius: 6px;
	background-color: grey;
}
</style>
