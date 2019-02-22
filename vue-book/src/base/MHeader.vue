<template>
    <div class="header">
    	<slot></slot>	
    	<i class="iconfont icon-fanhui" v-if='back' @click='goback'></i>
    </div>
</template>
<script>
    export default{
    	data(){
    		return {}
    	},
    	methods:{
    		goback(){
    			this.$router.go(-1);
    		}
    	},
    	computed:{},
    	components:{},
    	props:{
    		back:{
    			type:Boolean,
    			default:false
    		}
    	}
    }
</script>
<style scoped lang='less'>
    .header{
    	background: yellowgreen;
    	width: 100%;
    	height: 40px;
    	position: fixed;
    	left: 0;
    	top: 0;
    	text-align: center;
    	line-height: 40px;
    	i{
    		position:absolute;
    		left:20px;
    		font-size: 25px;
    	}
    }
</style>