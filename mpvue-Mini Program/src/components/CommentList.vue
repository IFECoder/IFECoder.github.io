<template>
  <div class="page-list">
      <div class="page-title" v-if='comments.length'>
          评论
      </div>
      <div class="comment" 
           v-for="comment in comments"
           :key='comment.id'  
           @click="enterBook(comment)" 
      >
          <div class="user">
              <img :src="comment.image"
                   class="avatar"
                   mode='aspectFit'
              >
              {{comment.title}}
              <div class="right">
                  {{comment.location||'未知位置'}}
                  <span>--</span>
                  {{comment.phone||'未知型号'}}
              </div>
          </div>
          <div class="content">
              {{comment.comment}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props:['comments','type'],
  computed:{},
  methods:{
      enterBook(comment){
          if (this.type==='user') {
              wx.navigateTo({
                url:'/pages/detail/main?id='+comment.bookid
              })
          }
      }
  },
  components:{},
  created(){}
}
</script>

<style lang="scss" scoped>
.page-list{
    background: #eee;
    font-size: 14px;
    .comment{
        background: #fff;
        margin-bottom:10px;
        padding:5px 20px;
        .user{
            .avatar{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        .content{
            margin:10px 0;
        }
    }
}
</style>