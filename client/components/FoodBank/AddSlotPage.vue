<template>
	<div class="container">
		<section>
			<h2 class="no-padding" style="margin-bottom: 10px">Add New Pickup Slot</h2>
			<!-- <h3 class="no-padding">Filters</h3> -->
			<!-- <div class="filter-section"> -->
			<div class="fields">
				<div>
					<label class="no-padding">Date:</label>
					<input id="textarea" v-model="date" type="date" />
				</div>
				<div>
					<label class="no-padding">Start:</label>
					<input id="textarea" v-model="startTime" type="time" />
				</div>
				<div>
					<label class="no-padding">Quantity:</label>
					<input id="textarea" v-model="quantity" placeholder="0" min="0" type="number" />
				</div>
				<button @click="addSlots" style="margin-top: 0px; padding: 12px; width: 100%">+ Add Slots</button>
			</div>
			<!-- <div class="filter-section">
					<h4 class="no-padding">Dietary Restrictions:</h4>
					<ClickablePill v-for="r in RESTRICTIONS" :title="r" :callback="editRestrictions" />
				</div> -->
		</section>
	</div>
</template>

<script>
import ClickablePill from "@/components/common/ClickablePill.vue";
import TextPill from "@/components/common/TextPill.vue";

export default {
	name: "AddSlotPage",
	components: { TextPill },
	props: { slots: { type: Array, required: true } },
	data() {
		/**
		 * Options for submitting this form.
		 */
		return {
			// url: '', // Url to submit form to
			// method: 'GET', // Form request method
			// hasBody: false, // Whether or not form request has a body
			// setUsername: false, // Whether or not stored username should be updated after form submission
			alerts: {}, // Displays success/error messages encountered during form submission
			// date:new Date().toISOString().substr(0, 10),
			date: new Date(),
			startTime: "",
			quantity: 0,
		};
	},
	methods: {
		async addSlots() {
			// console.log(new Date(this.date) );
			// console.log(new Date(this.date + "T"+this.startTime));
			// const dateDate = new Date(this.date)
			const options = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					foodBankId: this.$store.state.user._id,
					startTime: new Date(this.date + "T" + this.startTime),
					quantity: this.quantity,
				}),
			};
			try {
				const r = await fetch("/api/slots/", options);
				this.slots.push((await r.json()).slot);
				//console.log("response", await r.json());
			} catch (e) {
				this.$set(this.alerts, e, "error");
				setTimeout(() => this.$delete(this.alerts, e), 3000);
			}
		},
	},
};
</script>

<style scoped>
.no-padding {
	padding: 5px 0px 5px 5px;
	margin: 0px;
}

section {
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
	margin-left: 10px;
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
