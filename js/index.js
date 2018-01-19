

//一、鼠标滑过li , 显示 导航中的详细条目
// start
$("#navUl").find("li").mouseenter(function(){
	$(this).parent().siblings().eq($(this).index()).css("display","block");
});
$("#navUl").find("li").mouseleave(function(){
	$(this).parent().siblings().eq($(this).index()).css("display","none");
});
// end

//二、轮播图
$(function() {
	let s = new SlideShow({
		"boxDom": $("#slideshow"),
		"width": 750,
		"height": 450,
		"timeSpace": 3000,
		"btnColor": "orange",
		"btnHighColor": "red",
		"btnWidth": 30,
		"btnHeight": 5,
		"imgs": ["img/slideimg1.jpg", "img/slideimg2.jpg", "img/slideimg3.jpg", "img/slideimg4.jpg", "img/slideimg5.jpg","img/slideimg6.jpg","img/slideimg7.jpg"]
	});
	s.initUI();
	s.initEvent();
	s.autoPlay();
});

//显示 隐藏 页面底部 二维码图片
$("#showWxImg").children().mouseenter(function(){
	$(this).find("div").css("display","block");
});
$("#showWxImg").children().mouseleave(function(){
	$(this).find("div").css("display","none");
});





