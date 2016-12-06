/*底层支撑逻辑*/
function getPosLeft(i,j) {//获取定位元素的left值
	return 20+j*120;
}
function getPosTop(i,j) {//获取定位元素的top值
	return 20+i*120;
}
function getBackgroundColor(number) {//获取到运动格子的背景颜色
	switch(number){
		case 2:
			return '#FFDFBF';break;
		case 4:
			return '#FFCC99';break;
		case 8:
			return '#FFB973';break;
		case 16:
			return '#FFA64D';break;
		case 32:
			return '#FF9326';break;
		case 64:
			return '#FF8000';break;
		case 128:
			return '#D96D00';break;
		case 256:
			return '#B25900';break;
		case 512:
			return '#8C4600';break;
		case 1024:
			return '#8C2300';break;
	}
	return 'black';
}
function getFontColor(number) {//获取到运动格子的字体颜色
	if (number<=4) {
		return '#797065';
	} else {
		return '#EDEAE2';
	}
	
}
function noSpace(number) {//没有空间了则不需要再随机数字了
	for (var i = 0; i <4; i++) {
		for (var j = 0; j < 4; j++) {
			if (number[i][j]===0) {
				return false;
			} else {
				return true;
			}
		}
	}
}
function noObstacle(row,col1,col2,number) {//没有障碍物-则可以移动到目标点--左右
	for (var i = col1+1; i < col2; i++){
		if (number[row][i]!==0) {
			return false;
		}
	}
	return true;
}
function noObstacleT(col,row1,row2,number) {//没有障碍物-则可以移动到目标点--上下
	for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( number[i][col] != 0 )
            return false;
    return true;
}

function canMoveLeft(number) {//判断能不能向左移动
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (number[i][j]!==0) {
				if (number[i][j-1]===0||number[i][j-1]===number[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveRight(number) {//判断能不能向右移动
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if (number[i][j]!==0) {
				if (number[i][j+1]===0||number[i][j+1]===number[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveUp(number) {//判断能不能向上移动
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (number[i][j]!==0) {
				if (number[i-1][j]===0||number[i-1][j]===number[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(number) {//判断能不能向下移动
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if (number[i][j]!==0) {
				if (number[i+1][j]===0||number[i+1][j]===number[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
function noMove(number){//不能够进行四个方向的移动了
	if (canMoveLeft(number)||canMoveRight(number)||canMoveUp(number)||canMoveDown(number)) {
		return false;
	}
	return true;
}
