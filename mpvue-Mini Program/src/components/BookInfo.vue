<template>
  <div class="container">
      <div class="bookInfo">
         <img
            class="blurImg" 
            :src="info.image"
            mode='aspectFill'
         >
         <img 
              class="img"
              :src="info.image"
              mode='aspectFit'
         >
         <div class="info">
           <div class="title">
             {{info.title}}
           </div>
           <div class="author">
             {{info.author}}
           </div>
         </div>
      </div>
      <div class="detail">
        <img  class="avatar"
              :src="userInfo.avatarUrl">
        {{userInfo.nickName}}
        <div class="right text-primary">
          {{info.rate}}分
          <rate :value='info.rate'></rate>
        </div>
      </div>
      <div class="detail">
        {{info.publisher}}
        <div class="right">
          {{info.price}}
        </div>
      </div>
      <div class="tags">
        <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
      </div>
      <div class="summary">
        <p :key="i" v-for="(sum,i) in info.summary">{{sum}}</p>
      </div>
  </div>
</template>

<script>
import rate from '@/components/Rate'
export default {
  data(){
    return {
    }
  },
  props:['info'],
  computed:{
    userInfo(){
        return this.info.user_info|| {}
      }
  },
  methods:{
  },
  components:{
    rate
  },
  created(){}
}
</script>

<style lang="scss" scoped>
.container{
  font-size: 14px;
  .badge{
    margin: 5px;
    padding: 5px;
    display: inline-block;
    border-radius: 10px;
    color: #EA5149;
    border: 1px #EA5149 solid;
  }
  .summary{
    margin-top: 5px;
    padding: 0 10px;
    p{
      text-indent: 2em;
      font-size: 14px;
    }
  }
  .right{
    float: right;
  }
  .detail{
    padding: 5px 10px;
    .avatar{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .bookInfo{
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .blurImg{
      width: 100%;
      filter: blur(15px);
    }
    .img{
      width: 100%;
      height:300rpx;
      position: absolute;
      top: 30rpx;
      left: 0;
    }
    .info{
      color: white;
      text-align: center;
      position: absolute;
      top: 330rpx;
      left: 0;
      width: 100%;
      .title{
        font-size: 20px;
      }
      .author{  
        font-size: 14px;
      }
    }
  }
}
</style>