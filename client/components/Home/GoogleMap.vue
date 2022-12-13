<template>
	<GmapMap :center="center" :zoom="14" style="flex: 1; height: 700px; margin-right: 70px; border-radius: 15px">
		<GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :icon="m.icon" />
	</GmapMap>
</template>

<script>
export default {
	name: "GoogleMap",
	props: {
		foodbanks: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			center: { lat: 45.508, lng: -73.587 },
			currentPlace: null,
			markers: [],
		};
	},
	mounted() {
		this.geolocate();
		this.addMarkers();
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
			console.log(this.foodBanks);
			this.foodbanks
				.filter((fb) => fb.lat && fb.lng)
				.map((fb) => {
					console.log(fb);
					this.markers.push({
						icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
						position: {
							lat: fb.lat,
							lng: fb.lng,
						},
					});
				});
		},
	},
};
</script>
