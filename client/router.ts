import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/Home/HomePage.vue";
import AccountPage from "./components/Account/AccountPage.vue";
import OrderPage from "./components/Order/OrderPage.vue";
import FindPage from "./components/Find/FindPage.vue";
import LoginPage from "./components/Login/LoginPage.vue";
import FoodBankAccountPage from "./components/FoodBankAccount/FoodBankAccountPage.vue";
import FoodBankLogin from "./components/FoodBankAccount/FoodBankLogin.vue";
import NotFound from "./NotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/account", name: "Account", component: AccountPage },
  { path: "/order", name: "Order", component: OrderPage },
  { path: "/find", name: "Find", component: FindPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/login/foodbank", name: "FoodBankLogin", component: FoodBankLogin },
  {
    path: "/foodBankAccount",
    name: "FoodBankAccount",
    component: FoodBankAccountPage,
  },
  { path: "*", name: "Not Found", component: NotFound },
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === "Login" && router.app.$store.state.username) {
      next({ name: "Account" }); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === "Account" && !router.app.$store.state.username) {
      next({ name: "Login" }); // Go to Login page if user navigates to Account and are not signed in
      return;
    }

    if (to.name === "Order" && !router.app.$store.state.orderingFrom) {
      next({ name: "FindPage" }); // Go to find a foodbank page if user navigates to Order without selecting food bank
      return;
    }
  }

  next();
});

export default router;
