$(function () {
/*--------------声明变量及初始化数据------------*/
	var data = projects,len=data.length;
	var boxUl = $('#box ul');
	var ulHtml=$('#box ul').html();


/*-----------------交互方面的东西---------------*/
	creatProjectHTML(data);



/*--------------功能型函数-------------------*/
	function creatProjectHTML(data) {//创建项目li的HTML结构
		var liHTML=[];
		data.forEach(function (item,i) {
			var temp =ulHtml.replace(/{{src}}/,'src').replace(/{{projectImg}}/,item.projectImg).replace(/{{projectName}}/,item.projectName).replace(/{{projectExplain}}/,item.projectExplain).replace(/{{projectWebsite}}/,item.projectWebsite);
			liHTML.push(temp);
		})
		boxUl.html(liHTML.join(''));

	}
	var aLi=$('#box ul li');
	var onOff=true;
	aLi.hover(function (ev) {
		if (onOff) {
			move($(this),ev,true);
		}
	},function (ev) {
		move($(this),ev,false);
	})
	function move(This,ev,bool) {//通过移入的鼠标位置和4个边的比较，进行判断是哪个方向，并进行遮罩层的移入移出
		var leftVal=This.offset().left;
		var topVal=This.offset().top-2*$(window).height();
		var rightVal=leftVal+This.width();
		var bottomVal=topVal+This.height();
		var l=Math.abs(ev.clientX-leftVal);
		var r=Math.abs(ev.clientX-rightVal);
		var t=Math.abs(ev.clientY-topVal);
		var b=Math.abs(ev.clientY-bottomVal);
		var min = Math.min(l,r,t,b);
		switch(min){
			case l:
				if (bool) {
					This.find('.text').css({//先将遮罩层定位到要移入的位置，然后进行移入
						left:-250,
						top:0
					}).stop().animate({//为了防止多次移入造成混乱，必须先停止在执行动画
						left:0
					},500)
				} else {
					This.find('.text').stop().animate({
						left:-250
					},500)
				}
				break;
			case r:
				if (bool) {
					This.find('.text').css({
						left:250,
						top:0
					}).stop().animate({
						left:0
					},500)
				} else {
					This.find('.text').stop().animate({
						left:250
					},500)
				}
				break;
			case t:
				if (bool) {
					This.find('.text').css({
						top:-250,
						left:0
					}).stop().animate({
						top:0
					},500)
				} else {
					This.find('.text').stop().animate({
						top:-250
					},500)
				}
				break;
			case b:
				if (bool) {
					This.find('.text').css({
						top:250,
						left:0
					}).stop().animate({
						top:0
					},500)
				} else {
					This.find('.text').stop().animate({
						top:250
					},500)
				}
				break;
		}
	}
})