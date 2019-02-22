<template>
    <div>
    	<MHeader>列表页</MHeader>
        <div class="content" ref="scroll" @scroll="loadMore">
            <ul>
                <router-link v-for='(book,index) in books' :to='{name:"detail",params:{bid:book.bookId}}' :key='index' tag='li'>
                    <img v-lazy="book.bookCover">
                    <div>
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <b>￥{{book.bookPrice}}</b>
                        <div class="btn-list">
                          <button @click.stop="removeData(book.bookId)">删除</button>
                          <button @click.stop="addCart(book)">添加</button>
                        </div>
                    </div>
                </router-link>
            </ul>
            <div @click="more" class="more">加载更多</div>
        </div>
    </div>
</template>
<!-- 循环组件要加一个key，防止报警告信息-->
<script>
    import MHeader from '../base/MHeader.vue'
    import {removeBook,pagenation} from '../api/index.js'
    import * as Types from '../store/mutations-type.js'
    export default{
    	data(){
    		return {books:[],offset:0,hasMore:true,isLoading:false}
    	},
      mounted(){
        let scroll = this.$refs.scroll; //获取到要拖拽的元素
        let top = scroll.offsetTop;
        let distance = 0;
        let isMove = false;
        scroll.addEventListener('touchstart',(e)=> {
            // 滚动条在最顶端时 并且当前盒子在顶端时候 才继续走
            if(scroll.scrollTop !=0 || scroll.offsetTop != top) return
              let start = e.touches[0].pageY; //手指点击的开始
              let move = (e)=>{
                isMove = true;
                let current = e.touches[0].pageY;
                distance = current - start; //求的拉动的距离 负的就不要了
                if(distance>0){ // 如果大于50了 认为就是50像素
                  if(distance<=50){
                    scroll.style.top = distance + top +'px';
                  }else{
                    distance = 50;
                    scroll.style.top = top+50+'px';
                  }
                }else{
                  // 如果不在考虑范围内 移除掉move和end事件
                  scroll.removeEventListener('touchmove',move);
                  scroll.removeEventListener('touchend',end);
                }
              };
              let end = (e)=>{
                if(!isMove)return;
                isMove = false;
                clearInterval(this.timer1);
                this.timer1 = setInterval(()=>{ // 一共distance 每次-1
                  if(distance<=0){
                    clearInterval(this.timer1);
                    distance = 0;
                    scroll.style.top = top+'px';
                    scroll.removeEventListener('touchmove',move);
                    scroll.removeEventListener('touchend',end);
                    this.books = []; // 先清空数据
                    this.offset = 0;
                    this.hasMore = true;
                    this.getBook();
                    return
                  }
                  distance -=1;
                  scroll.style.top =top + distance+'px';
                },1);
              };
              scroll.addEventListener('touchmove',move);
              scroll.addEventListener('touchend',end);
        },false);
      },
      created(){
           this.getBook();
      },
    	methods:{
            addCart(book){
               this.$store.commit(Types.ADD_CART,book)
            },
            loadMore(){
                // 卷去的高度   当前可见区域  总高
              // 触发scroll事件 可能触发n次  先进来开一个定时器，下次触发时将上一次定时器清除掉
              clearTimeout(this.timer); // 节流
              this.timer = setTimeout(()=>{
                let {scrollTop,clientHeight,scrollHeight} = this.$refs.scroll;
                if(scrollTop+clientHeight+20>scrollHeight){
                    this.getBook(); // 获取更多（上拉刷新获取更多）
                }
              },60);
            },
            more(){
              this.getBook()
            },
            async removeData(id){
                await removeBook(id);
                this.books = this.books.filter(item=>item.bookId !== id);
            },
            async getBook(){
                if(this.hasMore&&!this.isLoading){
                  let {hasMore,books} = await pagenation(this.offset);
                  this.books=[...this.books,...books];
                  this.hasMore=hasMore;
                  this.isLoading = false; // 加载完毕
                  this.offset = this.books.length;
                }
            }
        },
    	computed:{},
    	components:{MHeader}
    }
</script>
<style scoped>
  .content ul{
    padding: 10px;
  }
  .content ul li{
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .content ul li img{
    width:130px;
    height: 150px;
  }
  .content h4{
    font-size: 20px;
    line-height: 35px;
  }
  .content p{
    color: #2a2a2a;
    line-height: 25px;
  }
  .content b {
    color: red;
  }
  .content button{
    display: block;width: 60px;height: 25px; background: orangered; color: #fff;border: none; border-radius: 15px; outline: none;
  }
  .more{
    margin: 10px;
    background: #2afedd;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
  }
  .btn-list{
    display: flex;
    justify-content: space-around;
  }
  ul div{
    width:189px;
    height: 150px;
  }
</style>
<!-- 图片懒加载（插件使用的流程） -->
<!--  
    1.导入插件（入口main.js）
    2.使用一下插件（入口main.js）
    3.在需要用到懒加载的组件里面，将之前的src替换为v-lazy（插件list.vue）
 -->


<!-- 发布项目（流程） -->
<!--  
    1.代码分割
 -->