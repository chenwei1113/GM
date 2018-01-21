


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
	$(".imgbox").mouseenter(function(){
		$(this).animate({"left":"20px"},500,function(){
			$(".phone-help").css({"display":"block"});
		});
	});
	$(".imgbox").mouseleave(function(){
		$(".phone-help").css({"display":"none"});
		$(this).animate({"left":"90px"},500);
	});
});