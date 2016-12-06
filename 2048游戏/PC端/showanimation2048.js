/*动画效果逻辑*/
function showGridByAnimate(i,j,randNum) {//动态的显示小方格-带数字的
	var numberGrid = $('#numGrid-'+i+'-'+j);
	numberGrid.css('background-color',getBackgroundColor(randNum));
	numberGrid.css('color',getFontColor(randNum));
	numberGrid.text(randNum);
	numberGrid.animate({
		width:100,
		height:100,
		left:getPosLeft(i,j),
		top:getPosTop(i,j)
	},50)
}
function moveAnimate(fromX,fromY,toX,toY) {
	var numberGrid = $('#numGrid-'+fromX+'-'+fromY);
	numberGrid.animate({
		top:getPosTop(toX,toY),
		left:getPosLeft(toX,toY)
	},200)
}
function upDateScore(score) {//更新分数值
	$('#score').text(score);
}