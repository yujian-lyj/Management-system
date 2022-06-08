// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './plugins/element.js'
import { Drawer, Message } from 'element-ui';
Vue.prototype.$message = Message;
import {MessageBox} from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm;
import axios from "axios";
Vue.prototype.$axios = axios;

// 引入全局样式
import './assets/css/global.css'
// 引入字体图标
import 'font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


