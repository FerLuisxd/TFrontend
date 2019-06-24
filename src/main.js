import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store.js'
import VueRouter from 'vue-router'
import axios from 'axios'
import Notifications from 'vue-notification'
 
 
Vue.use(Notifications)

Vue.use(VueRouter)
Vue.config.productionTip = false

axios.defaults.baseURL='http://localhost:5000/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

///hello world!