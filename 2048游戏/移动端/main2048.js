/*游戏主逻辑*/
var number = new Array();//显示的数字-二维数组
var score = 0;
var hasCollide = new Array();//有没有发生碰撞-二维数组-记录16个格子的状态
var startX=0;//touchstart的坐标
var startY=0;
var endX=0;//touchend的坐标
var endY=0;
$(function () {//预加载程序
	prepareForMobile();//移动端适配，初始化一些元素的宽度高度等
	startGame();
})
function prepareForMobile() {
	if (screenWidth>500) {
		smallGridWidth =100;
		space =20;
		bigGridWidth = 500;
	}
	$('#bigGrid').css('width',bigGridWidth-2*space);
	$('#bigGrid').css('height',bigGridWidth-2*space);
	$('#bigGrid').css('padding',space);
	$('#bigGrid').css('border-radius',0.08*smallGridWidth);

	$('.smallGrid').css('width',smallGridWidth);
	$('.smallGrid').css('height',smallGridWidth);
	$('.smallGrid').css('border-radius',0.08*smallGridWidth);
}
function startGame() {//开始游戏
	init();
	randomNumber();
	randomNumber();
}
function init() {//初始化棋盘格
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#smallGrid-'+i+'-'+j).css('left',getPosLeft(i,j));
			$('#smallGrid-'+i+'-'+j).css('top',getPosTop(i,j));
		}
	}
	for (var i = 0; i < 4; i++) {
			number[i]=new Array();
			hasCollide[i]=new Array();
		for (var j = 0; j < 4; j++) {
			number[i][j]=0;
			hasCollide[i][j]=false;//初始值为没有发生碰撞
		}
	}
	upDateView();
}
function upDateView() {//显示数字小方格-更新视图
	$('.numGrid').remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#bigGrid').append($('<div class="numGrid" id="numGrid-'+i+'-'+j+'"></div>'));
			var numberGrid = $('#numGrid-'+i+'-'+j);
			if (number[i][j]===0) {
				numberGrid.css('width',0);
				numberGrid.css('height',0);
				numberGrid.css('left',getPosLeft(i,j)+smallGridWidth/2);
				numberGrid.css('top',getPosTop(i,j)+smallGridWidth/2);
			} else {
				numberGrid.css('width',smallGridWidth);
				numberGrid.css('height',smallGridWidth);
				numberGrid.css('left',getPosLeft(i,j));
				numberGrid.css('top',getPosTop(i,j));
				numberGrid.css('background-color',getBackgroundColor(number[i][j]));
				numberGrid.css('color',getFontColor(number[i][j]));
				numberGrid.text(number[i][j]);
			}
			hasCollide[i][j]=false;//更新视图后所有的碰撞依然为无碰撞
		}
	}
	$('.numGrid').css('font-size',smallGridWidth*0.6);
	$('.numGrid').css('line-height',smallGridWidth+'px');
}

