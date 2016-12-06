(function () {
	var showW = $('#show').width();
	var abtn = $('#show img');
	var aLi =$('#btn li');
	var num = 0;	
	aLi.click(function () {
		var index = $(this).index();
		$(this).addClass('selc').siblings().removeClass('selc');
		$('#experience').stop().animate({
			left:-index*showW
		},1000);
		num=index;
	})
	abtn.eq(1).click(function () {//点击下一张
		if (num==2) {
			return;
		}
		num++;
		aLi.eq(num).addClass('selc').siblings().removeClass('selc');
		$('#experience').stop().animate({
			left:-num*showW
		},1000);
	})
	abtn.eq(0).click(function () {
		if (num==0) {
			return;
		}
		num--;
		aLi.eq(num).addClass('selc').siblings().removeClass('selc');
		$('#experience').stop().animate({
			left:-num*showW
		},1000);
	})
})()