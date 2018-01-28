
//保存cookie
//添加cookie
//参数：cookie名,cookie值,有效时长(单位：天)
function saveCookie(cookieName,cookieValue,cookieDates){
	var d = new Date();
	d.setDate(d.getDate()+cookieDates);
	document.cookie = cookieName+"="+cookieValue+";expires="+d.toGMTString();
}

//读取cookie//解析cookie
//参数：cookie名 
//返回值： cookie值
function getCookie(cookieName){
	var cookieStr = decodeURIComponent(document.cookie);
	var cookieValue = "";//用来存储cookie值
	var arr = cookieStr.split("; ");
	for(var i=0;i<arr.length;i++){
		if(arr[i].indexOf(cookieName+"=")==0){
			//得到cookie值
			cookieValue = arr[i].substring((cookieName+"=").length);
			break;
		}
	}
	return cookieValue;
}

//读取保存的数据,改变相应的样式，改变登录名
function getData(){
	var username = getCookie("username");
	//判断有没有存入的数据
	if(username==""){
		return;
	}
	$("#loginDiv-name").html(username);
	$(".gome-login").html("欢迎您！");
	$(".gome-register").html("");
	$(".user-name").find("p").find("a").html("");
	$(".public-dropdown .mygomelogin").html("");
	
	return username;
}

//一、鼠标滑过li , 显示 导航中的详细条目
// start
$("#navUl").find("li").mouseenter(function(){
	$(this).parent().siblings().eq($(this).index()).css("display","block");
});
$("#navUl").find("li").mouseleave(function(){
	$(this).parent().siblings().eq($(this).index()).css("display","none");
});
// end

//顶部广告消失 
$(".topAd i").click(function(){
	$(".topAd").css({"display":"none"});
});

//搜索框 js
$(".searchTypeList").find("li").click(function(){
	let liValue = $(this).find("a").html();
	console.log(liValue);
	$(".searchType").find("span").html(liValue);
	$(".searchTypeList").css("display","none");
});
$(".searchType").mouseenter(function(){
	$(".searchTypeList").css({
		"display":"block"
	});
});