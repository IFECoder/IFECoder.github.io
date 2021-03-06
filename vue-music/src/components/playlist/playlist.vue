<template>
  <transition name="list-fade">
    <div class="playlist" v-show='showFlag' @click='hide'>
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class='modeIcon' @click='changeMode'></i>
            <span class="text">{{modeText()}}</span>
            <span class="clear" @click='showConfirm'><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll :refreshDelay='refreshDelay' ref="listContent" class="list-content" :data='sequenceList'>
          <transition-group name='list' tag='ul'>
            <li :key='item.id' class="item" v-for='(item,index) in sequenceList' @click='selectItem(item,index)' ref='listEl'>
              <i class="current" :class='getCurrentIcon(item)'></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop='toggleFavorite(item)'>
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop='deleteOne(item)'>
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click='addSong'>
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click='hide'>
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm='deleteAll' text='是否清空播放列表' confirmBtn='清空'></confirm>
      <addSong ref="addSong"></addSong>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex'
  import scroll from 'base/scroll/scroll.vue' 
  import confirm from 'base/confirm/confirm.vue' 
  import {playMode} from 'common/js/config.js'
  import {playerMixin} from 'common/js/mixin'
  import addSong from 'components/add-song/add-song.vue'
  export default {
    mixins: [playerMixin],
    data() {
      return {
        showFlag:false,
        refreshDelay:100
      }
    },
    computed: {
      
    },
    methods: {
      addSong(){
        this.$refs.addSong.show();
      },
      modeText(){//播放模式文本的显示
        return this.mode===playMode.sequence?'顺序播放':this.mode===playMode.random?'随机播放':'单曲循环'
      },
      show(){
        this.showFlag=true
        setTimeout(()=>{//等dom渲染完成后需要重新计算scroll的高度  
          this.$refs.listContent.refresh()
          this.scrollToCurrent(this.currentSong)
        },20)
      },
      hide(){
        this.showFlag=false
      },
      getCurrentIcon(item){//获取当前播放的icon
        if (this.currentSong.id===item.id) {
          return 'icon-play'
        }
        return ''
      },
      selectItem(item,index){//选择播放列表中的某一项进行播放
        if (this.mode===playMode.random) {
          index = this.playlist.findIndex((song)=>{
            return item.id===song.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlaying(true);
      },
      scrollToCurrent(currentSong){//打开播放列表的时候滚动到当前歌曲
        const index=this.sequenceList.findIndex((song)=>{
          return currentSong.id===song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.listEl[index],300)
      },
      deleteOne(item){//删除播放列表中的某一首歌
        this.deleteSong(item);
      },
      showConfirm(){//显示清空对话框
        this.$refs.confirm.show()
      },
      deleteAll(){//清空播放列表
        this.deleteSongList();
      },
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ])
    },
    watch: {
      currentSong(newSong,oldSong){
        if (!this.showFlag || oldSong.id===newSong.id) {
          return
        }
        setTimeout(() => {
          this.scrollToCurrent(newSong)
        }, 20)
      }
    },
    components: {
      scroll,
      confirm,
      addSong
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>