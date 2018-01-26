


$(function(){
	//初始化界面
	$(".code").css({
		"color": "#e3101e"
	});
	$(".login-box-left").css({
		"display":"block"
	});

	$(".account").click(function(){
		$(".login-box-left").css({
			"display":"none"
		});
		$(".login-box-right").css({
			"display":"block"
		});
		$(this).css({
			"color": "#e3101e"
		});
		$(".code").css({
			"color": "#5e5e5e"
		});
	});
	$(".code").click(function(){
		$(".login-box-left").css({
			"display":"block"
		});
		$(".login-box-right").css({
			"display":"none"
		});
		$(this).css({
			"color": "#e3101e"
		});
		$(".account").css({
			"color": "#5e5e5e"
		});
	});


	//二维码移动
	$(".imgwrap").mouseenter(function(){
		$(".imgbox").stop(true).animate({"left":"20px"});
		$(".phone-help").stop(true).animate({"opacity":1});	
	});
	$(".imgwrap").mouseleave(function(){
		$(".imgbox").stop(true).animate({"left":"90px"});
		$(".phone-help").stop(true).animate({"opacity":0});	
	});
	
	//点击登录的时候，发送ajax请求
	$("#loginbtn").click(function(){
		$.ajax({
			url: "php/logincheck.php",
			type: "post",
			data: {
				"username": $("#login-user").val(),
				"userpass": $("#login-pass").val()
			},
			success: function(data){
				//如果存在的话，就跳转到首页
				if(data=="1"){
					//保存cookie
					//保存数据
					saveData();
					//首页一打开的时候，读取保存的用户名
					location.href = "index.html";
				}else if(data=="0"){
					alert("用户名或者密码错误");
				}
			}
		});
	});

});
//保存cookie
//保存数据
function saveData(){
	var username = $("#login-user").val();
	console.log($("#login-user").val());
	//添加cookie
	saveCookie("username",username,7);
}