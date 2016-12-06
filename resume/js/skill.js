(function () {
/*--------------声明变量及初始化数据------------*/
	var data = skills.skillsClassify,len=data.length;
	var skillLang =$('.skillLang');
	var itemList=$('.itemList');
	var left=$('.left');//往left里面添加skilllang的html结构
	
/*-----------------交互方面的东西---------------*/
	creatSkillItem(data);//创建每个技能项的html结构
	var aNavbtn=$('.navBtn li');
	var aSkillLang =$('.left .skillLang');
	aNavbtn.click(function () {//点击技能下面的按钮
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		//console.log(skillLang.eq(index).get(0));
		aSkillLang.eq(index).siblings('div').animate({
			display: 'none',
			opacity: 0
		},800);

		aSkillLang.eq(index).animate({
			display: 'block',
			opacity: 1
		},800);
		aSkillLang.eq(index).addClass('act').siblings().removeClass('act');
	})

	/*条形图显示技能部分*/
	   var chart = {
	      type: 'bar',
	      backgroundColor:'#EEFFFF'
	   };
	   var title = {
	      text: '专业技能'   
	   };
	   var xAxis = {
	      categories: ['html','css','javascript','jQuery','Ajax','框架及工具'],
	      title: {
	         text: null
	      }
	   };
	   var yAxis = {
	      min: 0,
	      title: {
	         text: '技能比例 (%)',
	         align: 'high'
	      },
	      labels: {
	         overflow: 'justify'
	      }
	   };
	   var tooltip = {
	      valueSuffix: '%'
	   };
	   var plotOptions = {//在条上显示数字
	      bar: {
	         dataLabels: {
	            enabled: true
	         }
	      },
	      series: {
	         stacking: 'normal'
	      }
	   };
	   var legend = {//掌握情况的显示位置
	      layout: 'vertical',
	      align: 'right',
	      verticalAlign: 'top',
	      x: 0,
	      y: 70,
	      floating: true,
	      borderWidth: 1,
	      backgroundColor: '#fff',
	      shadow: true
	   };
	   var credits = {//不显示这个插件的网址
	      enabled: false
	   };
	   
	   var series= [{
	         name: '掌握情况',
	            data: [80, 70, 75, 60, 50,65]
	        }];     
	      
	   var json = {};   
	   json.chart = chart; 
	   json.title = title; 
	   json.tooltip = tooltip;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;  
	   json.series = series;
	   json.plotOptions = plotOptions;
	   json.legend = legend;
	   json.credits = credits;
	   $('.right #container').highcharts(json);






/*--------------功能型函数-------------------*/
	function creatSkillItem(data) {
		var itemHtml=skillLang.html();//获取skillLang的内容，用js模板进行替换
		var itemListHtm = itemList.html();
		var str1='';
		var str2='<div class="skillLang act">';
		var str3='<div class="skillLang">';
		var arr=[];
		var newArr=[];
		for (var i = 0; i <len; i++) {//双层for循环用来得到skillTooltip数组的的数据并保存到arr
			for (var j = 0; j < data[i].skillTooltip.length; j++) {
				str1+='<li><div class="small_cil"></div><p>'+data[i].skillTooltip[j]+'</p></li>';
				
				if (j==data[i].skillTooltip.length-1) {
					var temp = itemListHtm.replace(/{{skillTooltip}}/,str1);
					str1='';
					arr.push(temp);
				}
			}
		}

		data.forEach(function (item,i) {//循环data数组，用js模板进行替换相应的内容-用数据--实现数据与结构分离
			
			var temp = itemHtml.replace(/{{id}}/,i).replace(/{{skillTitle}}/,item.skillLanguage+'-'+item.percent).replace(/{{skillTooltip}}/,arr[i]);
			newArr.push(temp);
			
		})
		for (var i = 0; i < newArr.length; i++) {
			if (i<3) {
				str2=str2+newArr[i];
			} else {
				str3=str3+newArr[i];
			}

		}
		str2+='</div>';
		str3+='</div>';
		left.html(str2+str3+'<ul class="navBtn"><li class="active"></li><li></li></ul>');
	}

})()