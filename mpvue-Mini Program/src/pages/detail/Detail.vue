<template>
  <div class="container">
      <BookInfo :info='info'></BookInfo> 
      <CommentList :comments='comments'></CommentList>
      <!--评论模块-->
      <div class="comment" v-if='showAdd'>
          <textarea class="textarea" 
                    v-model="comment"
                    maxlength="100"
                    placeholder="请输入图书短评"
          ></textarea>
          <div class="location">
              地理位置:
              <switch color='#EA5A49' :checked='location' @change="getGeo"/>
              <span class='text-primary'>{{location}}</span>
          </div>
          <div class="phone">
              手机型号:
              <switch color='#EA5A49' :checked='phone' @change="getPhone"/>
              <span class='text-primary'>{{phone}}</span>
          </div>
          <button class="btn" @click='addComment'>
              评论
          </button>
      </div> 
      <div v-else class="text-footer">未登录或者已经评论过啦</div>
      <button open-type='share' class="btn">转发给好友</button>
  </div>
</template>

<script>
import {get,post,showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
  data(){
    return {
        bookid:'',
        info:{},
        comment:'',
        location:'',
        phone:'',
        userInfo:'',
        comments:[]
    }
  },
  props:{},
  computed:{//挂载到this上的方法
      showAdd(){
          //用户未登录、自己已评论过的不再显示输入框
          if(!this.userInfo.openId){
              return false
          }
          if(this.comments.filter(item=>item.openid===this.userInfo.openId).length){
              return false
          }
          return true
      }
  },
  methods:{
      async getComments(){//获取评论数据
          const comments = await get('/weapp/commentlist',{bookid:this.bookid})
          this.comments=comments.list
      },
      async addComment(){//添加评论
          //评论、位置、手机型号、图书id、oppenid
          if(!this.comment){
              return
          }
          const data = {
              comment:this.comment,
              location:this.location,
              phone:this.phone,
              bookid:this.bookid,
              openid:this.userInfo.openId
          }
          try {
              await post('/weapp/addComment',data);
              this.comment=''
              this.getComments()
          } catch (error) {
              showModal('失败啦',error.msg)
          }
      },
      async getDetail(){//获取详情数据
          const info = await get('/weapp/bookdetail',{id:this.bookid})
          this.info=info
          wx.setNavigationBarTitle({//更改页面顶部标题
            title: info.title
          })
      },
      getPhone(e){//获取手机型号
          if (e.target.value) {
              const phoneInfo = wx.getSystemInfoSync();
              this.phone = phoneInfo.model
          } else {
              this.phone = ''
          }
      },
      getGeo(e){//获取地理位置
        const ak ='411FxuXDOBiMDEv3TiTO5F8Mtc27wpad';
        const url = 'http://api.map.baidu.com/geocoder/v2/'
        if (e.target.value) {
            wx.getLocation({
                success:geo=>{
                    wx.request({
                        url, 
                        data: {
                            location:`${geo.latitude},${geo.longitude}`,
                            ak,
                            output:'json'
                        },
                        success:res=>{
                            if(res.data.status===0){
                                this.location = res.data.result.addressComponent.city
                            }
                        }
                    })
                }
            })
        } else {
            this.location=''
        }
      }
  },
  components:{
      BookInfo,
      CommentList
  },
  created(){},
  mounted() {//页面加载完成之后，只加载一次
      this.bookid=this.$root.$mp.query.id
      this.getDetail();
      this.getComments();
      const userinfo = wx.getStorageSync('userinfo')
      this.userInfo=userinfo;
  },
  onShow () {
    wx.showShareMenu()
  }
}
</script>

<style lang="scss" scoped>
.comment{
  margin-top: 10px;
  .textarea{
      background: #eee;
      width: 730rpx;
      padding: 10rpx;
      height: 200rpx;
  }
  .location{
      margin-top: 10px;
      padding: 5px 10px;
  }
  .phone{
      margin-top: 10px;
      padding: 5px 10px;
  }
}
</style>