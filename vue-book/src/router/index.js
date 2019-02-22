import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:'history',//默认是没有模式的。没模式就是hash的，有模式的就是带/的
  routes: [
  	{
      path:'/add',
      component:() => import('../components/Add.vue'),//代码分割，分别加载各自的资源文件避免到时候打包到一个文件之后，文件过大造成加载过慢的情况
      meta:{
        title:'添加'
      }
    },
  	{
      path:'/collect',
      component:() => import('../components/Collect.vue'),
      meta:{
        title:'收藏'
      }
    },
  	{
  		path:'/home',
  		component:() => import('../components/Home.vue'),
  		meta:{
  			keepAlive:true,  //页面级缓存不会再重新获取数据、不会重新发起请求
        title:'首页'
  		}
  	},
  	{
      path:'/list',
      component:() => import('../components/List.vue'),
      meta:{
        title:'列表页'
      }
    },
  	{ 
      path:'/detail/:bid',
      component:() => import('../components/Detail.vue'),
      name:'detail',
      meta:{
        title:'详情页'
      }
    },
  	{ 
      path:'/',
      redirect:'/home'
    },
  	{ path:'*',
      redirect:'/home'
    }
  ]
})
//给网页内容加标题 beforeach
//路由是一个插件、vuex也是一个插件需要use一下

