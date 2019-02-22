<template>
    <div class="player" v-show='playlist.length>0'>
    	<transition name='normal'
                  @enter="enter"
                  @after-enter="afterEnter"
                  @leave="leave"
                  @after-leave="afterLeave">
        <div class="normal-player" v-show='fullScreen'>
          <div class="background">
            <img width="100%" height='100%'>  
          </div>
          <div class="top">
            <div class="back" @click='back'>
              <i class="icon-back"></i>
            </div>
            <h1 class="title" v-html='currentSong.name'></h1>
            <h2 class="subtitle" v-html='currentSong.singer'></h2>
          </div>
          <div class="middle"
                @touchstart='middleTouchstart'
                @touchmove='middleTouchmove'
                @touchend='middleTouchend'
          >
            <div class="middle-l" ref='middleL'>
              <div class="cd-wrapper" ref='cdWrapper'>
                <div class="cd" :class='cdCls'>
                  <img class="image" :src="currentSong.image" >
                </div>
              </div>
              <div class='playing-lyric-wrapper'>
                <div class='playing-lyric'>
                  {{playingLyric}}
                </div>
              </div>
            </div>
            <Scroll class="middle-r" ref="lyricList" :data='currentLyric&& currentLyric.lines'>
              <div class="lyric-wrapper">
                <div v-if="currentLyric">
                  <p ref="lyricLine"
                     class="text"
                     :class='{current:currentLineNum===index}'
                     v-for='(lyric,index) in currentLyric.lines'
                     >{{lyric.txt}}</p>
                </div>
              </div>
            </Scroll>
          </div>
          <div class="bottom">
            <div class="dot-wrapper">
            <span class="dot" :class="{active:this.currentShow==='cd'}"></span>
            <span class="dot" :class="{active:currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progressBar :precent='precent' @precentChange='precentChange'></progressBar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
            <div class="operators">
              <div class="icon i-left" @click='changeMode'>
                <i :class="modeIcon"></i>
              </div>
              <div class="icon i-left" :class='disableCls'>
                <i @click='prev' class="icon-prev"></i>
              </div>
              <div class="icon i-center" :class='disableCls'>
                <i :class="playIcon" @click='togglePlaying'></i>
              </div>
              <div class="icon i-right" :class='disableCls'>
                <i @click='next' class="icon-next"></i>
              </div>
              <div class="icon i-right">
                <i class="icon" @click='toggleFavorite(currentSong)' :class='getFavoriteIcon(currentSong)'></i>
              </div>
            </div>
          </div>
        </div> 
      </transition>
    	<transition name='mini'>
         <div class="mini-player" v-show='!fullScreen' @click='open'>
           <div class="icon">
             <img width="40" height='40' :class='cdCls' :src="currentSong.image" >
           </div>
           <div class="text">
             <h2 class="name" v-html='currentSong.name'></h2>
             <p class="desc" v-html='currentSong.singer'></p>
           </div>
           <div class="control">
             <progressCircle :widthHeight='widthHeight' :precent="precent">
                <i class='icon-mini' :class="playIconMini" @click.stop='togglePlaying'></i>
             </progressCircle>
           </div>
           <div class="control" @click.stop='showPlaylist'>
             <i class="icon-playlist"></i>
           </div> 
         </div> 
      </transition> 
      <playlist ref='playlist'></playlist>
      <audio :src="currentSong.url" ref='audio' @play='ready' @error='error' @timeupdate ='updateTime' @ended='endPlay'></audio> 
    </div>
