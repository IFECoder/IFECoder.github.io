<template>
  <transition name="slide">
    <musicList :rank='rank' :title='title' :bgImage='bgImage' :songs='songs'></musicList>
  </transition>
</template>
<script>
    import musicList from 'src/components/music-list/music-list.vue'
    import {mapGetters} from 'vuex'
    import {getMusiclist} from 'api/rank.js'
    import {ERR_OK} from 'api/config.js'
    import {createSong} from 'src/common/js/song.js'
    export default{
    	computed:{
    		...mapGetters([
    			'topList'
    		]),
    		title(){
    			return this.topList.topTitle
    		},
    		bgImage(){
    			if (this.songs.length) {
                    return this.songs[0].image
                }
                return this.topList.picUrl
    		}
    	},
    	data(){
    		return {
    			songs:[],
                rank:true
    		}
    	},
    	created(){
    		this._getMusiclist()
    	},
    	methods:{
    		_getMusiclist(){
                if (!this.topList.id) {
                     this.$router.push('/rank');
                     return
                }
    			getMusiclist(this.topList.id).then((res)=>{
    				if (res.code===ERR_OK) {
    					this.songs=this._normalizeSong(res.songlist)
    				}
    			})
    		},
    		_normalizeSong(list){
    			let ret=[];
    			list.forEach((item)=>{
    				const musicData=item.data;
    				ret.push(createSong(musicData))
    			})
    			return ret
    		}
    	},
    	components:{
    		musicList
    	}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>