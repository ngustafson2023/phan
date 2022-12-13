import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as VueGoogleMaps from "vue2-google-maps";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyCuUaPhjNWPrF2XU6TcLZTXz62dZKsQESM",
		libraries: "places",
	},
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
