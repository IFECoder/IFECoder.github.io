webpackJsonp([5],{BRgg:function(t,e,s){"use strict";e.b=function(){var t=n()({},o.b,{platform:"h5",uin:0,needNewCode:1});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",t,o.c)},e.a=function(t){var e=n()({},o.b,{topid:t,platform:"h5",uin:0,needNewCode:1,tpl:3,page:"detail",type:"top"});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",e,o.c)};var i=s("woOf"),n=s.n(i),a=s("Gak4"),o=s("T452")},Kjo5:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Dd8w"),n=s.n(i),a=s("BRgg"),o=s("T452"),c=s("qwAB"),r=s("y/jF"),l=s("F4+m"),p=s("NYxO"),u={mixins:[l.a],data:function(){return{topList:[]}},created:function(){this._getToplist()},methods:n()({handlePlayList:function(t){var e=t.length>0?"60px":"";this.$refs.rank.style.bottom=e,this.$refs.list.refresh()},_getToplist:function(){var t=this;Object(a.b)().then(function(e){e.code===o.a&&(t.topList=e.data.topList)})},selectItem:function(t){this.$router.push({path:"/rank/"+t.id}),this.setTopList(t)}},Object(p.d)({setTopList:"SET_TOP_LIST"})),computed:{},components:{scroll:c.a,Loading:r.a}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"rank",staticClass:"rank"},[s("scroll",{ref:"list",staticClass:"toplist",attrs:{data:t.topList}},[s("ul",t._l(t.topList,function(e){return s("li",{staticClass:"item",on:{click:function(s){t.selectItem(e)}}},[s("div",{staticClass:"icon"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.picUrl,expression:"item.picUrl"}],attrs:{width:"100",height:"100"}})]),t._v(" "),s("ul",{staticClass:"songlist"},t._l(e.songList,function(e,i){return s("li",{staticClass:"song"},[s("span",[t._v(t._s(i+1))]),t._v(" "),s("span",[t._v(t._s(e.songname)+"-"+t._s(e.singername))])])}))])})),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.topList.length,expression:"!topList.length"}],staticClass:"loading-container"},[s("Loading")],1)]),t._v(" "),s("router-view")],1)},staticRenderFns:[]};var d=s("VU/8")(u,f,!1,function(t){s("flqf")},"data-v-55b83434",null);e.default=d.exports},flqf:function(t,e){}});
//# sourceMappingURL=5.7d50262635f00dcc0ea7.js.map