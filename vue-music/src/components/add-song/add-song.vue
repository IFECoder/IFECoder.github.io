<template>
  <transition name="slide">
    <div class="add-song" v-show='showFlag' @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click='hide'>
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <searchBox ref='searchBox' @query='onQueryChange' placeholder="搜索歌曲"></searchBox>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches='switches' :currentIndex="currentIndex" @switch='selectItem'></switches>
        <div class="list-wrapper">
          <scroll ref="songList" v-if="currentIndex===0" class="list-scroll" :data='playHistory'>
            <div class="list-inner">
              <songList :songs='playHistory' @select='selectSongItem'></songList>
            </div>
          </scroll>
          <scroll :refreshDelay='refreshDelay' ref="searchList" v-if="currentIndex===1" class="list-scroll" :data="searchHistory">
            <div class="list-inner">
              <searchList @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></searchList>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest ref='suggest' :showSinger='showSinger' :query='query' @listScroll='inputBlur' @select="selectSuggest"></suggest>
      </div>
      <topTip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </topTip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {searchMixin} from 'common/js/mixin.js'
  import searchBox from 'base/search-box/search-box.vue'
  import suggest from 'components/suggest/suggest.vue'
  import switches from 'base/switches/switches.vue'
  import scroll from 'base/scroll/scroll.vue'
  import songList from 'base/song-list/song-list.vue'
  import {mapGetters,mapActions} from 'vuex'
  import Song from 'common/js/song.js'
  import searchList from 'base/search-list/search-list.vue'
  import topTip from 'base/top-tip/top-tip.vue'
  export default {
    mixins:[searchMixin],//在组件中插入该mixin
    data() {
      return {
        showFlag:false,
        showSinger:false,
        switches:[
          {
            name:'最近播放'
          },
          {
            name:'搜索历史'
          }
        ],
        currentIndex: 0
      }
    },
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    methods: {
     show(){
       this.showFlag=true
       setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        }, 20)
     },
     hide(){
       this.showFlag=false
     },
     selectItem(index){//切换最近播放与播放历史
       this.currentIndex = index
     },
     selectSongItem(song,index){//选择歌曲加入到最近播放
        if (this.index!==0) {
          this.insertSong(new Song(song));
          this.$refs.topTip.show()
        }
     },
     selectSuggest() {
        this.$refs.topTip.show();
        this.saveSearch()
     },
     ...mapActions([
        'savePlayHistory',
        'insertSong'
     ])
    },
    components: {
      searchBox,
      suggest,
      switches,
      scroll,
      songList,
      searchList,
      topTip
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>