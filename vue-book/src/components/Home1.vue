<template>
    <div>
        <MHeader>首页</MHeader>
        <div class="content">
            <Swiper :swiperSlides='sliders'></Swiper>
            <div class="container">
                <h3>热门图书</h3>
                <ul>
                    <li v-for='book in books'>
                        <img :src="book.bookCover" alt="">
                        <b>{{book.bookName}}</b>
                    </li>
                </ul>
            </div>
        </div>  
    </div>
</template>
<script>
    import MHeader from '../base/MHeader.vue'
    import Swiper from '../base/Swiper.vue'
    import {getSliders,getHotBook} from '../api/index.js'
    export default{
        components:{
            MHeader,
            Swiper
        },
    	data(){
    		return {sliders:[],books:[]}
    	},
        created(){
            this.getSlider();
            this.getBook();
        },
    	methods:{
            async getSlider(){
                this.sliders = await getSliders();
            },
            async getBook(){
                this.books = await getHotBook();
            }
        },
    	computed:{}
    }
</script>
<style scoped lang='less'>
    .container{
        width: 90%;
        margin: 0 auto;
        h3{
            color: #999;
            margin:5px 0;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 10px;
            li{
                width:50%;
                text-align: center;
                margin: 5px 0;
                img{
                    width:100%;
                }
            }
        }
    }
</style>