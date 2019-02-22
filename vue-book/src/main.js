// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from'./store/index.js'

Vue.config.productionTip = false;
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://timgsa.baidu.com/timg?image&quality=100&sharpen=100&er=&imgtype=0&wh_rate=null&size=h120&sec=1530190274281&di=f8e6e2624db660427f983ed61af73ca3&src=http%3A%2F%2Fmt1.baidu.com%2Ftimg%3Fshitu%26quality%3D100%26sharpen%3D100%26er%3D%26imgtype%3D0%26wh_rate%3Dnull%26size%3D9%26sec%3D1530180194%26di%3Dc23c5cc8cf32700ce9b3e818e351de1a%26cut_x%3D183.46666666666667%26cut_y%3D0%26cut_w%3D936.5333333333333%26cut_h%3D718.9333333333333%26src%3Dhttp%253A%252F%252Fimg.zcool.cn%252Fcommunity%252F016bda59c27947a801218e18a97342.gif',
  loading: 'http://5b0988e595225.cdn.sohucs.com/images/20170927/d1fcc27841d540ca8cb85973090a0f61.gif',
  attempt: 1
})

//全局钩子，实现标题的功能
router.beforeEach( (to,from,next)=> {
	document.title=to.meta.title;
	next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
