<template>
  <a :href="detailUrl">
      <div class="book-card">
        <div class="bookImg" @click.stop='previewImage'>
            <img :src="book.image" mode='aspectFit'>
        </div>
        <div class="detail">
            <div class="row">
                <div class="right">
                    {{book.rate}}<rate :value='book.rate'></rate>
                </div>
                <div class="left">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    浏览量:{{book.count}}
                </div>
                <div class="left">
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    添加人:{{book.user_info.nickName}}
                </div>
                <div class="left">
                    {{book.publisher}}
                </div>
            </div>
        </div>
    </div>
  </a>
</template>

<script>
import rate from '@/components/Rate'
export default {
  data(){
    return {
    }
  },
  props:[
    'book'
  ],
  computed:{
      detailUrl(){
          return '/pages/detail/main?id='+this.book.id
      }
  },
  methods:{
      previewImage(){
         wx.previewImage({
            current: this.book.image, 
            urls: [this.book.image] 
         })
      }
  },
  components:{
    rate
  },
  created(){}
}
</script>

<style lang="scss" scoped>
.book-card{
    padding: 5px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    .bookImg{
        width: 90px;
        height: 90px;
        margin: 0 auto;
        float: left;
        overflow: hidden;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .detail{
        margin-left: 100px;
        .row{
            line-height:20px;
            .left{
                margin-right:80px;
            }
            .right{
                float: right;
            }
        }
    }
}
</style>