</template>
<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {prefixStyle} from 'common/js/dom'
  import progressBar from 'base/progress-bar/progress-bar.vue'
  import progressCircle from 'base/progress-circle/progress-circle.vue'
  import {playMode} from 'common/js/config.js'
  import {shuffle} from 'common/js/util.js'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll.vue'
  import playlist from 'components/playlist/playlist.vue'
  import {playerMixin} from 'common/js/mixin'
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
    export default {
      mixins: [playerMixin],
    	data(){
    		return {
          songReady:false,
          currentTime:0,
          widthHeight:32,
          currentLyric:null,
          currentLineNum:0,
          currentShow:'cd',
          playingLyric:''
        }
    	},
    	methods:{
    	showPlaylist(){//显示播放列表
    		this.$refs.playlist.show();
    	},
        back(){
          this.setFullScreen(false);
        },
        open(){
          this.setFullScreen(true);
        },
        enter(el, done) {//利用js钩子实现动画
          const {x, y, scale} = this._getPosAndScale()

          let animation = {//利用js的方式来创建css动画（通过第三方库）
            0: {
              transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
            },
            60: {
              transform: `translate3d(0,0,0) scale(1.1)`
            },
            100: {
              transform: `translate3d(0,0,0) scale(1)`
            }
          }
          animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
              duration: 400,
              easing: 'linear'
            }
          })

          animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter() {
          animations.unregisterAnimation('move')
          this.$refs.cdWrapper.style.animation = ''
        },
        leave(el, done) {
          this.$refs.cdWrapper.style.transition = 'all 0.4s'
          const {x, y, scale} = this._getPosAndScale()
          this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
          this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave() {
          this.$refs.cdWrapper.style.transition = ''
          this.$refs.cdWrapper.style[transform] = ''
        },
        _getPosAndScale() {
          const targetWidth = 40
          const paddingLeft = 40
          const paddingBottom = 30
          const paddingTop = 80
          const width = window.innerWidth * 0.8
          const scale = targetWidth / width
          const x = -(window.innerWidth / 2 - paddingLeft)
          const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
          return {
            x,
            y,
            scale
          }
        },
        togglePlaying(){
          if (!this.songReady) {
            return
          }
          this.setPlaying(!this.playing)
          if (this.currentLyric) {
            this.currentLyric.togglePlay()
          }
        },
        next(){//下一首歌
          if (!this.songReady) {
            return
          }
          if (this.playlist.length===1) {
            this.loop()
            return
          }else{
            let index = this.currentIndex+1;
            if (index===this.playlist.length) {
              index=0;
            }
            this.setCurrentIndex(index);
            if (!this.playing) {
              this.togglePlaying()
            }
          }
          //this.setPlaying(true);
          this.songReady=false;
        },
        prev(){//上一首歌
          if (!this.songReady) {
            return
          }
          if (this.playlist.length === 1) {
            this.loop()
            return
          }else{
            let index = this.currentIndex-1;
            if (index===-1) {
              index=this.playlist.length-1;
            }
            this.setCurrentIndex(index)
            if (!this.playing) {
              this.togglePlaying()
            }
          }
          //this.setPlaying(true);
          this.songReady=false;
        },
        ready(){//歌曲准备好之后才能执行切换歌曲操作
          this.songReady=true;
          this.savePlayHistory(this.currentSong);
        },
        error(){//歌曲出错，请求不到url
          this.songReady=true;
        },
        disableCls(){//当网络不好的时候播放歌曲不能进行点击操作
          return this.songReady ? '' :'disable'
        },
        updateTime(ev){//更新时间，显示当前播放的时间
          this.currentTime=ev.target.currentTime
        },
        format(interval){//对歌曲的时长进行格式化
          interval = interval|0;
          const minute = interval/60|0;
          const second = this._addZero(interval%60);
          return `${minute}:${second}`
        },
        _addZero(num,n=2){//对秒小于10的前面加零处理
          let len = num.toString().length;
          while (len<n) {
            num='0'+num;
            len++;
          }
          return num
        },
        precentChange(precent){//改变比例
          const currentTime=precent*this.currentSong.duration;
          this.$refs.audio.currentTime=currentTime;
          if (!this.playing) {
            this.togglePlaying();
          }
          if (this.currentLyric) {
            this.currentLyric.seek(currentTime*1000)
          }
        },
        endPlay(){//audio标签结束播放会触发该事件
          if (this.mode===playMode.loop) {
            this.loop();
          }else{
            this.next();
          }
        },
        loop(){//循环播放
          this.$refs.audio.currentTime=0;
          this.$refs.audio.play();
        },
        getLyric(){//获取歌词,并解析歌词,异步请求
          this.currentSong.getLyric().then((lyric)=>{
            if (this.currentSong.lyric!==lyric) {
              return
            }
            this.currentLyric=new Lyric(lyric,this.handlerLyric);
            if (this.playing) {
              this.currentLyric.play()
            }
          })
        },
        handlerLyric({lineNum, txt}){//处理歌词：让歌词滚动起来
          this.currentLineNum=lineNum;
          if (lineNum>5) {
            let lineEl = this.$refs.lyricLine[lineNum-5]
            this.$refs.lyricList.scrollToElement(lineEl,1000)
          }else{
            this.$refs.lyricList.scrollTo(0,0,1000)
          }
          this.playingLyric=txt;
        },
        middleTouchstart(ev){
          this.touch.initiated = true;//定义一个标志位，显示touch开始
          const touch = ev.touches[0];
          this.touch.startX = touch.pageX;
          this.touch.startY = touch.pageY;
        },
        middleTouchmove(ev){
          if (!this.touch.initiated) {
            return
          }
          const touch = ev.touches[0];
          const deltaX = touch.pageX-this.touch.startX;
          const deltaY = touch.pageY-this.touch.startY;
          if (Math.abs(deltaY)>Math.abs(deltaX)) {
            return
          }
          const left = this.currentShow==='cd'?0:-window.innerWidth;
          const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left+deltaX));
          this.touch.percent=Math.abs(offsetWidth/window.innerWidth);
          this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0) `
          this.$refs.middleL.style.opacity=1-this.touch.percent;
        },
        middleTouchend(ev){//用于歌词左右滑动
          let offsetWidth
          let opacity
          if (this.currentShow==='cd') {
            if (this.touch.percent>0.1) {
              offsetWidth=-window.innerWidth
              this.currentShow='lyric'
              opacity=0
            }else{
              offsetWidth=0
            }
          }else{
            if (this.touch.percent<0.9) {
               offsetWidth=0
               this.currentShow='cd'
               opacity=1
            }else{
              offsetWidth=-window.innerWidth
            }
          }
           const time = 300
           this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0) `
           this.$refs.lyricList.$el.style[transitionDuration]=`${time}ms`;
           this.$refs.middleL.style.opacity=opacity;
           this.$refs.middleL.style[transitionDuration]=`${time}ms`;

        },
        ...mapMutations({
          setFullScreen:'SET_FULL_SCREEN'
        }),
        ...mapActions([
            'savePlayHistory'
        ])
      },
      created(){//创建组件后定义touch变量，用来关联touchmove与touchstart之间的数据
        this.touch={}
      },
    	computed:{
        playIcon(){
          return this.playing ? 'icon-pause' : 'icon-play'
        },
        playIconMini(){
          return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        cdCls(){
          return this.playing ? 'play' : 'play pause'
        },
        precent(){
          return this.currentTime / this.currentSong.duration;
        },
    		...mapGetters([
    			'fullScreen',
          'playing',
          'currentIndex'
    		])
    	},
    	components:{
        progressBar,
        progressCircle,
        Scroll,
        playlist
      },
      watch:{
        currentSong(newSong,oldSong){
          if (!newSong.id) {
            return
          }
          if (newSong.id===oldSong.id) {
            return
          }
          if (this.currentLyric) {
            this.currentLyric.stop();
          }
          clearTimeout(this.timer)
          this.timer = setTimeout(()=>{
            this.getLyric()
            this.$refs.audio.play()
          },1000)
        },
        playing(newPlaying){
          const audio = this.$refs.audio;
          this.$nextTick(()=>{
            newPlaying ? audio.play() : audio.pause()
          })
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>