webpackJsonp([3],{eFU7:function(t,n,e){"use strict";n.b=function(){var t=s()({},r.b,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq"});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,r.c)},n.a=function(t){var n=s()({},r.b,{loginUin:0,hostUin:0,needNewCode:0,platform:"yqq",singermid:t,begin:0,num:100,songstatus:1});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",n,r.c)};var i=e("woOf"),s=e.n(i),a=e("Gak4"),r=e("T452")},i7mK:function(t,n){},lEJ1:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("Dd8w"),s=e.n(i),a=e("NYxO"),r=e("eFU7"),c=e("T452"),o=e("PvFA"),u=e("kvay"),g={data:function(){return{songs:[]}},methods:{_getSingerDetial:function(){var t=this;this.singer.id?Object(r.a)(this.singer.id).then(function(n){n.code===c.a&&(t.songs=t._normalizeSong(n.data.list))}):this.$router.push("/singer")},_normalizeSong:function(t){var n=[];return t.forEach(function(t){n.push(Object(o.a)(t.musicData))}),n}},computed:s()({},Object(a.c)(["singer"]),{title:function(){return this.singer.name},bgImage:function(){return this.singer.avatar}}),components:{musicList:u.a},created:function(){this._getSingerDetial()}},l={render:function(){var t=this.$createElement,n=this._self._c||t;return n("transition",{attrs:{name:"slide"}},[n("musicList",{attrs:{title:this.title,songs:this.songs,bgImage:this.bgImage}})],1)},staticRenderFns:[]};var f=e("VU/8")(g,l,!1,function(t){e("i7mK")},"data-v-7c8b8956",null);n.default=f.exports}});
//# sourceMappingURL=3.b58153d0c047ca821902.js.map