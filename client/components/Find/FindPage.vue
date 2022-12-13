<template>
	<div class="container">
		<h2 class="no-padding">Book Another Slot</h2>
		<!-- <section>
			<h3 class="no-padding">Filters</h3>
			<div class="filters">
				<div class="filter-section">
					<h4 class="no-padding">Stock Levels:</h4>
					<ClickablePill v-for="sl in STOCK_LEVELS" :title="sl" :callback="editStockLevels" />
				</div>
				<div class="filter-section">
					<h4 class="no-padding">Dietary Restrictions:</h4>
					<ClickablePill v-for="r in RESTRICTIONS" :title="r" :callback="editRestrictions" />
				</div>
			</div>
		</section>
		<section v-if="!foodbanks.length">None found</section> -->
		<div class="options">
			<GoogleMap
				:foodbanks="
					foodbanks.map((fb) => {
						return { ...fb, selected: fb === selected };
					})
				" />
			<section style="flex: 1">
				<h3 class="no-padding">Food Banks</h3>
				<BookSlot v-for="foodbank in foodbanks" :key="foodbank.name" :foodbank="foodbank" />
			</section>
		</div>
	</div>
</template>
<script>
import BookSlot from "@/components/Find/BookSlot.vue";
import ClickablePill from "@/components/common/ClickablePill.vue";
import TextPill from "@/components/common/TextPill.vue";
import GoogleMap from "@/components/Home/GoogleMap.vue";

export default {
	name: "FindPage",
	components: { BookSlot, ClickablePill, TextPill, GoogleMap },
	beforeCreate() {
		// GET food banks
		console.log("/api/users?isFoodBank=true");
		fetch("/api/users?isFoodBank=true", {
			credentials: "same-origin",
			params: {
				stockLevels: this.stocks,
				restrictions: this.filters,
			},
		})
			.then(async (res) => {
				console.log("result is", res);
				return await res.json();
			})
			.then((res) => {
				this.foodbanks = res.foodBanks;
			});

		// get all food items
		fetch("/api/users?isFoodBank=true", {
			credentials: "same-origin",
		})
			.then(async (res) => {
				return await res.json();
			})
			.then((res) => {
				this.foodItems = res.foodItems;
			});
	},

	data() {
		return {
			foodbanks: [],
			selected: null,
			stocks: [],
			filters: [],
			foodItems: [],
			filteredFoodItems: [],
			aterts: {},
			selectedFoodbank: null,
			STOCK_LEVELS: ["Low", "Medium", "High"],
			RESTRICTIONS: ["Vegan", "Gluten Free", "Dairy Free"],
		};
	},

	methods: {
		editStockLevels(item, shouldInclude) {
			if (shouldInclude && !this.stocks.includes(item)) {
				this.stocks.push(item);
			} else if (!shouldInclude && this.stocks.includes(item)) {
				this.stocks = this.stocks.filter((s) => s !== item);
			}
			this.updateSlots();
		},
		editRestrictions(item, shouldInclude) {
			if (shouldInclude && !this.filters.includes(item)) {
				this.filters.push(item);
			} else if (!shouldInclude && this.filters.includes(item)) {
				this.filters = this.filters.filter((s) => s !== item);
			}
			this.updateSlots();
		},

		updateViewed(name) {
			this.selectedFoodbank = foodbanks.filter((fb) => rb.username === name)[0];
		},

		updateSlots() {
			// fetch(
			//   `/api/foodbanks?stockLevels=${this.stocks.join(
			//     ","
			//   )}&restrictions=${this.filters.join(",")}`,
			//   {
			//     credentials: "same-origin",
			//   }
			// )
			//   .then((res) => res.json())
			//   .then((res) => {
			//     this.foodbanks = res.foodbanks;
			//     console.log(res);
			//   });
		},
	},
};
</script>

<style scoped>
section {
	display: flex;
	flex-direction: column;
}

.container {
	margin-top: 20px;
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

.filters {
	flex-direction: column;
	display: flex;
	padding: 20px;
	border-radius: 20px;
	background-color: whitesmoke;
}

.filter-section {
	display: flex;
	flex-direction: row;
	margin-bottom: 20px;
}

.no-padding {
	padding: 0px;
	margin: 15px 0px 3px 0px;
}

.options {
	display: flex;
	flex-direction: row;
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
</style>
