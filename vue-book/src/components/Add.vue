<template>
    <div>
    	<MHeader :back='true'>添加</MHeader>    
        <div class="content">
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
                    <label for="bookCover">书的封面:</label>
                    <input type="text" v-model='book.bookCover'>
                </li>
                <li>
                    <label for="bookPrice">书的价格:</label>
                    <input type="text" v-model.number='book.bookPrice'>
                </li>
                <li>
                    <button @click='add'>添加</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import MHeader from '../base/MHeader.vue'
import {addBook} from '../api/index.js'
    export default{
    	data(){
    		return {book:{}}
    	},
    	methods:{
           async add(){
                await addBook(this.book);
                this.$router.push('/list');
            }
        },
    	computed:{},
    	components:{MHeader}
    }
</script>
<style scoped lang='less'>
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