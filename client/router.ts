import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/Home/HomePage.vue";
import AccountPage from "./components/Account/AccountPage.vue";
import OrderPage from "./components/Order/OrderPage.vue";
import FindPage from "./components/Find/FindPage.vue";
import LoginPage from "./components/Login/LoginPage.vue";
import FoodBankHome from "./components/FoodBank/FoodBankHome.vue";
import FoodBankLogin from "./components/FoodBank/FoodBankLogin.vue";
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
    path: "/FoodBank",
    name: "FoodBank",
    component: FoodBankHome,
  },
  { path: "*", name: "Not Found", component: NotFound },
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (!router.app.$store) {
    return next();
  }

  const isFoodBank = router.app.$store.state.user.isFoodBank;
  // foodbank accounts only have only page
  if (isFoodBank && to.name !== "Home") {
    return next({ name: "Home" });
  }

  if (to.name === "Login" && router.app.$store.state.user.username) {
    next({ name: "Account" }); // Go to Account page if user navigates to Login and are signed in
    return;
  }

  if (to.name === "Account" && !router.app.$store.state.user.username) {
    next({ name: "Login" }); // Go to Login page if user navigates to Account and are not signed in
    return;
  }

  if (to.name === "Order" && !router.app.$store.state.orderingFromId) {
    next({ name: "Home" }); // Go to find a foodbank page if user navigates to Order without selecting food bank
    return;
  }

  return next();
});

export default router;
