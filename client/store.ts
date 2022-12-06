import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    tags: ["Vegan", "Gluten Free", "Dairy Free"],
    user: {},
    // username: null, // Username of the logged in user
    // userId: null,
    orderingFrom: null, // name of Food Bank user is currently ordering from
    orderingFromId: null,
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    // isFoodBank: false, //user is by default not a food bank
    name: "",
    address: "",
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    // setUsername(state, username) {
    //   /**
    //    * Update the stored username to the specified one.
    //    * @param username - new username to set
    //    */
    //   state.username = username;
    // },
    setOrderingFrom(state, orderingFrom) {
      /**
       * Update the stored orderingFrom to the specified one.
       * @param orderingFrom
       */
      state.orderingFrom = orderingFrom;
    },
    setOrderingFromId(state, orderingFromId) {
      /**
       * Update the stored orderingFromId to the specified one.
       * @param orderingFromId
       */
      state.orderingFromId = orderingFromId;
    },
    // setFoodBankFlag(state, isFoodBank) {
    //   /**
    //    * Update the stored isFoodBank flag to the specified one.
    //    * @param isFoodBank - new Foodbank flag to set
    //    */
    //   state.isFoodBank = isFoodBank;
    // },
    setName(state, name) {
      /**
       * Update the stored name to the specified one.
       * @param name - new name to set
       */
      state.name = name;
    },
    setAddress(state, address) {
      /**
       * Update the stored address to the specified one.
       * @param address - new address to set
       */
      state.address = address;
    },
    // setUserId(state, userId) {
    //   /**
    //    * Update the stored usreId to the specified one.
    //    * @param userId - new userId to set
    //    */
    //   state.userId = userId;
    // },

    setUser(state, user) {
      /**
       * Update the stored usreId to the specified one.
       * @param user - new user to set
       */
      state.user = user;
    },
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()],
});

export default store;
