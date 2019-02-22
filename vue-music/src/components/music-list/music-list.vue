<template>
  <div class="music-list" ref='musicList'>
    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html='title'></h1>
    <div class="bg-image" :style='bgStyle' ref='bgImage'>
      <div class="play-wrapper">
        <div class="play" ref='playBtn' v-show='songs.length>0' @click='random'>
          <i class="icon-play"></i>
          <span class="text">
            随机播放全部
          </span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref='layer'></div>
    <scroll :data="songs" 
            class="list" 
            ref='list'
            :probeType='probeType'
            :listenScroll='listenScroll'
            @scroll="scroll">
      <div class="song-list-wrapper">
        <songList :rank='rank' @select='select' :songs='songs'></songList>
      </div>
      <div class="loading-container" v-show='!songs.length'>
        <loading></loading>
      </div>
    </scroll>  
  </div>
</template>
<script>
    import scroll from 'src/base/scroll/scroll.vue'
    import songList from 'src/base/song-list/song-list.vue'
    import {prefixStyle} from 'common/js/dom.js'
    import loading from 'base/loading/loading.vue'
    import {mapActions} from 'vuex'
    import {playListMixin} from 'common/js/mixin.js'
    const SPACE_HEIGHT = 40
    const transform = prefixStyle('transform');
    export default{
      mixins:[playListMixin],//在组件中插入该mixin
      props:{
        title:{
            type:String,
            default:''
          },
          songs:{
            type:Array,
            default:[]
          },
          bgImage:{
            type:String,
            default:''
          },
          rank:{
            type:Boolean,
            default:false
          }
      },
      mounted(){
        this.bgImageHeight=this.$refs.bgImage.clientHeight;
        this.minTranslateY=-this.bgImageHeight+SPACE_HEIGHT;
        this.$refs.list.$el.style.top=`${this.bgImageHeight}px`;
      },
      created(){
        this.probeType = 3;
        this.listenScroll=true;
      },
      data(){
        return {
          scrollY:0
        }
      },
      methods:{
        handlePlayList(playlist){
           const bottom=playlist.length>0?'60px':''
           this.$refs.list.$el.style.bottom=bottom;
           this.$refs.list.refresh();
        },
        scroll(pos){
          this.scrollY=pos.y;
        },
        back(){
          this.$router.back();
        },
        select(song,index){//选择的是这个歌曲和这个索引。接收子组件派发过来的两个参数
          this.selectPlay({
            list:this.songs,
            index
          })
        },
        random(){
        this.randomPlay({
        list:this.songs
        })
        },
        ...mapActions([
          'selectPlay',
          'randomPlay'
        ])
      },
      computed:{
        bgStyle(){
          return `background-image:url(${this.bgImage})`
        }
      },
      watch:{
        scrollY(newY){
          let tanslateY = Math.max(this.minTranslateY,newY);
          let zIndex = 0;
          let scale = 1;
          this.$refs.layer.style[transform]=`translate3d(0,${tanslateY}px,0)`
          const percent = Math.abs(newY/this.bgImageHeight)
          if (newY>0) {
            scale = 1+percent;
            zIndex=10
          }
          this.$refs.bgImage.style[transform]=`scale(${scale})`
          if (newY<this.minTranslateY) {//向上滚动时让bg在上方
            zIndex=10;
            this.$refs.bgImage.style.paddingTop=0;
            this.$refs.bgImage.style.height=`${SPACE_HEIGHT}px`;
            this.$refs.playBtn.style.display='none';
          }else {//向下滚动时还原
            this.$refs.bgImage.style.paddingTop='70%'
            this.$refs.bgImage.style.height=0;
            this.$refs.playBtn.style.display=''
          }
            this.$refs.bgImage.style.zIndex=zIndex;
        }
      },
      components:{
        scroll,
        songList,
        loading
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>