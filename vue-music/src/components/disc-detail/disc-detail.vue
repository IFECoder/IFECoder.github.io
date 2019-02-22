<template>
  <transition name="slide">
    <musicList :title='title' :bgImage='bgImage' :songs='songs'></musicList>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import musicList from 'src/components/music-list/music-list.vue'
  import {getSongList} from 'src/api/recommend.js'
  import {ERR_OK} from 'api/config.js'
  import {createSong} from 'src/common/js/song.js'
  export default {
    computed: {
      ...mapGetters([
          'disc'
      ]),
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      }
    },
    created(){
      this._getSongList();
    },
    data() {
      return {
        songs:[]
      }
    },
    methods: {
      _getSongList(){
        if (!this.disc.dissid) {
          this.$router.push('/recommend');
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs=this._normalizeSong(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSong(list){
        let ret = [];
        list.forEach((musicData)=>{
          if (musicData.albumid&&musicData.songid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      musicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>