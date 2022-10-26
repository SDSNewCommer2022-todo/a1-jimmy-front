import Vue from 'vue';
import Vuex from 'vuex';
import PersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "default"
  },
  getters: {
  },
  mutations: {
    changeUserName(state, user_name){
      state.userName = user_name;
    }
  },
  actions: {
  },
  modules: {

  },
  plugins: [PersistedState({
    whiteList: ["userName"]
  })]

});
