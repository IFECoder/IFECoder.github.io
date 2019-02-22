/*main.js为入口文件*/
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
//导入轮播图组件--在main.js中全局引入
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
import VueLazyload  from 'vue-lazyload'
//使用轮播图组件
fastclick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload,{
	loading: require('common/image/default.png')
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
