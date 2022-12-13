<!-- Default home page -->

<template>
  <main>
    <!-- regular user -->
    <section
      v-if="
        this.$store.state.user.username && !this.$store.state.user.isFoodBank
      "
    >
      <header>
        <h2>My Past Orders</h2>
      </header>
      <div v-if="!orders.length">No order to display</div>
      <PastOrderComponent
        v-else
        v-for="order in orders"
        :key="order._id"
        :order="order"
      />
      <FindPage />
    </section>
    <section
      v-else-if="
        this.$store.state.user.username && this.$store.state.user.isFoodBank
      "
    >
      <FoodBankHome />
    </section>
    <section v-else>
      <header>
        <h2 v-bind:style="{textAlign:'center'}">Welcome to Phan!</h2>
      </header>
      <article>
        <h3>
          <!-- <b-router-link to="/login">go </b-router-link> -->
          <LoginForm />
          <router-link to="/login" tag="button" v-bind:class="{ 'pill-button-active': value, 'pill-button': !value }"
          > Create New Account </router-link>
        </h3>
      </article>
    </section>
  </main>
</template>

<script>
import BookSlot from "@/components/Find/BookSlot.vue";
import PastOrderComponent from "./PastOrder.vue";
import FindPage from "@/components/Find/FindPage.vue";
import FoodItemComponent from "@/components/FoodItem/SingleFoodItem.vue";
import FoodBankHome from "@/components/FoodBank/FoodBankHome.vue";
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: "HomePage",
  components: { BookSlot, PastOrderComponent, FindPage, FoodBankHome,LoginForm },
  beforeCreate() {
    // GET orders a user has placed
    if (this.$store.state.user.username && !this.$store.state.user.isFoodBank) {
      fetch(`/api/order?username=${this.$store.state.user.username}`, {
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((res) => {
          this.orders = res;
        });
    }
  },
  data() {
    return {
      orders: [],
      alerts: {}, // Displays success/error messages encountered during form submission
    };
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
.pill-button {
	padding: 10px 20px;
	background-color: darkgray;
	border-radius: 20px;
	margin: 0px 10px;
	border-style: none;
}

.pill-button-active {
	padding: 10px 20px;
	background-color: darkgray;
	border-radius: 20px;
	margin: 0px 10px;
	border-style: solid;
	border-width: 3px;
	border-color: black;
}

.pill-button:hover {
	cursor: pointer;
}

</style>
