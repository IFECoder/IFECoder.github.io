/*该文件为mixin，用于创建一些公用代码（创建的方法和写组件一样）。将该文件引入到
  组件后，就相当于把该文件的代码插入到那个组件的对应的位置当中
*/
/*
   多个组件共享同一个js逻辑
 */

import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
export const playListMixin = {
	computed:{
		...mapGetters([
			'playlist'
		])
	},
	mounted(){
		this.handlePlayList(this.playlist)
	},
	activated(){
		this.handlePlayList(this.playlist)
	},
	watch:{
		playlist(newVal){
			this.handlePlayList(newVal)
		}
	},
	methods:{
		handlePlayList(){//当组件中插入mixin但没有处理该事件时就会执行该方法显示报错
			throw new Error ('component must implement handlePlayList method')
		}
	}
}

//播放器mixin
export const playerMixin = {
  computed: {
    modeIcon(){//播放模式的icon图标更换
      return this.mode===playMode.sequence?'icon-sequence':this.mode===playMode.loop?'icon-loop':'icon-random';
    },
    ...mapGetters([
      'sequenceList',
      'playlist',
      'currentSong',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
        changeMode(){//改变播放模式
          const mode=(this.mode+1)%3;
          this.setPlayMode(mode);
          let list=null;
          if (mode===playMode.random) {
            list=shuffle(this.sequenceList);
          }else{
            list=this.sequenceList;
          }
          this.setPlaylist(list);
          this.resetCurrentIndex(list);
          this.setPlaying(true);
        },
        resetCurrentIndex(list){//重置当前的index，使得播放列表与index组成的currentSong不变
          let index = list.findIndex((item)=>{
            return item.id===this.currentSong.id;
          })
          this.setCurrentIndex(index);
        },
        toggleFavorite(song){
          if (this.isFavorite(song)) {
            this.deleteFavoriteList(song)
          }else{
            this.saveFavoriteList(song)
          }
        },
        getFavoriteIcon(song){
          if (this.isFavorite(song)) {
            return 'icon-favorite'
          }else{
            return 'icon-not-favorite'
          }
        },
        isFavorite(song){
          const index = this.favoriteList.findIndex((item)=>{
            return item.id===song.id
          })
          return index>-1
        },
        ...mapActions([
          'saveFavoriteList',
          'deleteFavoriteList'
        ]),
        ...mapMutations({
	      setPlayMode: 'SET_PLAY_MODE',
	      setPlaylist: 'SET_PLAYLIST',
	      setCurrentIndex: 'SET_CURRENT_INDEX',
	      setPlaying:'SET_PLAYING_STATE'
	    })
  }
}


//搜索mixin
export const searchMixin = {
  data(){
     return{
       query:'',
       refreshDelay:100
     }     
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
        saveSearch(){//保存搜索记录
          this.saveSearchHistory(this.query)
        },
        inputBlur(){//让子组件的输入框失去焦点
          this.$refs.searchBox.blur()
        },
        onQueryChange(query){
          this.query=query
        },
        addQuery(query){
          this.$refs.searchBox.setQuery(query);
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory'
        ])
  }
}