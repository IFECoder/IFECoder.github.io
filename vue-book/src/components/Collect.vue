<template>
  <div>
    <MHeader>购物车</MHeader>
    <div class="content">
      <ul>
        <li v-for="l in cartList">
            <img :src="l.bookCover" alt="">
            <div>
              <h3>{{l.bookName}}</h3>
              <p>{{l.bookInfo}}</p>
              <button @click='sub(l)'>-</button>  {{l.bookCount}}  <button @click='add(l)'>+</button>
              <span>小计: ￥{{l.bookPrice*l.bookCount}}</span>
              <br>
              <div class="del" @click='del(l.bookId)'>删除</div>
            </div>
        </li>
        <li>
            <strong>
              共{{count}}本 &nbsp;
              总计:￥{{Allprice}}
            </strong>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  // 辅助函数 语法糖
  import {mapState,mapGetters} from 'vuex';
  import * as Types from '../store/mutations-type.js'
  export default {
        data(){
            return {msg: 'hello'}
        },
        created(){
        },
        methods: {
          del(id){//删除
              this.$store.commit(Types.REMOVE_CART,id);
          },
          add(book){//数量加一
              this.$store.commit(Types.CHANGE_COUNT,{
                  book:book,
                  num:1
              });
          },
          sub(book){//数量减1
              this.$store.commit(Types.CHANGE_COUNT,{
                  book:book,
                  num:-1
              });
          }
        },
        computed: {
          ...mapGetters(['count','Allprice']),
          ...mapState(['cartList']),
          /*cartList(){//和上面的那个功能是一样的
              return this.$store.state.cartList
          }*/
        },
        components: {MHeader}
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
  .content h3{
    font-size: 20px;
    line-height: 35px;
  }
  .content p{
    color: #2a2a2a;
    line-height: 25px;
  }
  .content button{
    width: 40px;
    height: 25px; 
    background-color:#e2e0e0;
    border-radius: 5px;
    border: none; 
    outline: none;
    color: #999;
  }
  .content .del{
    background-color:#e2e0e0;
    width: 60px;
    height: 25px;
    border-radius: 5px;
    margin-top: 5px;
    text-align: center;
    line-height: 25px;
  }
  .content strong{
    text-align:right;
    width: 100%;
    padding-right: 5px;
  }
</style>
