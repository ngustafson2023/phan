<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
	<form @submit.prevent="submit">
		<!-- <h3>{{ title }}</h3>  -->
		<article v-if="fields.length">
			<div v-for="field in fields" :key="field.id">
				<label :id="'label' + field.id" :for="field.id" class="label">{{ field.label }}:</label>
				<textarea
					v-if="field.id === 'content'"
					:name="field.id"
					:value="field.value"
					@input="field.value = $event.target.value"
					:id="'textarea' + field.id"
					class="textarea" />
				<input
					v-else
					:type="field.id === 'password' ? 'password' : 'text'"
					:name="field.id"
					:value="field.value"
					@input="field.value = $event.target.value"
					:id="'input' + field.id"
					class="input" />
			</div>
		</article>
		<article v-else>
			<p>{{ content }}</p>
		</article>
		<button type="submit">
			{{ title }}
		</button>
		<section class="alerts">
			<article v-for="(status, alert, index) in alerts" :key="index" :class="status">
				<p>{{ alert }}</p>
			</article>
		</section>
	</form>
</template>

<script>
export default {
	name: "BlockForm",
	data() {
		/**
		 * Options for submitting this form.
		 */
		return {
			url: "", // Url to submit form to
			method: "GET", // Form request method
			hasBody: false, // Whether or not form request has a body
			setUser: false, // Whether or not stored username should be updated after form submission
			alerts: {}, // Displays success/error messages encountered during form submission
			callback: null, // Function to run after successful form submission
		};
	},
	methods: {
		async submit() {
			/**
			 * Submits a form with the specified options from data().
			 */
			const options = {
				method: this.method,
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin", // Sends express-session credentials with request
			};
			if (this.hasBody) {
				options.body = JSON.stringify(
					Object.fromEntries(
						this.fields.map((field) => {
							const { id, value } = field;
							field.value = "";
							return [id, value];
						})
					)
				);
			}

			try {
				const r = await fetch(this.url, options);
				if (!r.ok) {
					// If response is not okay, we throw an error and enter the catch block
					const res = await r.json();
					throw new Error(res.error);
				}

				if (this.setUser) {
					const text = await r.text();
					const res = text ? JSON.parse(text) : { user: {} };
					this.$store.commit("setUser", res.user);
				}

				if (this.callback) {
					this.callback();
				}
			} catch (e) {
				this.$set(this.alerts, e, "error");
				setTimeout(() => this.$delete(this.alerts, e), 3000);
			}
		},
	},
};
</script>

<style scoped>
form {
	padding: 20px;
	border-radius: 20px;
	margin-top: 20px;
	background-color: whitesmoke;
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
	width: stretch;
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
	font-size: small;
	font-weight: 600;
	padding-bottom: 5px;
}

/* .pill-button {
	padding: 10px 20px;
}

.pill-button-active {
	padding: 10px 20px;
	border-width: 3px;
}

.pill-button:hover {
	cursor: pointer;
} */
</style>
