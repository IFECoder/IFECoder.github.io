<template>
    <Scroll class="listview" 
            :data='data' 
            ref='listview'
            :listenScroll='listenScroll'
            @scroll="scroll"
            :probeType='probeType'
            >
      <ul>
        <li  v-for='group in data' class="list-group" ref='listGroup'>
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li @click='select(item)' v-for='item in group.items' class="list-group-item">
              <img v-lazy="item.avatar" alt="" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart='onShortcutTouchStart' @touchmove.stop.prevent='onShortcutTouchMove'>
        <ul>
          <li v-for='(item,index) in shortcutList' 
              class="item" 
              :data-index='index'
              :class="{'current':currentIndex===index}"
              >{{item}}</li>
        </ul>
      </div>
      <div class="list-fixed" v-show='fixedTitle' ref='fixedTit'>
         <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
      <div class="loading-container" v-show='!data.length'>
        <loading></loading>
      </div>
    </Scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll.vue'
import {getData} from 'common/js/dom.js'
import loading from 'base/loading/loading.vue'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
    export default{
      data() {
        return {
          scrollY: -1,
          currentIndex: 0,
          space:-1
        }
      },
      created(){
        this.touch={};
        this.listHeight=[];
        this.listenScroll=true;
        this.probeType = 3;
      },
      props:{
        data:{
          type:Array,
          default:[]
        }
      },
      methods:{
        onShortcutTouchStart(ev){
          let _index = parseInt(getData(ev.target,'index'));
          let firstTouch = ev.touches[0].pageY;
          this.touch.y1=firstTouch;
          this.touch.anchorIndex=_index;
          this._scrollTo(_index);
        },
        onShortcutTouchMove(ev){
          this.touch.y2 = ev.touches[0].pageY;
          let delta = (this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT | 0;
          let _index = parseInt(this.touch.anchorIndex)+delta;
          this._scrollTo(_index);
        },
        _scrollTo(index){
            if (index > this.listHeight.length-2) {
              index=this.listHeight.length-2
            }
            if (index<0) {
              index=0;
            }
            if (isNaN(index)) {
              return
            }
            this.currentIndex=index;
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0);
        },
        refresh(){
          this.$refs.listview.refresh()
        },
        scroll(pos){
          this.scrollY=pos.y;
        },
        initHeight(){//初始化每个列表组的高度
          let height=0;
          this.listHeight.push(height);
          for (var i = 0; i < this.$refs.listGroup.length; i++) {
            height+=this.$refs.listGroup[i].clientHeight;
            this.listHeight.push(height);
          }
        },
        select(item){
          this.$emit('select',item)
        }
      },
      watch:{//监听器-监听一些数据的变化
        data(){
          setTimeout(() =>{
              this.initHeight()
          },20)
        },
        scrollY(newY){
          const listHeight = this.listHeight;
          if (newY>0) {
            this.currentIndex=0;
            return 
          }
          for (var i = 0; i < listHeight.length-1; i++) {
            let height1 = listHeight[i];
            let height2 = listHeight[i+1];
            if (-newY>=height1 && -newY<height2) {
              this.currentIndex=i;
              this.space=height2+newY;
              return 
            }
          }
          this.currentIndex=listHeight.length-2;
        },
        space(newVal){
          let fixedTop = (newVal>0&&newVal<=TITLE_HEIGHT)?newVal-TITLE_HEIGHT : 0;
            this.$refs.fixedTit.style.transform=`translate3d(0,${fixedTop}px,0)`;

        }
      },
      computed:{
        shortcutList(){
         return this.data.map((group)=>{
            return group.title.substr(0,1)
          })
        },
        fixedTitle(){
          if (this.scrollY>0) {
            return ''
          }
          return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
        }
      },
      components:{
        Scroll,
        loading
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>