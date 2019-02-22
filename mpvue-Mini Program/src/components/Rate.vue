<template>
  <div class="rate">
      <span>☆☆☆☆☆</span>
      <div class="solid" :style="style">★★★★★</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props:{
      value:{
        type:[Number,String],
        default:'0'
      }
  },
  computed:{
      style(){
          return `width:${this.value / 2.44}em`
      }
  },
  methods:{},
  components:{},
  created(){}
}
</script>

<style lang="scss" scoped>
.rate{
    position: relative;
    display: inline-block;
    .solid{
        position: absolute;
        display: inline-block;
        top:0;
        left:0;
        width:0;
        overflow:hidden;
    }
}
</style>