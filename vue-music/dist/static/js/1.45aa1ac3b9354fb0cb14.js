webpackJsonp([1],{"0IpB":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Dd8w"),n=i.n(s),r=i("eFU7"),a=i("T452"),o=i("qwAB"),c=i("3Q4o"),l=i("y/jF"),u={data:function(){return{scrollY:-1,currentIndex:0,space:-1}},created:function(){this.touch={},this.listHeight=[],this.listenScroll=!0,this.probeType=3},props:{data:{type:Array,default:[]}},methods:{onShortcutTouchStart:function(t){var e=parseInt(Object(c.a)(t.target,"index")),i=t.touches[0].pageY;this.touch.y1=i,this.touch.anchorIndex=e,this._scrollTo(e)},onShortcutTouchMove:function(t){this.touch.y2=t.touches[0].pageY;var e=(this.touch.y2-this.touch.y1)/18|0,i=parseInt(this.touch.anchorIndex)+e;this._scrollTo(i)},_scrollTo:function(t){t>this.listHeight.length-2&&(t=this.listHeight.length-2),t<0&&(t=0),isNaN(t)||(this.currentIndex=t,this.$refs.listview.scrollToElement(this.$refs.listGroup[t],0))},refresh:function(){this.$refs.listview.refresh()},scroll:function(t){this.scrollY=t.y},initHeight:function(){var t=0;this.listHeight.push(t);for(var e=0;e<this.$refs.listGroup.length;e++)t+=this.$refs.listGroup[e].clientHeight,this.listHeight.push(t)},select:function(t){this.$emit("select",t)}},watch:{data:function(){var t=this;setTimeout(function(){t.initHeight()},20)},scrollY:function(t){var e=this.listHeight;if(t>0)this.currentIndex=0;else{for(var i=0;i<e.length-1;i++){var s=e[i],n=e[i+1];if(-t>=s&&-t<n)return this.currentIndex=i,void(this.space=n+t)}this.currentIndex=e.length-2}},space:function(t){var e=t>0&&t<=30?t-30:0;this.$refs.fixedTit.style.transform="translate3d(0,"+e+"px,0)"}},computed:{shortcutList:function(){return this.data.map(function(t){return t.title.substr(0,1)})},fixedTitle:function(){return this.scrollY>0?"":this.data[this.currentIndex]?this.data[this.currentIndex].title:""}},components:{Scroll:o.a,loading:l.a}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Scroll",{ref:"listview",staticClass:"listview",attrs:{data:t.data,listenScroll:t.listenScroll,probeType:t.probeType},on:{scroll:t.scroll}},[i("ul",t._l(t.data,function(e){return i("li",{ref:"listGroup",refInFor:!0,staticClass:"list-group"},[i("h2",{staticClass:"list-group-title"},[t._v(t._s(e.title))]),t._v(" "),i("ul",t._l(e.items,function(e){return i("li",{staticClass:"list-group-item",on:{click:function(i){t.select(e)}}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.avatar,expression:"item.avatar"}],staticClass:"avatar",attrs:{alt:""}}),t._v(" "),i("span",{staticClass:"name"},[t._v(t._s(e.name))])])}))])})),t._v(" "),i("div",{staticClass:"list-shortcut",on:{touchstart:t.onShortcutTouchStart,touchmove:function(e){return e.stopPropagation(),e.preventDefault(),t.onShortcutTouchMove(e)}}},[i("ul",t._l(t.shortcutList,function(e,s){return i("li",{staticClass:"item",class:{current:t.currentIndex===s},attrs:{"data-index":s}},[t._v(t._s(e))])}))]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.fixedTitle,expression:"fixedTitle"}],ref:"fixedTit",staticClass:"list-fixed"},[i("h1",{staticClass:"fixed-title"},[t._v(t._s(t.fixedTitle))])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.data.length,expression:"!data.length"}],staticClass:"loading-container"},[i("loading")],1)])},staticRenderFns:[]};var f=i("VU/8")(u,h,!1,function(t){i("xk1L")},"data-v-747c318f",null).exports,d=i("NYxO"),g={mixins:[i("F4+m").a],data:function(){return{singersList:[]}},created:function(){this._getSingerList()},methods:n()({handlePlayList:function(t){var e=t.length>0?"60px":"";this.$refs.singer.style.bottom=e,this.$refs.list.refresh()},_getSingerList:function(){var t=this;Object(r.b)().then(function(e){e.code===a.a&&(t.singersList=t._normallizeSinger(e.data.list))})},_normallizeSinger:function(t){var e={hot:{title:"热门",items:[]}};t.forEach(function(t,i){i<10&&e.hot.items.push({id:t.Fsinger_mid,name:t.Fsinger_name,avatar:"https://y.gtimg.cn/music/photo_new/T001R150x150M000"+t.Fsinger_mid+".jpg?max_age=2592000"});var s=t.Findex;e[s]||(e[s]={title:t.Findex,items:[]}),e[s].items.push({id:t.Fsinger_mid,name:t.Fsinger_name,avatar:"https://y.gtimg.cn/music/photo_new/T001R150x150M000"+t.Fsinger_mid+".jpg?max_age=2592000"})});var i=[],s=[];for(var n in e){var r=e[n];r.title.match(/[a-zA-Z]/)&&s.push(r),"热门"===r.title&&i.push(r)}return s.sort(function(t,e){return t.title.charCodeAt(0)-e.title.charCodeAt(0)}),i.concat(s)},selctSinger:function(t){this.$router.push({path:"/singer/"+t.id}),this.setSinger(t)}},Object(d.d)({setSinger:"SET_SINGER"})),computed:{},components:{listView:f}},v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{ref:"singer",staticClass:"singer"},[e("listView",{ref:"list",attrs:{data:this.singersList},on:{select:this.selctSinger}}),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var p=i("VU/8")(g,v,!1,function(t){i("K4Au")},"data-v-676bbd72",null);e.default=p.exports},K4Au:function(t,e){},eFU7:function(t,e,i){"use strict";e.b=function(){var t=n()({},a.b,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq"});return Object(r.a)("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,a.c)},e.a=function(t){var e=n()({},a.b,{loginUin:0,hostUin:0,needNewCode:0,platform:"yqq",singermid:t,begin:0,num:100,songstatus:1});return Object(r.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",e,a.c)};var s=i("woOf"),n=i.n(s),r=i("Gak4"),a=i("T452")},xk1L:function(t,e){}});
//# sourceMappingURL=1.45aa1ac3b9354fb0cb14.js.map