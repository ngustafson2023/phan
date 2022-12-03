<template>
	<main>
		<section>
			<header>
				<h2>Finding from {{ $store.state.FindingFrom }}</h2>
			</header>
		</section>
		<section class="alerts">
			<article v-for="(status, alert, index) in alerts" :key="index" :class="status">
				<p>{{ alert }}</p>
			</article>
		</section>
	</main>
</template>

<script>
export default {
	name: "FindPage",
	components: {},
	beforeCreate() {
		// GET food bank inventory
		fetch("/api/foodbank/inventory", {
			credentials: "same-origin",
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				this.inventory = res.inventory;
			});
	},
	data() {
		return {
			stocks: {},
			filters: {},
		};
	},
	methods: {
		async submit() {
			// PUSH Find
			const options = {
				method: "PUSH",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin", // Sends express-session credentials with request
			};
			const fieldsMap = [["cart", this.cart]];
			options.body = JSON.stringify(Object.fromEntries(fieldsMap));
			try {
				const r = await fetch("/api/Find", options);
				if (!r.ok) {
					const res = await r.json();
					throw new Error(res.error);
				}
			} catch (e) {
				this.$set(this.alerts, e, "error");
				setTimeout(() => this.$delete(this.alerts, e), 3000);
			}

			// PUT new food bank inventory
			options.method = "PUT";
			try {
				const r = await fetch("/api/foodbank", options);
				if (!r.ok) {
					const res = await r.json();
					throw new Error(res.error);
				}
				this.callback();
			} catch (e) {
				this.$set(this.alerts, e, "error");
				setTimeout(() => this.$delete(this.alerts, e), 3000);
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

.alerts article {
	border-radius: 5px;
	padding: 10px 20px;
	color: #fff;
}

.alerts p {
	margin: 0;
}

.alerts .error {
	background-color: rgb(166, 23, 33);
}

.alerts .success {
	background-color: rgb(45, 135, 87);
}
</style>
