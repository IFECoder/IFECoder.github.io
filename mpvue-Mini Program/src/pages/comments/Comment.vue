<template>
  <div class="container">
    <CommentList 
        :comments='comments'
        type='user'
        v-if="userInfo.openId"
    ></CommentList>
    <div v-if="userInfo.openId">
        <div class="page-title">
          我的图书
        </div>
        <card :key="book.id" 
              v-for='book in books' 
              :book='book'>
        </card>
        <div v-if='!books.length'>暂时还没添加过书，快去添加几本吧</div>
    </div>
  </div>
</template>

<script>
import {get} from '@/util'
import CommentList from '@/components/CommentList'
import card from '@/components/Card'
export default {
  data(){
    return {
      userInfo:'',
      books:[],
      comments:[]
    }
  },
  props:{},
  computed:{},
  methods:{
    init(){//页面加载进来之后初始化一些数据
      wx.showNavigationBarLoading()
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading()
    },
    async getComments(){//获取评论数据
        const comments = await get('/weapp/commentlist',{openId:this.userInfo.openId})
        this.comments=comments.list
    },
    async getBooks(){//获取图书数据
        const books = await get('/weapp/booklist',{openId:this.userInfo.openId})
        this.books=books.list
    }
  },
  components:{
    CommentList,
    card
  },
  created(){},
  onPullDownRefresh(){//获取下拉刷新的数据-小程序的生命周期
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow() {//小程序的生命周期
    wx.showShareMenu()
    if (!this.userInfo.openId) {
      const userinfo = wx.getStorageSync('userinfo');//获取本地存储中的用户数据
      if (userinfo) {
        this.userInfo=userinfo;
        this.init();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.container{}
</style>