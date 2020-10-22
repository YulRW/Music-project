// 引入vue全家桶
import Vue from 'vue'
import router from './router'
import store from './store'

// 引入App组件
import App from './App.vue'

// 引入样式
import './assets/css';

import vuetify from './plugins/vuetify';

// 配置
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')