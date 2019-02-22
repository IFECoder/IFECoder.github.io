<template>
    <div class="search">
    	<div class='search-box-wrapper'>
    		<searchBox ref='searchBox' @query='onQueryChange'></searchBox>
    	</div>
      <div ref='shortcutWrapper' class="shortcut-wrapper" v-show='!query'>
        <scroll :refreshDelay='refreshDelay' class="shortcut" ref='shortcut' :data='shortcut'>
          <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li class='item' v-for='item in hotkey' @click='addQuery(item.k)'>
                  <span>{{item.k}}</span>
                </li>
              </ul>
            </div>
            <div class="search-history" v-show='searchHistory.length'>
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click='showConfirm'>
                  <i class="icon-clear"></i>
                </span>
              </h1>
              <searchList @select='addQuery' @delete='deleteOne' :searches='searchHistory'></searchList>
            </div>
          </div>
        </scroll>
      </div>
      <div ref='searchResult' class='search-result' v-show='query'>
        <suggest ref='suggest' :query='query' @listScroll='inputBlur' @select='saveSearch'></suggest>
      </div>
      <confirm ref='confirm' text='删除么' confirmBtn='清空' @confirm='deleteAll'></confirm>
      <router-view></router-view>
    </div>
</template>
<script>
    import searchBox from 'base/search-box/search-box.vue'
    import {getHotKey} from 'api/search.js'
    import {ERR_OK} from 'api/config.js'
    import suggest from 'components/suggest/suggest.vue'
    import {mapActions} from 'vuex'
    import searchList from 'base/search-list/search-list.vue'
    import confirm from 'base/confirm/confirm.vue'
    import scroll from 'base/scroll/scroll.vue'
    import {playListMixin,searchMixin} from 'common/js/mixin.js'
    export default{
      mixins:[playListMixin,searchMixin],//在组件中插入该mixin
    	data(){
    		return {
          hotkey:[]
        }
    	},
      created(){
        this._getHotKey()
      },
      computed:{
        shortcut(){
          return this.hotkey.concat(this.searchHistory);
        }
      },
    	methods:{
        handlePlayList(playlist){
           const bottom=playlist.length>0?'60px':''
           this.$refs.shortcutWrapper.style.bottom=bottom;
           this.$refs.shortcut.refresh(); 

           this.$refs.searchResult.style.bottom=bottom;
           this.$refs.suggest.refresh(); 
       },
        _getHotKey(){
          getHotKey().then((res)=>{
            if (res.code===ERR_OK) {
              this.hotkey=res.data.hotkey.slice(0, 10)
            }
          })
        },
        deleteOne(item){//删除搜索记录
          this.deleteSearchHistory(item)
        },
        deleteAll(){//删除所有搜索记录
          this.clearSearchHistory()
        },
        showConfirm(){//显示对话框
          this.$refs.confirm.show();
        },
        ...mapActions([
          'clearSearchHistory'
        ])
      },
    	components:{
    		searchBox,
        suggest,
        searchList,
        confirm,
        scroll
    	},
      watch:{//监听搜索词的变化，从有到无之后可以进行滚动
        query(newQuery){
          if (!newQuery) {
            setTimeout(()=>{
              this.$refs.shortcut.refresh();
            },20)
          }
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>