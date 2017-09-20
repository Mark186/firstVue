// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routerfile from './router'
//import axios from 'axios';
/* import http from './utils/http'
import api from './utils/api' */
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
//Vue.prototype.$ajax = axios.create({});

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  routes: routerfile
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  render:h=>h(App)
})