$(document).keydown(function (ev) {//键盘按下-上下左右
	switch(ev.keyCode){
		case 37://left
			ev.preventDefault();//阻止4个按键发生默认的行为--向左右上下滚动滚动条。
			if (moveLeft()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
			break;
		case 38://up
			ev.preventDefault();//阻止4个按键发生默认的行为--向左右上下滚动滚动条。
			if (moveUp()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
			break;
		case 39://right
			ev.preventDefault();//阻止4个按键发生默认的行为--向左右上下滚动滚动条。
			if (moveRight()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
			break;
		case 40://down
			ev.preventDefault();//阻止4个按键发生默认的行为--向左右上下滚动滚动条。
			if (moveDown()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
			break;
		default:
			break;
	}
})

document.addEventListener('touchstart',function (ev) {//事件监听器-触摸按下
	startX=ev.touches[0].pageX;
	startY=ev.touches[0].pageY;
})
document.addEventListener('touchmove',function (ev) {//事件监听器-触摸移动过程中
	ev.preventDefault();//阻止默认行为--移动滚动条等默认行为
})
document.addEventListener('touchend',function (ev) {//事件监听器-触摸抬起
	endX=ev.changedTouches[0].pageX;
	endY=ev.changedTouches[0].pageY;
	var difX = endX - startX;//向量的X坐标
	var difY = endY - startY;//向量的Y坐标
	if (Math.abs(difX) < screenWidth*0.3&&Math.abs(difY) < screenWidth*0.3) {//进行幅度比较小的触摸时则不进行运动。eg：点击时则不进行运动。
		return;
	}
	//x
	if (Math.abs(difX)-Math.abs(difY)>0) {
		if (difX>0) {//move right
			if (moveRight()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
		}else{//move left
			if (moveLeft()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
		}
	}else{//y
		if (difY>0) {//move down
			if (moveDown()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
		} else {//move up
			if (moveUp()) {
				setTimeout('randomNumber()',210);
				setTimeout('isGameOver();',300);
			}
		}
	}
})

function randomNumber() {//在随机位置随机生成一个数字
	if (noSpace(number)) {
		return false;
	} 
	//随机生成一个位置
	var randX = parseInt(Math.floor(Math.random()*4));
	var randY = parseInt(Math.floor(Math.random()*4));
	var times = 0;
	while(times<50){//循环50次还没有找到位置的话，则人工给一个位置
		if (number[randX][randY]===0) {
			break;
		}
		randX = parseInt(Math.floor(Math.random()*4));
		randY = parseInt(Math.floor(Math.random()*4));
		times++;
	}
	if (times==50) {//人工给一个位置
		for (var i = 0; i < 4; i++)
			for (var j = 0; j <4 ; j++) {
				if (number[i][j]===0) {
					randX=i;
					randY=j;
				}
			}
	}
	//随机一个数字2-4
	var randNum = Math.random();
	if (randNum<0.5) {
		randNum=2;
	} else {
		randNum=4;
	}
	//在随机位置上显示随机数字
	number[randX][randY]=randNum;
	showGridByAnimate(randX,randY,randNum);
	return true;
}


function isGameOver() {//游戏结束
	if (noSpace(number)&&noMove(number)) {
		gameOver();
	}
}
function gameOver() {//游戏结束
	alert('游戏结束');
}
function moveLeft() {//向左移动
	if (!canMoveLeft(number)) {//不可以移动
		return false;
	}
	//可以move-进行移动
	for (var i = 0; i < 4; i++) 
		for (var j = 1; j <4; j++) {
			if (number[i][j]!==0) {//move  0 1 2  3
				for (var k = 0; k < j; k++) {//落脚点的筛选--也就是目标点的筛选
					if (number[i][k]===0&&noObstacle(i,k,j,number) ) {//没有障碍物并且都是空的
						//move
						moveAnimate(i,j,i,k);
						number[i][k]=number[i][j];
						number[i][j]=0;
						continue;
					}else if(number[i][k]===number[i][j]&&noObstacle(i,k,j,number)&&!hasCollide[i][k] ){
						//add,move-ik位置
						moveAnimate(i,j,i,k);
						number[i][k]+=number[i][j];
						number[i][j]=0;
						score+=number[i][k];
						upDateScore(score);
						hasCollide[i][k]=true;
						continue;
					}
				}
			}
		}
		setTimeout(upDateView,200);
	return true;
}
function moveRight() {//向右移动
	if (!canMoveRight(number)) {//不可以移动
		return false;
	}
	//可以move-进行移动
	for (var i = 0; i < 4; i++) 
		for (var j = 2 ; j >= 0 ; j --) {
			if (number[i][j]!==0) {//move  0    1 2 3
				for (var k = 3; k >j; k--) {//落脚点的筛选--也就是目标点的筛选
					if (number[i][k]===0&&noObstacle(i,j,k,number) ) {//没有障碍物并且都是空的
						//move
						moveAnimate(i,j,i,k);
						number[i][k]=number[i][j];
						number[i][j]=0;
						continue;
					}else if(number[i][k]===number[i][j]&&noObstacle(i,j,k,number)&&!hasCollide[i][k]){
						//add,move-ik位置
						moveAnimate(i,j,i,k);
						number[i][k]+=number[i][j];
						number[i][j]=0;
						score+=number[i][k];
						upDateScore(score);
						hasCollide[i][k]=true;
						continue;
					}
				}
			}
		}
		setTimeout(upDateView,200);
	return true;
}

function moveUp() {//向上移动
	if (!canMoveUp(number)) {//不可以移动
		return false;
	}
	//可以move-进行移动
	for (var i = 1; i < 4; i++) 
		for (var j = 0; j < 4; j++) {
			if (number[i][j]!==0) {//move  0    1 2 3
				for (var k = 0; k < i; k++) {//落脚点的筛选--也就是目标点的筛选
					if (number[k][j]===0&&noObstacleT( j,k,i,number) ) {//没有障碍物并且都是空的
						//move
						moveAnimate(i,j,k,j);
						number[k][j]=number[i][j];
						number[i][j]=0;
						continue;
					}else if(number[k][j]===number[i][j]&&noObstacleT(j,k,i,number)&&!hasCollide[k][j]){
						//add,move-ik位置
						moveAnimate(i,j,k,j);
						number[k][j]+=number[i][j];
						number[i][j]=0;
						score+=number[k][j];
						upDateScore(score);
						hasCollide[k][j]=true;
						continue;
					}
				}
			}
		}
		setTimeout(upDateView,200);
	return true;
}
function moveDown() {//向下移动
	if (!canMoveDown(number)) {//不可以移动
		return false;
	}
	//可以move-进行移动
	for( var i = 2 ; i >= 0 ; i -- )
		for (var j = 0; j < 4; j++) {
			if (number[i][j]!==0) {//move  0    1 2 3
				for (var k = 3; k >i; k--) {//落脚点的筛选--也就是目标点的筛选
					if (number[k][j]===0&&noObstacleT(j,i,k,number) ) {//没有障碍物并且都是空的
						//move
						moveAnimate(i,j,k,j);
						number[k][j]=number[i][j];
						number[i][j]=0;
						continue;
					}else if(number[k][j]===number[i][j]&&noObstacleT(j,i,k,number)&&!hasCollide[k][j]){
						//add,move-ik位置
						moveAnimate(i,j,k,j);
						number[k][j]+=number[i][j];
						number[i][j]=0;
						score+=number[k][j];
						upDateScore(score);
						hasCollide[k][j]=true;
						continue;
					}
				}
			}
		}
		setTimeout(upDateView,200);
	return true;
}