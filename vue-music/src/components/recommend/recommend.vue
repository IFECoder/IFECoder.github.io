<template>
    <div class="recommend" ref="recommend">
       <Scroll :data='discList' class="recommend-content" ref='list'>
          <div>
            <Swiper :swiperSlides='sliders'></Swiper>
            <div class="recommend-list">
               <h1 class="list-title">热门歌单推荐</h1> 
               <ul>
                   <li @click='selectItem(item)' v-for='item in discList' class="item">
                       <div class="icon">
                           <img width="60" height="60" v-lazy="item.imgurl" alt="">
                       </div>
                       <div class="text">
                           <h2 class="name" v-html='item.creator.name'></h2>
                           <p class="desc" v-html='item.dissname'></p>
                       </div>
                   </li>
               </ul>
            </div>
          </div>
          <div class="loading-container" v-show='!discList.length'>
            <Loading></Loading> 
          </div>
       </Scroll>
       <router-view></router-view>
    </div>
</template>
<script>
 import {getRecommend, getDiscList} from 'api/recommend'
 import {ERR_OK} from 'api/config'
 import Swiper from 'base/swiper/swiper.vue'
 import Scroll from 'base/scroll/scroll.vue'
 import Loading from 'base/loading/loading.vue'
 import {playListMixin} from 'common/js/mixin.js'
 import {mapMutations} from 'vuex'
    export default{
      mixins:[playListMixin],//在组件中插入该mixin
    	data(){
    		return{
          sliders:[],
          discList:[]
        }
    	},
    	created(){
        this._getRecommend();
        this._getDiscList()
    	},
    	methods:{
        selectItem(item){
          this.$router.push({
              path:`/recommend/${item.dissid}`
            })
            this.setDisc(item)
        },
        ...mapMutations({
            setDisc:'SET_DISC'
        }),
        handlePlayList(playlist){//处理播放列表在底部滚动时有60px的遮挡问题
          const bottom=playlist.length>0?'60px':''
          this.$refs.recommend.style.bottom=bottom;
          this.$refs.list.refresh();
        },
	    	_getRecommend() {//获取轮播图数据
		        getRecommend().then((res) => {
		          if (res.code === ERR_OK) {
		            this.sliders=res.data.slider;
		          }
		        })
	        },
           _getDiscList() {//获取歌单列表数据
                getDiscList().then((res) => {
                  if (res.code === ERR_OK) {
                    this.discList = res.data.list
                  }
                })
            }
            	},
    	computed:{},
    	components:{
            Swiper,
            Scroll,
            Loading
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
          height: 100%
          overflow: hidden
          .recommend-list
            .list-title
              height: 65px
              line-height: 65px
              text-align: center
              font-size: $font-size-medium
              color: $color-theme
            .item
              display: flex
              box-sizing: border-box
              align-items: center
              padding: 0 20px 20px 20px
              .icon
                flex: 0 0 60px
                width: 60px
                padding-right: 20px
              .text
                display: flex
                flex-direction: column
                justify-content: center
                flex: 1
                line-height: 20px
                overflow: hidden
                font-size: $font-size-medium
                .name
                  margin-bottom: 10px
                  color: $color-text
                .desc
                  color: $color-text-d
          .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>