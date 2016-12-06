$(function () {
/*------变量的声明和初始化数据-------*/

var bodyH = $('body').height();
var bodyW = $('body').width();
var index = 0;
var aLi=$('#menu li');
var aNavLi=$('#nav li');
var arrow =$('.arrow');//向下的箭头
var logo = $('.logo');
logo.click(function () {
	arrow.css('left','812.484px');
	$('body').animate({
		scrollTop:0
	},1000);
	$(aLi).eq(0).addClass('active').siblings().removeClass('active');
	index = 0;
})
aLi.click(function () {//给侧边栏的每一项添加点击
	$(this).addClass('active').siblings().removeClass('active');
	index=$(this).index();
	arrow.css('left',aNavLi.eq(index).offset().left+aNavLi.eq(index).width()/2-arrow.width()/2);
	$('body').animate({
		scrollTop:bodyH*index
	},1000)
})
aNavLi.click(function () {//给顶部导航条的每一项添加点击
	index=$(this).index();
	arrow.css('left',$(this).offset().left+$(this).width()/2-arrow.width()/2);
	aLi.eq(index).addClass('active').siblings().removeClass('active');
	$('body').animate({
		scrollTop:bodyH*index
	},1000)
})
var nowTime = new Date();
mousewheel(document, function (ev){//向上滚动
	if (new Date()-nowTime>800) { 
		nowTime=new Date();
		index--;
		if (index<0) {
			index=0;
			return;
		}
		$('body').animate({
			scrollTop:bodyH*index
		},1000)
		$(aLi[index]).addClass('active').siblings().removeClass('active');
		arrow.css('left',aNavLi.eq(index).offset().left+aNavLi.eq(index).width()/2-arrow.width()/2);
	}
}, function (){//向下滚动
	if (new Date()-nowTime>800) {//解决多次滚动导致的页面混乱问题
		nowTime=new Date();
		index++;
		if (index>4) {
			index=4;
			return;
		}
		$('body').animate({
			scrollTop:bodyH*index
		},1000)
		$(aLi[index]).addClass('active').siblings().removeClass('active');
		arrow.css('left',aNavLi.eq(index).offset().left+aNavLi.eq(index).width()/2-arrow.width()/2);
	}
});
setTimeout(function () {//延迟加载，刷新后让页面始终在顶部
	 $('body,html').animate({scrollTop:0},1000);
},30)
$(window).resize(function () {//当浏览器改变尺寸的时候，所触发的事件
	 bodyH = $('body').height();
	 bodyW = $('body').width();
	 $('#list_ul').width(bodyW);
	 $('#list_ul').height(bodyH);
	 $('body').scrollTop(bodyH*index);
})

/*----------基本逻辑----------*/
$('#menu li').hover(function () {
	var index=$(this).index();
	$('#menu span').eq(index).css('display','block');
	console.log(1);
},function () {
	var index=$(this).index();
	$('#menu span').eq(index).css('display','none');
})



/*------------函数的封装----------*/
function mousewheel(obj,upFn,downFn){//封装的鼠标滚轮事件
	obj.onmousewheel = fn;
	if(obj.addEventListener){
		obj.addEventListener("DOMMouseScroll",fn,false);
	}
	function fn(ev){
		var e = ev || event;
		var direction = true;
		if( e.wheelDelta ){ //chrome
			direction = e.wheelDelta > 0 ? true : false;
		}else{  //FF
			direction = e.detail < 0 ? true : false;
		}
		if( direction ){  //向上
			typeof upFn === "function" && upFn(e);
		}else{ //向下
			typeof downFn === "function" && downFn(e);
		}
		if(e.preventDefault){
			e.preventDefault();  //ie低版本不兼容
		}
		return false;
	}	
}


})