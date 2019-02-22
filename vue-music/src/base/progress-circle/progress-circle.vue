<template>
  <div class="progress-circle">
    <svg :width="widthHeight" :height="widthHeight" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="perimeter"
              :stroke-dashoffset="offsetVal"/>
    </svg>
    <slot></slot>
  </div>
</template>
<script>
    export default{
      props:{
        widthHeight:{
          types:Number,
          default:100
        },
        precent:{
          types:Number,
          default:0
        }
      },
    	data(){
    		return {
          perimeter:Math.PI*2*50
        }
    	},
    	methods:{},
    	computed:{
        offsetVal(){
          return this.perimeter*(1-this.precent); 
        }
      },
    	components:{}
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>