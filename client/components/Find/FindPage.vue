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
		</section> -->
		<section v-if="!foodbanks.length">None found</section>
		<div class="options">
			<GmapMap
				:center="center"
				:zoom="14"
				style="flex: 1; height: 700px; margin-right: 70px; border-radius: 15px"
				:options="{
					zoomControl: false,
					scaleControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
					streetViewControl: false,
					disableDefaultUi: false,
				}">
				<GmapMarker
					:key="index"
					v-for="(m, index) in markers"
					:position="m.position"
					:clickable="true"
					@click="toggleInfo(m, index)" />
			</GmapMap>
			<section style="flex: 1">
				<h3 class="no-padding">Food Banks</h3>
				<BookSlot
					v-for="(foodbank, index) in sortBanks([...foodbanks])"
					:key="foodbank.name"
					:foodbank="foodbank"
					:distance="calculateDistance(foodbank.lat, foodbank.lng)"
					:selected="selectedFoodbank !== null && 0 === index" />
			</section>
		</div>
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
				console.log(res);
				this.foodbanks = res.foodBanks;
				this.addMarkers();
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
			// STOCK_LEVELS: ["Low", "Medium", "High"],
			// RESTRICTIONS: ["Vegan", "Gluten Free", "Dairy Free"],
			center: { lat: 42.35026, lng: -71.08621 },
			currentPlace: null,
			markers: [],
		};
	},

	mounted() {
		this.geolocate();
	},

	methods: {
		geolocate() {
			navigator.geolocation.getCurrentPosition((position) => {
				this.center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
			});
		},
		addMarkers() {
			this.foodbanks.map((fb) => {
				this.markers.push({
					position: {
						lat: fb.lat,
						lng: fb.lng,
					},
					name: fb.username,
				});
			});
		},

		toggleInfo: function (marker, index) {
			this.selectedFoodbank = index;
		},

		calculateDistance(lat2, lng2) {
			// Convert the latitudes and longitudes from degrees to radians
			let lat1 = this.center.lat * (Math.PI / 180);
			let lng1 = this.center.lng * (Math.PI / 180);
			lat2 = lat2 * (Math.PI / 180);
			lng2 = lng2 * (Math.PI / 180);

			// Use the Haversine formula to calculate the great-circle distance
			const a =
				Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
				Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng2 - lng1) / 2), 2);
			const distance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

			// Convert the distance from radians to miles
			return (distance * 3959).toFixed(2);
		},

		sortBanks(foodbanks) {
			let selected = null;
			if (this.selectedFoodbank !== null) {
				selected = foodbanks[this.selectedFoodbank];
				foodbanks.splice(this.selectedFoodbank, 1);
			}
			foodbanks.sort((a, b) => this.calculateDistance(a.lat, a.lng) - this.calculateDistance(b.lat, b.lng));

			if (selected) {
				foodbanks.unshift(selected);
			}
			return foodbanks;
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
	margin: 0px 0px 15px 0px;
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
