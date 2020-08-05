var dogDiaryI="https://v1.alapi.cn/api/dog";  //舔狗日记
var lunarDateI="https://v1.alapi.cn/api/lunar";   //农历查询
var poetryI="https://v1.alapi.cn/api/shici";   //古诗
var ipI="https://httpbin.org/ip";   //ip信息


var ul;

//页面加载后进行绑定
$(function(){
    ul=$("#main-ul");   //消息处ul
    $("#dog-diary").click(dogDiary);
    $("#lunar-date").click(lunarDate);
    $("#poetry").click(poetry);
    $("#ip-message").click(ipMessage);

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
    var month=date.getMonth();
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

    var span=$("<span></span>");
    span.addClass("main-span");

    li.append(span);
    li.css("text-align","center")
    ul.append(li);

    var showTime=200;
    fadeEffect(span,"我是蝙蝠侠",showTime,function(){
        fadeEffect(span,"利用一些免费的公开接口",showTime,function(){
            fadeEffect(span,"搭建了这个网站",showTime,function(){
                fadeEffect(span,"联系方式：964939451@qq.com",showTime,function(){
                    fadeEffect(span,"欢迎给我发送邮件");
                })
            })
        })
    })
}
fadeEffect=function(textSpan,textM,showTime,callback){
    textSpan.html("");
    textSpan.html(textM);
    textSpan.delay(showTime);
    textSpan.fadeIn(700,function(){
        textSpan.delay(showTime);
        textSpan.fadeOut(800,callback);
    })
}
























