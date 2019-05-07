$(document).ready(function() {
    var score = 0;
    var loader = new window.PxLoader(),
        baseUrl = './';
    var fileList = [
        'images/fm_bg.jpg',
        'images/bg.jpg',
        'images/cainiao.png',
        'images/finish.jpg',
        'images/fm_click.png',
        'images/gaoshou.png',
        'images/guoguan.png',
        'images/look.png',
        'images/quan.png',
        'images/report_bg.jpg',
        'images/submit.png',
        'images/timu_bg.png',
        'images/zhuanjia.png'
    ];
    for(var i = 0; i < fileList.length; i++) {
        var pxImage = new PxLoaderImage(baseUrl + fileList[i]);
        pxImage.imageNumber = i + 1;
        loader.add(pxImage);
    }
    loader.addProgressListener(function(e) {
        var num = Math.floor((e.completedCount / e.totalCount) * 100);
        $('#loading_p').find('p').text(num+'%');
    });
    loader.addCompletionListener(function() {
        setTimeout(function(){
            $('#loading').fadeOut(500);
        },500);
        
    });
    loader.start();
    

    //首页
    $(".fm_click").click( function (e) {
        $("#fm").hide();
    });
     
    //答题页
    $('.listPage').niceScroll({
        // enablescrollonselection:false,
        cursorcolor: "#9c9c9c",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "2px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false, //是否隐藏滚动条
        disableoutline: true
    });

    // 定义存放生成随机数的数组 
    var array=new Array(); 
    var newData=new Array();
    // 循环N次生成随机数 
    for(var i = 0 ; ; i++){ 
        // 只生成15个随机数 
        if(array.length<15){ 
              generateRandom(30); 
        }else{ 
          //updateId();
          break;
       } 
    }
    // 生成随机数的方法 
    function generateRandom(count){ 
         var rand = Math.floor(Math.random()*count);
         for(var i = 0 ; i < array.length; i++){ 
              if(array[i] === rand){ 
                   return false; 
              }      
         } 
         array.push(rand);
         newData.push(data[rand]);
    }

    //更改为正常顺序的id号
    function updateId() {
        for (var i = 0; i < newData.length; i++) {
            newData[i].id=i+1;
            console.log(newData[i].id);
        }
    }

    //初始化
    render(0,5);
    submit();
    var totalScore = 0;
    var guan = 1;
    var score =0;

    function submit() {
        $('.listPage .item').find(".ans_item").click(function () {
            $(this).find('i').addClass('quan');
            $(this).siblings().find('i').removeClass('quan');
            var _this = $(this).find('p');
            var rel = _this.attr("data-rel");
            if(rel == "true"){
                score = 1;
            }else{
                score = 0;
            }
             _this.attr("score",score);
            //console.log('总分为：'+totalScore,'该题得分为：'+score);

















        });
    }

    //点击提交
    $('#submit').click(function () {
        var scoreArr = $('.listPage .item').find('.quan').next();
        for (var i = 0; i < scoreArr.length; i++) {
            totalScore+=Number($(scoreArr[i]).attr("score"));
        }
        
        $('#guoguan').show();
        if (guan===3) {
            $('#guoguan').hide();
            setTimeout(function(){
                $('.main_con').fadeOut()
                $('.finish').fadeIn() 
            }, 300);

            //查看成绩
            $(".look").click( function (e) {
                var text = $('.input1').val();
                if(text == ''){
                    alert('请输入您的名字！！！');
                    return false;
                }
                $('#finish').hide();
                $('#report').addClass('animated slideInDown');
                $('#report .name').html("<span class='name1'>"+text+"</span>"+"，您的段位是");
                console.log('总共答对了'+totalScore+'道题目')
                //段位判断
                if (totalScore<=2) {
                    $('#report .name').html("<span class='name1'>"+text+"</span>"+"同学，您可得");
                    $('#report .level').addClass('level1').removeClass('level').text('加强学习哦，加油！');
                }
                if (totalScore>=3&&totalScore<=7) {
                    $('.level img').attr('src','./images/cainiao.png').show();
                }
                if (totalScore>=8&&totalScore<=12) {
                    $('.level img').attr('src','./images/gaoshou.png').show();
                }
                if (totalScore>=13) {
                    $('.level img').attr('src','./images/zhuanjia.png').show();
                }


            });





































            //return false;
        }
        //console.log(totalScore)
    });
 
    //点击下一关
    $('#guoguan_img').click(function () {
        guan++;
       if (guan===2) {
          render(5,10);
          $('.guan').text("第二关：叱咤江湖");
       } else if (guan===3) {
           render(10,15);
          $('.guan').text("第三关：决战光明顶");
       }
       submit();
       $('#guoguan').hide();
       //console.log('关数：'+guan);
    });





    //将随机出的数据渲染到页面
    function render(min,max) {
        var htmlStr='';
        for (var i = min; i < max; i++) {
            if (newData[i].answer.length===2) {
                htmlStr += '<li class="item">\
                            <div class="question">\
                                <span class="num">'+newData[i].id+'</span>\
                                <span class="title">'+newData[i].question+'</span>\
                            </div>\
                            <div class="answer">\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[0]+'>'+newData[i].answer[0]+'</p>\
                                </div>\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[1]+'>'+newData[i].answer[1]+'</p>\
                                </div>\
                            </div>\
                        </li>';
            } else if(newData[i].answer.length===3){
                htmlStr += '<li class="item">\
                            <div class="question">\
                                <span class="num">'+newData[i].id+'</span>\
                                <span class="title">'+newData[i].question+'</span>\
                            </div>\
                            <div class="answer">\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[0]+'>'+newData[i].answer[0]+'</p>\
                                </div>\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[1]+'>'+newData[i].answer[1]+'</p>\
                                </div>\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[2]+'>'+newData[i].answer[2]+'</p>\
                                </div>\
                            </div>\
                        </li>';
            }else{
                htmlStr += '<li class="item">\
                            <div class="question">\
                                <span class="num">'+newData[i].id+'</span>\
                                <span class="title">'+newData[i].question+'</span>\
                            </div>\
                            <div class="answer">\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[0]+'>'+newData[i].answer[0]+'</p>\
                                </div>\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[1]+'>'+newData[i].answer[1]+'</p>\
                                </div>\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[2]+'>'+newData[i].answer[2]+'</p>\
                                </div>\
                                <div class="ans_item">\
                                    <i></i>\
                                    <p data-rel='+newData[i].dataRel[3]+'>'+newData[i].answer[3]+'</p>\
                                </div>\
                            </div>\
                        </li>';
            }
            //console.log(newData[i].id);   
            
        }
        $('#timu .listPage').html(htmlStr);
    }






});
