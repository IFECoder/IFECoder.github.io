<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click='back'>
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :currentIndex='currentIndex' 
                  :switches='switches'
                  @switch='switchItem'
        ></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click='random'>
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" v-if="currentIndex===0" class="list-scroll" :data='favoriteList'>
            <div class="list-inner">
              <songList :songs='favoriteList' @select='selectSongItem'></songList>
            </div>
          </scroll>
          <scroll ref="playList" v-if="currentIndex===1" class="list-scroll" :data='playHistory'>
            <div class="list-inner">
              <songList :songs='playHistory' @select='selectSongItem'></songList>
            </div>
          </scroll>
        
      </div>
      <div class="no-result-wrapper" v-show='noResult'>
        <noResult :title='noResultDisc'></noResult>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import switches from 'base/switches/switches.vue'
  import {mapGetters,mapActions} from 'vuex'
  import scroll from 'base/scroll/scroll.vue'
  import songList from 'base/song-list/song-list.vue'
  import Song from 'common/js/song.js'
  import {playListMixin} from 'common/js/mixin.js'
  import noResult from 'base/no-result/no-result.vue'
  export default {
    mixins:[playListMixin],
    data() {
      return {
        currentIndex:0,
        switches:[
          {name:'我喜欢的'},
          {name:'最近听的'}
        ]
      }
    },
    computed: {
      noResult(){
        if (this.currentIndex===0) {
          return !this.favoriteList.length
        }else{
          return !this.playHistory.length
        }
      },
      noResultDisc(){
        if (this.currentIndex===0) {
          return '暂无喜欢的歌曲'
        }else{
          return '暂无最近听的歌曲'
        }
      },
      ...mapGetters([
        'playHistory',
        'favoriteList'
      ])
    },
    methods: {
     handlePlayList(playlist){//处理底部60px的问题
         const bottom=playlist.length>0?'60px':''
         this.$refs.listWrapper.style.bottom=bottom;
         this.$refs.favoriteList&&this.$refs.favoriteList.refresh();
         this.$refs.playList&&this.$refs.playList.refresh();
     }, 
     back(){
        this.$router.back();
     },
     switchItem(index){
      this.currentIndex=index;
     },
     selectSongItem(song,index){
       console.log(new Song(song))
       this.insertSong(new Song(song));
     },
     random(){//随机播放
       let list = this.currentIndex===0?this.favoriteList:this.playHistory
       if (list.length===0) {
         return
       }
       list=list.map((song)=>{
        return new Song(song)
       })
       this.randomPlay({
        list
       })
     },
     ...mapActions([
      'insertSong',
      'randomPlay'
     ])
    },
    components: {
      switches,
      scroll,
      songList,
      noResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
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
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
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
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>