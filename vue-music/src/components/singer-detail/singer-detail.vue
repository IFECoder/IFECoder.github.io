<template>
    <transition name='slide'>
      <musicList :title='title' :songs='songs' :bgImage='bgImage'></musicList>
    </transition>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {getSingerDetial} from 'api/singers.js'
    import {ERR_OK} from 'api/config.js'
    import {createSong} from 'src/common/js/song.js'
    import musicList from 'src/components/music-list/music-list.vue'
    export default{
      data(){
        return {
          songs:[]
        }
      },
      methods:{
        _getSingerDetial(){
          if (!this.singer.id) {
            this.$router.push('/singer');
            return
          }
          getSingerDetial(this.singer.id).then((res)=>{
            if (res.code===ERR_OK) {
              this.songs = this._normalizeSong(res.data.list);
            }
          })
        },
        _normalizeSong(list){
          let ret=[];
          list.forEach((item)=>{
            ret.push(createSong(item.musicData))
          })
          return ret;
        }
      },
      computed:{
        ...mapGetters([
          'singer'
        ]),
        title(){
          return this.singer.name
        },
        bgImage(){
          return this.singer.avatar
        }
      },
      components:{
        musicList
      },
      created(){
        this._getSingerDetial()
        //console.log(this.singer)
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
     @import "~common/stylus/variable"
      .slide-enter-active, .slide-leave-active
        transition: all 0.3s
      .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>