<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
	<nav
		style="
			background-color: transparent;
			margin: 20px 90px 10px 90px;
			padding: 0px;
			padding-bottom: 20px;
			border-bottom: 3px black solid;
		">
		<div class="left">
			<router-link class="title" to="/">Phan</router-link>
		</div>
		<div class="right" v-if="$store.state.user.isFoodBank">
			<p to="/signout">thank you for your contribution</p>
		</div>
		<section class="right" v-else>
			<router-link to="/"> Home </router-link>
			<router-link v-if="$store.state.user.username" to="/account"> Account </router-link>
			<router-link v-else to="/login"> Login </router-link>
		</section>

		<section class="alerts">
			<article v-for="(status, alert, index) in $store.state.alerts" :key="index" :class="status">
				<p>{{ alert }}</p>
			</article>
		</section>
	</nav>
</template>

<style scoped>
nav {
	padding: 1vw 2vw;
	background-color: #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
}

.title {
	font-size: 32px;
	margin: 0 5px;
	color: black;
	text-decoration: none;
}

img {
	height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
	font-size: 20px;
	display: grid;
	gap: 16px;
	grid-auto-flow: column;
	align-items: center;
}

.right a {
	margin-left: 5px;
	color: black;
	text-decoration: none;
}

.right a:hover {
	text-decoration: underline;
}

.alerts {
	width: 25%;
}
</style>
