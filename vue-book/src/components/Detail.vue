<template>
    <div class="detail">
    	<MHeader :back='true'>详情</MHeader>
        <ul>
            <li>
                <label for="bookName">书的名称:</label>
                <input type="text" v-model='book.bookName'>
            </li>
            <li>
                <label for="bookInfo">书的信息:</label>
                <input type="text" v-model='book.bookInfo'>
            </li>
            <li>
                <label for="bookPrice">书的价格:</label>
                <input type="text" v-model.number='book.bookPrice'>
            </li>
            <li>
                <button @click='update'>确认修改</button>
            </li>
        </ul>
    </div>
</template>
<script>
import MHeader from '../base/MHeader.vue'
import {findOneBook,updateBook} from '../api/index.js'
    export default{
    	data(){
    		return {book:{}};
    	},
        created(){
            this.getOneBook();
        },
    	methods:{
            async getOneBook(){
                this.book = await findOneBook(this.bid);
                Object.keys(this.book).length>0?void 0:this.$router.push('/list');
            },
            async update(){
                await updateBook(this.bid,this.book);
                this.$router.push('/list');
            }
        },
    	computed:{
            bid(){
               return  this.$route.params.bid;
            }
        },
    	components:{MHeader}
    }
</script>
<style scoped lang='less'>
    .detail{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background: #fff;
    }
    ul{
        margin: 50px 20px 0 20px;
        label{
            display:block;
        }
        li input{
            width: 100%;
            height: 25px;
            line-height: 25px;
            padding-left: 5px;
            margin:5px 0;
        }
        li button{
            display: block;
            width: 80px;
            height: 30px;
            background: yellowgreen;
            color: #fff;
            border: none;
            border-radius: 8px;
            outline: none;
        }
    }
</style>