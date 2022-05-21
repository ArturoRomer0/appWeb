import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from 'jwt-decode';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    role: null,
    shopCart: [],
    subTotal: 0,

  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRole(state, role) {
      state.role = role;
    },
    setShopCart(state, shopCart) {
      let product = state.shopCart.find(product => product._id === shopCart._id);
      product ? product.cant += shopCart.cant : state.shopCart.push(shopCart);
    },
    deleteShopCart(state, id) {
      state.shopCart = state.shopCart.filter(product => product._id !== id);
    },
    lessShopCart(state, id) {
      let product = state.shopCart.find(product => product._id === id);
      if (product.cant > 1) {
        product.cant--;
      }
    },
    moreShopCart(state, id) {
      let product = state.shopCart.find(product => product._id === id);
      product.cant++;
    },
    calculateSubTotal(state) {
      let subTotal = 0;
      state.shopCart.forEach(product => {
        subTotal += product.price * product.cant;
      });
      state.subTotal = subTotal;
    }
  },
  actions: {
    async signin({ commit }, usuario) {
      try {
        const response = await axios.post('/api/auth/signin', usuario);
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        const role = decoded.role;
        commit("setToken", token);
        commit("setRole", role);
        return true;
      } catch (error) {
        console.log(error);
        commit("setToken", null);
        commit("setRole", null);
        return error.response.data;
      }
    },
    getUserRole({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwt_decode(token);
        commit("setRole", decoded.role);
      }
    },
    readToken({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwt_decode(token);
        commit('setToken', token);
        commit('setRole', decoded.role);
      } else {
        commit('setToken', null);
        commit('setRole', null);
      }
    },
    addShopCart({ commit }, shopCart) {
      commit('setShopCart', shopCart);
      commit('calculateSubTotal');

    },
    deleteShopCart({ commit }, id) {
      commit('deleteShopCart', id);
      commit('calculateSubTotal');

    },
    lessShopCart({ commit }, id) {
      commit('lessShopCart', id);
      commit('calculateSubTotal');
    },
    moreShopCart({ commit }, id) {
      commit('moreShopCart', id);
      commit('calculateSubTotal');
    },
    calculateSubTotal({ commit }){
      commit('calculateSubTotal');
    }
  },
})
