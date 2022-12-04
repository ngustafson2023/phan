import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    username: null, // Username of the logged in user
    orderingFrom: null,  // name of Food Bank user is currently ordering from
    orderingFromId: null,
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
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
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
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
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
