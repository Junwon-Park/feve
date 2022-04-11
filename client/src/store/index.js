import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { authStore } from './auth';

Vue.use(Vuex);

const authState = createPersistedState({
  paths: ['authStore']
});

const store = new Vuex.Store({
  state: {
    isLogin: JSON.parse(localStorage.getItem('isLogin')),
    accessToken: localStorage.getItem('Authorization'),
    userId: localStorage.getItem('userId'),
    userAdmin: localStorage.getItem('userAdmin')
  },
  modules: { authStore },
  plugins: [authState],
  getters: {
    LocalUrl() {
      return 'https://localhost:3000';
    },
    ServerUrl() {
      return 'https://localhost:8080';
    },
    googleLoginUrl() {
      return 'https://accounts.google.com/o/oauth2/v2/auth?client_id=237233087109-1v95u6a4qm3htd2a0hlhorhlo64ppj60.apps.googleusercontent.com&response_type=code&redirect_uri=https://localhost:3000&scope=https://www.googleapis.com/auth/userinfo.profile';
    },
    googleLogOutUrl() {
      return 'https://oauth2.googleapis.com/revoke?token=ya29.A0ARrdaM839sa95XJhXb8ctrby3odFVuUmbDB09kTlleEDJ2HtX5EyCK-xKjscJml6WLglGKCfkqdNGHUv8jIZsyPAPx8hazEo5Vo6_llX-DdBDGCqxb1L7HLw9BTbGsb2LmE3uikIo3YEcs0KrpxV4Ful9A4y';
    },
    adminPage() {
      return 'http://localhost:3000/admin';
    }
  }
});

export default store;
