<template>
    <div>
        <MHeader>首页</MHeader>
        <div class="content">
            <loading v-if='loading'></loading>
            <template v-else>
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
            </template>
        </div>  
    </div>
</template>
<script>
    import MHeader from '../base/MHeader.vue'
    import Swiper from '../base/Swiper.vue'
    import loading from '../base/loading.vue'
    import {getAll} from '../api/index.js'
    export default{
        components:{
            MHeader,
            Swiper,
            loading
        },
    	data(){
    		return {sliders:[],books:[],loading:true}
    	},
        created(){
           this.getData();
        },
    	methods:{
            async getData(){
                let [sliders,books] = await getAll();
                this.sliders=sliders;
                this.books=books;
                this.loading=false;
                console.log(this.sliders);
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