<template>
	<div class="container">
		<section>
			<h2 class="no-padding">Browse Food Banks</h2>
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
		<section v-if="!foodbanks.length">None found</section>
		<section v-else>
			<h3 class="no-padding">Food Banks</h3>
			<BookSlot v-for="foodbank in foodbanks" :key="foodbank.name" :foodbank="foodbank" />
		</section>
	</div>
</template>
<script>
import BookSlot from "@/components/Find/BookSlot.vue";
import ClickablePill from "@/components/common/ClickablePill.vue";
import TextPill from "@/components/common/TextPill.vue";

export default {
	name: "FindPage",
	components: { BookSlot, ClickablePill, TextPill },
	beforeCreate() {
		// GET food banks
		fetch("/api/foodbanks", {
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
		return {
			foodbanks: [],
			stocks: [],
			filters: [],
			aterts: {},
			STOCK_LEVELS: ["Low", "Medium", "High"],
			RESTRICTIONS: ["Vegan", "Gluten Free", "Dairy Free"],
		};
	},
	methods: {
		async book() {
			// Nick add stuff here
		},
		editStockLevels(item, shouldInclude) {
			if (shouldInclude && !this.stocks.includes(item)) {
				this.stocks.push(item);
			} else if (!shouldInclude && this.stocks.includes(item)) {
				this.stocks = this.stocks.filter((s) => s !== item);
			}
		},
		editRestrictions(item, shouldInclude) {
			if (shouldInclude && !this.filters.includes(item)) {
				this.filters.push(item);
			} else if (!shouldInclude && this.filters.includes(item)) {
				this.filters = this.filters.filter((s) => s !== item);
			}
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
	background-color: lightgray;
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
