<template>
  <scroll class="suggest" 
          :data='searchRet'
          @scrollToEnd='searchMore'
          :pullup='pullup'
          ref='suggest'
          :beforeScroll='beforeScroll'
          @beforeScroll='listScroll'
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for='item in searchRet' @click='slectItem(item)'>
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html='getSongName(item)'></p>
        </div>
      </li>
      <loading title='' v-show='hasMore'></loading>
    </ul>
    <div v-show='!hasMore&&!searchRet.length' class="no-result-wrapper">
      <noResult title='抱歉，暂无搜索结果'></noResult>
    </div>
  </scroll>
</template>

<script>
    import {search} from 'api/search.js'
    import {ERR_OK} from 'api/config.js'
    import {createSong} from 'common/js/song.js'
    import scroll from 'base/scroll/scroll.vue'
    import loading from 'base/loading/loading.vue'
    import Singer from 'common/js/singer'
    import {mapMutations,mapActions} from 'vuex'
    import noResult from 'base/no-result/no-result.vue'
    const TYPE_SINGER = 'singer'
    const perpage = 20
    export default{
    	props:{
    		showSinger:{
    			type:Boolean,
    			default:true
    		},
    		query:{
    			type:String,
    			default:''
    		}
    	},
    	data(){
    		return {
    			page:1,
          searchRet:[],
          pullup:true,
          beforeScroll:true,
          hasMore:true //标志位：看是否有更多
    		}
    	},
    	created(){
    		this._search();
    	},
    	methods:{
        refresh(){
          this.$refs.suggest.refresh();
        },
    		_search(){//获取搜索到的数据
          this.page=1
          this.hasMore=true;
          //this.$refs.suggest.$el.scrollTo(0,0)
          //console.log(this.$refs.suggest.$el)
    			search(this.query,this.page,this.showSinger,this.perpage).then((res) => {
            if (res.code === ERR_OK) {
                this.searchRet=this._normalizeRet(res.data)
                this._checkMore(res.data.song);
            }
          })
    		},
        _normalizeRet(data){//使结果数据标准化（对数据进行清理）
          let ret = []
          if (data.zhida&&data.zhida.singerid) {
            ret.push({...data.zhida,...{type: TYPE_SINGER}})
          }
          if (data.song) {
            ret =ret.concat(this._normalizeSonglst(data.song.list));
          }
          return ret
        },
        _normalizeSonglst(list){//对哦歌曲列表进行标准化
          let ret = [];
          list.forEach((item)=>{
            ret.push(createSong(item));
          })
          return ret
        },
        getIconCls(item){//获取搜索数据中的icon
          if (item.type===TYPE_SINGER) {
            return 'icon-mine'
          }else{
            return 'icon-music'
          }
        },
        getSongName(item){//获取搜索数据中的歌曲
          if (item.type===TYPE_SINGER) {
            return item.singername
          }else{
            return `${item.name}-${item.singer}`
          }
        },
        searchMore(){//上拉加载数据
          if (!this.hasMore) {
            return
          }
          this.page++;
          search(this.query,this.page,this.showSinger,this.perpage).then((res) => {
            if (res.code === ERR_OK) {
                this.searchRet=this.searchRet.concat(this._normalizeRet(res.data));
                this._checkMore(res.data.song);
            }
          })
        },
        _checkMore(song){
          if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
        },
        slectItem(item){//点击搜索出来的数据
          if (item.type===TYPE_SINGER) {
            const singer = new Singer({
              id:item.singermid,
              name:item.singername
            })
            this.$router.push({
              path:`/search/${singer.id}`
            })
            this.setSinger(singer);
          }else{
            this.insertSong(item);
          }
          this.$emit('select', item)
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        }),
        ...mapActions([
          'insertSong'
        ]),
        listScroll(){//列表滚动事件，子组件派发过来让其输入框失去焦点
          this.$emit('listScroll')
        }
    	},
      watch:{
        query(){
          this._search()
        }
      },
    	computed:{},
    	components:{
        scroll,
        loading,
        noResult
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>