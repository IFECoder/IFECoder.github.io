import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Rank = (resolve) => {
  import('components/rank/rank.vue').then((module) => {
    resolve(module)
  })
}

const Recommend = (resolve) => {
  import('components/recommend/recommend.vue').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('components/search/search.vue').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('components/singer/singer.vue').then((module) => {
    resolve(module)
  })
}

const singerDetail = (resolve) => {
  import('components/singer-detail/singer-detail.vue').then((module) => {
    resolve(module)
  })
}

const discDetail = (resolve) => {
  import('components/disc-detail/disc-detail.vue').then((module) => {
    resolve(module)
  })
}

const topList = (resolve) => {
  import('components/top-list/top-list.vue').then((module) => {
    resolve(module)
  })
}

const userCenter = (resolve) => {
  import('components/user-center/user-center.vue').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
  	{
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/rank',
      component: Rank,
      children:[
        {
          path: ':id',
          component: topList
        }
      ]
    },
    {
      path: '/recommend',
      component: Recommend,
      children:[
        {
          path: ':id',
          component: discDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children:[
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children:[
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/user',
      component: userCenter
    }
  ]
})
