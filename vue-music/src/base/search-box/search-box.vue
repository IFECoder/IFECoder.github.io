<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref='query' :placeholder='placeholder' v-model='query' class="box"/>
    <i class="icon-dismiss" v-show='query' @click='clear'></i>
  </div>
</template>

<script>
    import {debounce} from 'common/js/util.js'
    export default{
    	props:{
    		placeholder:{
    			type: String,
      		default: '搜索歌曲、歌手'
    		}
    	},
    	data(){
    		return {
    			query:''
    		}
    	},
    	created(){//派发一个query事件。并将参数newQuery传出去
    		this.$watch('query',debounce((newQuery)=>{
          this.$emit('query',newQuery)
        },500))
    	},
    	methods:{
    		clear(){
    			this.query=''
    		},
        setQuery(query){//添加一个接口setQuery放到搜索框
          this.query=query;
        },
        blur(){//给父级组件提供接口（失去焦点）
          this.$refs.query.blur();
        }
    	},
    	computed:{},
    	components:{}
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>