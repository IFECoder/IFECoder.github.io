<template>
  <div class="swiper">
    <swiper
      indicator-dots='true'
      indicator-color='#EA5A49'
      autoplay='true'
      interval='6000'
      duration='1000'
      circular='true'
    >
      <div :key='imgIndex' v-for="(top,imgIndex) in imgUrl">
        <swiper-item>
          <img 
            @click='bookDetail(img)'
            class="slide-image" 
            mode='aspectFit'
            :key="img.id"
            v-for='img in top' 
            :src="img.image">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props:[
    'tops'
  ],
  computed:{
    imgUrl(){
      let res=this.tops;
      return [res.slice(0,3),res.slice(3,6),res.slice(6)]
    }
  },
  methods:{
    bookDetail(item){
      wx.navigateTo({
        url: '/pages/detail/main?id='+item.id
      })
    }
  },
  components:{},
  created(){}
}
</script>

<style lang="scss" scoped>
.swiper{
  margin-top:5px;
  .slide-image{
    width: 33%;
    height: 250rpx;
  }
}
</style>