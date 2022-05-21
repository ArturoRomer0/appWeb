import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAnimXYZ from '@animxyz/vue'
import '@animxyz/core'
import VueFlicking from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";
import "@egjs/vue-flicking/dist/flicking-inline.css";

Vue.use(VueAnimXYZ)
Vue.use(VueAxios, axios )// Axios vue
Vue.use(VueFlicking);
Vue.config.productionTip = false
Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
