var dogDiaryI="https://v1.alapi.cn/api/dog";  //舔狗日记
var lunarDateI="https://v1.alapi.cn/api/lunar";   //农历查询
var poetryI="https://v1.alapi.cn/api/shici";   //古诗
var ipI="https://httpbin.org/ip";   //ip信息
var loverWordsI="https://v1.alapi.cn/api/qinghua";   //土味情话
var beaupicI="https://v1.alapi.cn/api/acg";   //来一张漂亮的图片
var translateI="https://v1.alapi.cn/api/fanyi";   //在线翻译

var ul;

//页面加载后进行绑定
$(function(){
    ul=$("#main-ul");   //消息处ul
    
    initTranslate();   //初始化在线翻译功能

    $("#dog-diary").click(dogDiary);
    $("#lunar-date").click(lunarDate);
    $("#poetry").click(poetry);
    $("#ip-message").click(ipMessage);
    $("#lover-words").click(loverWords);
    $("#beau-pic").click(beauPic);
    $("#translate").click(translate);

    $("#about-me").click(aboutMe);
});



//舔狗日记
dogDiary=function(){
    ul.html("");  //清空

    var li=$("<li></li>");
    li.addClass("main-li");

    $.ajax({ 
        url: dogDiaryI,
        success: function(data){
            var span=$("<span></span>");
            span.addClass("main-span");
            span.html(data.data.content);
            li.append(span);
            ul.append(li);
            showSlow(li);
        },
        timeout:5000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            ajaxError(ul,textStatus);
        }
    });
}

//日期查询
lunarDate=function(){
    ul.html("");  //清空

    //阳历日期的获取
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();

    //阴历日期的定义
    var lunarYear;
    var lunarMonth;
    var lunarDay;

    var li=$("<li></li>");
    li.addClass("main-li");
    var li2=$("<li></li>");
    li2.addClass("main-li");


    $.ajax({ 
        url: lunarDateI,
        success: function(data){
            lunarYear=data.data.lunar_year;
            lunarMonth=data.data.lunar_month;
            lunarDay=data.data.lunar_day;
            
            var span=$("<span></span>");
            span.addClass("main-span");
            span.html("阳历日期："+year+"年0"+month+"月"+day+"日");
            li.append(span);
            ul.append(li);

            var span2=$("<span></span>");
            span2.addClass("main-span");
            span2.html("阴历日期："+lunarYear+"年"+lunarMonth+"月"+lunarDay+"日");
            li2.append(span2);
            ul.append(li2);

            showSlow(li);
            showSlow(li2);
        },
        timeout:5000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            ajaxError(ul,textStatus);
        }
    });
}

//古诗
poetry=function(){
    ul.html("");  //清空

    var li=$("<li></li>");
    li.addClass("main-li");
    var li2=$("<li></li>");
    li2.addClass("main-li");
    var li3=$("<li></li>");
    li3.addClass("main-li");


    $.ajax({ 
        url: poetryI,
        success: function(data){
            var titleSpan=$("<span></span>");
            titleSpan.addClass("main-span");
            titleSpan.html(data.data.origin);
            li.append(titleSpan);
            li.css("text-align","center")
            ul.append(li);
            showSlow(li);

            var authorSpan=$("<span></span>");
            authorSpan.addClass("main-span");
            authorSpan.html(data.data.author);
            li2.append(authorSpan);
            li2.css("margin-left","60%")
            ul.append(li2);
            showSlow(li2);

            var poemSpan=$("<span></span>");
            poemSpan.addClass("main-span");
            poemSpan.html(data.data.content);
            li3.append(poemSpan);
            li3.css("text-align","center")
            ul.append(li3);
            showSlow(li3);
        },
        timeout:5000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            ajaxError(ul,textStatus);
        }
    });
}

//IP等信息查询
ipMessage=function(){
    ul.html("");  //清空

    var ipLi=$("<li></li>");
    ipLi.addClass("main-li");
    var regionLi=$("<li></li>");
    regionLi.addClass("main-li");

    $.ajax({ 
        url: ipI,
        success: function(data){
            var ip=data.origin;

            var ipSpan=$("<span></span>");
            ipSpan.addClass("main-span");
            ipSpan.html("IP地址："+ip);
            ipLi.append(ipSpan);
            ul.append(ipLi);
            showSlow(ipLi);       
        },
        timeout:5000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            ajaxError(ul,textStatus);
        }
    });
}

//土味情话查询
loverWords=function(){
    ul.html("");  //清空

    var wordsLi=$("<li></li>");
    wordsLi.addClass("main-li");

    $.ajax({ 
        url: loverWordsI,
        success: function(data){
            var loverSpan=$("<span></span>");
            loverSpan.addClass("main-span");
            loverSpan.html(data.data.content);
            wordsLi.append(loverSpan);
            wordsLi.css("text-align","center")
            ul.append(wordsLi);
            showSlow(wordsLi);    
        },
        timeout:5000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            ajaxError(ul,textStatus);
        }
    });
}

