<template>
  <div class="progress-bar" ref='progressBar' @click='progressClk'>
    <div class="bar-inner">
      <div class="progress" ref='progress'></div>
      <div class="progress-btn-wrapper" ref='progressBtn' 
           @touchstart='progressTouchstart'
           @touchmove='progressTouchmove'
           @touchend='progressTouchend'
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
    import {prefixStyle} from 'common/js/dom.js'
	const progressBtnWidth=16
	const transform = prefixStyle('transform');
    export default{
    	props:{
    		precent:{
    			types:Number,
    			default:0
    		}
    	},
    	watch:{
    		precent(newPrecent){
    			if (newPrecent >= 0 && !this.touch.initiated) {
            const progressBarWidth=this.$refs.progressBar.clientWidth-progressBtnWidth;
            const offsetWidth = progressBarWidth*newPrecent;
            this._offset(offsetWidth);
          }
    		}
    	},
    	data(){
    		return {}
    	},
      created(){
        this.touch={}
      },
    	methods:{
        _offset(offsetWidth){
          this.$refs.progress.style.width=`${offsetWidth}px`;
          this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`;
        },
        progressTouchstart(ev){
          this.touch.initiated = true;//定义一个标志位，显示touch开始
          this.touch.startX = ev.touches[0].pageX;
          this.touch.left=this.$refs.progress.clientWidth;
        },
        progressTouchmove(ev){
          const dartaX = ev.touches[0].pageX-this.touch.startX;
          const offsetWidth=Math.min(this.$refs.progressBar.clientWidth-progressBtnWidth,Math.max(0,this.touch.left +dartaX))
          this._offset(offsetWidth);
        },
        progressTouchend(ev){
          this.touch.initiated = false;
          this._changePrecent();
        },
        progressClk(ev){
           const rect = this.$refs.progressBar.getBoundingClientRect()
           const offsetWidth=e.pageX-rect.left;
           this._offset(offsetWidth)
          //这里当点击progressBtn的时候，e.offsetX获取不对
          //this._offset(ev.offsetX);
          this._changePrecent();
        },
        _changePrecent(){
          const progressBarWidth=this.$refs.progressBar.clientWidth-progressBtnWidth; 
          const precent=this.$refs.progress.clientWidth/progressBarWidth;
          this.$emit('precentChange',precent);
        }
      },
    	computed:{},
    	components:{}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>