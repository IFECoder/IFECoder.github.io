<template>
    <div class="singer" ref='singer'>
    	<listView :data='singersList' @select='selctSinger' ref='list'></listView>
    	<router-view></router-view>
    </div>
</template>
<script>
 import {getSingerList} from 'api/singers.js'
 import {ERR_OK} from 'api/config'
 import listView from 'base/listView/listView.vue'
 import {mapMutations} from 'vuex'
 import {playListMixin} from 'common/js/mixin.js'
 const HOT_NAME='热门'
 const HOT_SINGER_LEN=10
    export default{
    	mixins:[playListMixin],//在组件中插入该mixin
    	data(){
    		return{
                singersList:[]
        	}
    	},
    	created(){
	        this._getSingerList()
    	},
    	methods:{
    		handlePlayList(playlist){
	           const bottom=playlist.length>0?'60px':''
	           this.$refs.singer.style.bottom=bottom;
	           this.$refs.list.refresh();
	        },
    		_getSingerList() {//获取轮播图数据
		        getSingerList().then((res) => {
		          if (res.code === ERR_OK) {
		            this.singersList=this._normallizeSinger(res.data.list);
		          }
		        })
	        },
	        _normallizeSinger(list){//使其成为标准的歌手数据
	        	let map = {
	        		hot:{
	        			title:HOT_NAME,
	        			items:[]
	        		}
	        	}
	        	list.forEach( (item, index) =>{
	        		if (index<HOT_SINGER_LEN) {
	        			map.hot.items.push({
		        			id:item.Fsinger_mid,
		        			name:item.Fsinger_name,
		        			avatar:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
        				})
	        		}
	        		const key = item.Findex;
	        		if (!map[key]) {
	        			map[key]={
	        				title:item.Findex,
	        				items:[]
	        			}
	        		}
        			map[key].items.push({
	        			id:item.Fsinger_mid,
	        			name:item.Fsinger_name,
		        		avatar:`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
    				})
	        	});
	        	let hot=[];
	        	let rest=[];
	        	for (let key in map) {
	        		let val = map[key];
	        		if (val.title.match(/[a-zA-Z]/)) {
	        			rest.push(val);
	        		}
	        		if (val.title===HOT_NAME) {
	        			hot.push(val);
	        		}
	        	}
	        	rest.sort((a,b)=>{
	        		return a.title.charCodeAt(0)-b.title.charCodeAt(0)
	        	});
	        	return hot.concat(rest);
	        },
	        selctSinger(singer){//选择某个歌手进入其子路由页面
	        	this.$router.push({
	        		path:`/singer/${singer.id}`
	        	})
	        	this.setSinger(singer)
	        },
	        ...mapMutations({
	        	setSinger:'SET_SINGER'
	        })
    	},
    	computed:{},
    	components:{
    		listView
    	}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>