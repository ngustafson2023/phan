<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
	<main>
		<section>
			<header>
				<h2>Food Bank Account for @{{ $store.state.user.username }}</h2>
			</header>
			<ul class="info">
				<!-- <li>Name: {{ $store.state.user.name }}</li> -->
				<li>Address: {{ $store.state.user.location }}</li>
				<!-- {{$store.state.user.opensAt }} -->
				<li>
					Hours: {{ $store.state.user.opensAt | formatTime }} to {{ $store.state.user.closesAt | formatTime }}
				</li>
				<!-- <li>closesAt: {{ $store.state.user.closesAt || "N/A" }}</li> -->
				<li>Date Joined: {{ $store.state.user.dateJoined }}</li>
			</ul>
		</section>
		<h3>Current Slots:</h3>
		<div v-for="slot of slots">
			<SlotComponent :slot="slot" />
		</div>
		<AddSlotPage :slots="slots" />
		<h2>Update Inventory</h2>
		<div v-for="foodItem of inventory">
			<FoodItemComponent :foodItem="foodItem" />
		</div>
		<div v-if="!inventory.length">no inventory</div>

		<button v-on:click="addingItem = !addingItem" v-bind:class="{ 'pill-button-add': true }" v-show="!addingItem">
			+ Add Inventory Item
		</button>

		<form v-show="addingItem">
			<label :id="'label-name'" class="label">Name:</label>
			<input v-model="name" type="text" />
			<label :id="'label-quant'" class="label">Quantity:</label>
			<input v-model="quantity" type="number" min="0" />
			<label :id="'label-rest'" class="label">Tags:</label>

			<div style="display: flex; direction: row">
				<ClickablePill v-for="tag in $store.state.tags" :title="tag" :callback="toggleTag" />
			</div>

			<button v-on:click="submit" style="margin-top: 20px; padding: 12px; width: stretch">Submit</button>
		</form>

		<LogoutForm />
	</main>
</template>

<script>
import DeleteAccountForm from "@/components/Account/DeleteAccountForm.vue";
import LogoutForm from "@/components/Account/LogoutForm.vue";
import FoodItemComponent from "@/components/FoodItem/SingleFoodItem.vue";
import ClickablePill from "@/components/common/ClickablePill.vue";
import AddSlotPage from "@/components/FoodBank/AddSlotPage.vue";
import SlotComponent from "@/components/FoodBank/SlotComponent.vue";
import moment from "moment";

export default {
	name: "FoodBankHome",
	components: {
		DeleteAccountForm,
		LogoutForm,
		AddSlotPage,
		FoodItemComponent,
		ClickablePill,
		SlotComponent,
	},
	beforeCreate() {
		fetch(`/api/fooditem?id=${this.$store.state.user._id}`, {
			// credentials: "same-origin",
		})
			.then((res) => res.json())
			.then((res) => {
				//console.log(res);
				this.inventory = res;
			});
		fetch(`/api/slots?id=${this.$store.state.user._id}`, {
			// credentials: "same-origin",
		})
			.then((res) => res.json())
			.then((res) => {
				this.slots = res.slots;
			});
	},
	data() {
		return {
			inventory: [],
			name: "",
			quantity: null,
			restrictions: [],
			slots: [],
			addingItem: false,
		};
	},
	filters: {
		formatDate: function (value) {
			if (value) {
				return moment(String(value)).format("MM/DD/YYYY");
			}
		},
		formatTime: function (value) {
			if (value) {
				return moment(String(value)).format("hh:mm A");
			}
		},
	},
	methods: {
		async submit() {
			this.restrictions.sort();
			// update food item
			const options = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin", // Sends express-session credentials with request
			};
			const fieldsMap = [
				["quantity", this.quantity],
				["restrictions", this.restrictions],
				["foodBankId", this.$store.state.user._id],
				["name", this.name],
			];
			options.body = JSON.stringify(Object.fromEntries(fieldsMap));
			//console.log("body", options.body);
			try {
				const r = await fetch("/api/foodItem", options);
				//console.log(r);
				if (!r.ok) {
					const res = await r.json();
					throw new Error(res.error);
				}
				// console.log((await r.json()));
				this.inventory.push(await r.json());

				// reset
				this.quantity = null;
				this.restrictions = [];
				this.name = "";
				this.addingItem = false;
			} catch (e) {
				this.$set(this.alerts, e, "error");
				setTimeout(() => this.$delete(this.alerts, e), 3000);
			}
		},

		toggleTag(tag) {
			const tags = new Set(this.restrictions);
			if (tags.has(tag)) {
				tags.delete(tag);
			} else {
				tags.add(tag);
			}

			this.restrictions = [...tags];
			//console.log("tags updated to", this.restrictions);
		},
	},
};
</script>
<style scoped>
.pill-button-add {
	padding: 10px 20px;
	background-color: lightgreen;
	border-radius: 20px;
	margin: 0px 10px;
	border-style: none;
}

form {
	padding: 25px;
	border-radius: 20px;
	margin-top: 20px;
	background-color: whitesmoke;
	display: flex;
	flex-direction: column;
}
article > div {
	display: flex;
	flex-direction: column;
}

textarea {
	font-family: inherit;
	border-radius: 10px;
	border-style: none !important;
	min-height: 60px;
	padding: 5px;
	background-color: white;
}

input {
	font-family: inherit;
	border-radius: 10px;
	border-style: none !important;
	padding: 10px;
	margin-bottom: 20px;
	margin-top: 5px;
	background-color: white;
}

input:focus-visible {
	border-style: none !important;
}

textarea {
	border-style: none !important;
}

button {
	border-radius: 10px;
	color: black;
	font-weight: bold;
	padding: 12px 16px;
	background-color: lightgreen;
	border-style: none;
}

button:hover {
	cursor: pointer;
}

label {
	font-size: medium;
	font-weight: 600;
	padding-bottom: 5px;
}
</style>
