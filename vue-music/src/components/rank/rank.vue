<template>
    <div class="rank" ref='rank'>
    <scroll  class="toplist" :data='topList' ref='list'>
      <ul>
        <li class="item" v-for='item in topList' @click='selectItem(item)'>
          <div class="icon">
            <img width="100" height="100" v-lazy='item.picUrl'/>
          </div>
          <ul class="songlist">
            <li class="song" v-for='(song,index) in item.songList'>
              <span>{{index+1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show='!topList.length'>
        <Loading></Loading> 
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
    import {getToplist} from 'api/rank.js'
    import {ERR_OK} from 'api/config.js'
    import scroll from 'base/scroll/scroll.vue' 
    import Loading from 'base/loading/loading.vue'
    import {playListMixin} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    export default{
    	mixins:[playListMixin],//在组件中插入该mixin
    	data(){
    		return {
    			topList:[]
    		}
    	},
    	created(){
    		this._getToplist();
    	},
    	methods:{
	    	handlePlayList(playlist){//处理播放列表在底部滚动时有60px的遮挡问题
	          const bottom=playlist.length>0?'60px':''
	          this.$refs.rank.style.bottom=bottom;
	          this.$refs.list.refresh();
	        },
    		_getToplist(){//从QQ音乐的接口当中获取数据
    			getToplist().then((res)=>{
    				if (res.code===ERR_OK) {
    					this.topList=res.data.topList;
    				}
    			})
    		},
        selectItem(item){
          this.$router.push({
            path:`/rank/${item.id}`
          })
          this.setTopList(item)
        },
        ...mapMutations({
          setTopList:'SET_TOP_LIST'
        })
    	},
    	computed:{},
    	components:{
    		scroll,
    		Loading
    	}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>