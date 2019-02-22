<template>
  <div>
    <TopsSwiper :tops='tops'></TopsSwiper>
    <card :key="book.id" v-for='book in books' :book='book'></card>
    <p class="text-footer" v-if="!more">没有更多数据了</p>
  </div>
</template>

<script>
import {get} from '@/util'
import card from '@/components/Card'
import TopsSwiper from '@/components/TopsSwiper'
export default {
  data(){
    return {
      books:[],
      more:true,
      page:0,
      tops:[]
    }
  },
  props:{},
  computed:{},
  methods:{
    async getList(init){
      if(init){
        this.more=true
        this.page=0
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist',{page:this.page})
      if(books.list.length<10&&this.page>0){//没有更多了
        this.more = false
      }
      if(init){
        this.books=books.list
        wx.stopPullDownRefresh()
      }else{//否则那就是上拉加载的数据
        this.books=this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop(){
      const tops = await get('/weapp/top')
      this.tops = tops.list;
    }
  },
  onPullDownRefresh(){//获取下拉刷新的数据
    this.getList(true)
    this.getTop()
  },
  onReachBottom(){//获取上拉加载的数据
    if(!this.more){
      return false
    }
    this.page = this.page+1
    this.getList()
  },
  components:{
    card,
    TopsSwiper
  },
  mounted(){
    this.getList(true)
    this.getTop()
  },
  onShow () {
    wx.showShareMenu()
  }
}
</script>

<style lang="scss" scoped>

</style>