//一张美丽的图片
beauPic=function(){
    ul.html("");  //清空

    var li=$("<li></li>");
    li.addClass("main-li");

    $.ajax({ 
        url: beaupicI,
        type: 'POST',
        data: {format:"json"},
        success: function(data){
            var picUrl=data.data.url;
            var beauImg=$("<img src='"+picUrl+"'/>");
            beauImg.addClass("beau-pic");
            li.append(beauImg);
            li.css("text-align","center")
            ul.append(li);
            showSlow(ul);
        },
        timeout:5000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            ajaxError(ul,textStatus);
        }
    });
}

//在线翻译 初始化
initTranslate=function(){
    $("#modal-header h4").html("在线翻译");

    var text=$("<span>翻译内容： </span>");
    var tranText=$("<textarea rows='2' cols='35' id='translate-content'></textarea><br/><br/>");

    var textSpan1=$("<span>原始语种： </span>");
    var select1=$("<select id='origin-language'>"
            +"<option selected='selected' value='zh'>中文</option>"
            +"<option value='en'>英文</option>"
            +"<option value='yue'>粤语</option>"
            +"<option value='jp'>日文</option>"
            +"</select><br/><br/>");
    var textSpan2=$("<span>目标语种： </span>");
    var select2=$("<select id='target-language'>"
                    +"<option selected='selected' value='en'>英文</option>"
                    +"<option value='zh'>中文</option>"
                    +"<option value='yue'>粤语</option>"
                    +"<option value='jp'>日文</option>"
                    +"</select><br/><br/>");

    $("#modal-body").append(text);
    $("#modal-body").append(tranText);
    $("#modal-body").append(textSpan1);
    $("#modal-body").append(select1);
    $("#modal-body").append(textSpan2);
    $("#modal-body").append(select2);
}
translate=function(){
    ul.html("");  //清空

    var li=$("<li></li>");
    li.addClass("main-li");

    var tranText=$("#translate-content").val(); //翻译文本
    var originLanguage=$("#origin-language").val(); //原始语种
    var targetLanguage=$("#target-language").val(); //目标语种

    console.log(tranText);
    console.log(originLanguage);
    console.log(targetLanguage);

    $('#myModal').modal('hide');   //隐藏模态框

    $.ajax({ 
        url: translateI,
        type: 'POST',
        data: {q:tranText,
               from:originLanguage,
               to:targetLanguage},
        success: function(data){
            var content=data.data.trans_result[0].dst;
            var span=$("<span></span>");
            span.html(content);
            span.addClass("main-span");
            li.append(span);
            li.css("text-align","left")
            ul.append(li);
            showSlow(ul);
        },
        timeout:5000,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            ajaxError(ul,textStatus);
        }
    });
}



//ajax出错：
ajaxError=function(ul,textStatus){
    var span=$("<span></span>");
    var li=$("<li></li>");
    span.addClass("main-error-span");
    span.html("接口访问错误，请重试，错误信息："+textStatus);
    li.append(span);
    ul.append(li);
}

//动画渐显
showSlow=function (li){
    li.hide();
    li.fadeIn("slow");
}


//关于我
aboutMe=function (){
    ul.html("");  //清空

    var li=$("<li></li>");
    li.addClass("main-li");
    var li2=$("<li></li>");
    li2.addClass("main-li");
    var li3=$("<li></li>");
    li3.addClass("main-li");
    var li4=$("<li></li>");
    li4.addClass("main-li");

    var span=$("<span></span>");
    span.addClass("main-span");
    var span2=$("<span></span>");
    span2.addClass("main-span");
    var span3=$("<span></span>");
    span3.addClass("main-span");
    var span4=$("<span></span>");
    span4.addClass("main-span");

    li.append(span);
    li.css("text-align","center")
    li2.append(span2);
    li2.css("text-align","center")
    li3.append(span3);
    li3.css("text-align","center")
    li4.append(span4);
    li4.css("text-align","center")
    ul.append(li);
    ul.append(li2);
    ul.append(li3);
    ul.append(li4);

    var showTime=200;
    fadeEffect(span,"我是蝙蝠侠",showTime,function(){
        fadeEffect(span2,"利用一些免费的公开接口",showTime,function(){
            fadeEffect(span3,"搭建了这个网站",showTime,function(){
                fadeEffect(span4,"联系方式：964939451@qq.com");
            })
        })
    })
}
fadeEffect=function(textSpan,textM,showTime,callback){
    textSpan.html("");
    textSpan.html(textM);
    textSpan.hide();
    textSpan.fadeIn(1000,function(){
        textSpan.delay(showTime);
        if(callback)
            callback();
    })
}
























