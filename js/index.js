

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
		"btnColor": "rgba(0,0,0,0.2)",
		"btnHighColor": "#f50f57",
		"btnWidth": 30,
		"btnHeight": 5,
		"imgs": ["img/slideimg1.jpg", "img/slideimg2.jpg", "img/slideimg3.jpg", "img/slideimg4.jpg", "img/slideimg5.jpg","img/slideimg6.jpg","img/slideimg7.jpg"]
	});
	s.initUI();
	s.initEvent();
	s.autoPlay();
});

//三、显示 隐藏 页面底部 二维码图片
$("#showWxImg").children().mouseenter(function(){
	$(this).find("div").css("display","block");
});
$("#showWxImg").children().mouseleave(function(){
	$(this).find("div").css("display","none");
});

//四、领券中心  (自动生成)
$(function(){
	for(var i=0;i<7;i++){
		$("#quanCenter").append("<a></a>");
	}
	$("#quanCenter").find("a").append("<img/>");
	//console.log($("#quanCenter").find("a").eq(1).nextAll());
	$("#quanCenter").find("a").each(function(i){
	   $(this).css({
	   	"display":"inline-block",
	   	"height":"110px",
	   	"overflow":"hidden"
	   });
	});
	
	$("#quanCenter").find("a").eq(0).nextAll().not($("#quanCenter").find("a").eq(6)).each(function(i){
	   $(this).css({
	   		"border-right":"1px dashed #ddd"
	   });
	});

	$("#quanCenter").find("img").each(function(i){
	   this.src = "img/quan" + (i+1) + ".jpg";
	   $(this).css({"margin-left":"-2px"});
	});

	
	$("#quanCenter").find("a").mouseenter(function(){
		$(this).each(function(){
			$(this).css({"cursor":"pointer"});
		});
	});
});

// 五、金融部分
$(function(){
	for(var i=0;i<5;i++){
		$(".f_m_l").append("<a></a>");
	}
	$(".f_m_l").find("a").append("<img/>");
	$(".f_m_l").find("img").each(function(i){
	   this.src = "img/jinrong" + (i+1) + ".jpg";
	});
	$(".f_m_l").find("a").each(function(i){
	   $(this).css({
	   	"display":"inline-block",
	   	"height":"228px",
	   	"overflow":"hidden"
	   });
	});
	$(".f_m_l").find("a").eq(0).nextAll().each(function(i){
	   $(this).css({
	   		"border-right":"1px dashed #ddd",
	   		"box-sizing":"border-box"
	   });
	});


	$(".f_m_l").find("a").mouseenter(function(){
		$(this).each(function(){
			$(this).css({"cursor":"pointer"});
		});
	});

});

//六、 淘购逛 部分

$(function(){
	//第一 和 第二个 盒子
	let imgs =["img/gou1.jpeg","img/gou2.jpeg","img/gou3.jpeg","img/tao1.jpeg","img/tao2.jpeg","img/tao3.jpeg"];
	for(var i=0;i<3;i++){
		$(".tao-body").append("<a></a>");
	}


	$(".tao-body").find("a").append("<img/>");
	$(".tao-body").find("img").each(function(i){
	   this.src = imgs[i];
	});

	$(".tao-body").find("a").each(function(i){
	   $(this).css({
	   	"float":"left"
	   });
	});

	$(".tao-body").find("a").eq(1).css({
   		"border-bottom":"1px dashed #ddd"		
   	});
   	$(".tao-body").find("a").eq(4).css({
   		"border-bottom":"1px dashed #ddd"		
   	});
	
	$(".tao-body").find("a").mouseenter(function(){
		$(this).each(function(){
			$(this).css({"cursor":"pointer"});
		});
	});

});


//七、楼层 部分 主要///////////////////////////
//1. 一楼 
//1）第一个选项卡 精选热卖  下的盒子
$(function(){
	function MainRightBox($obj){
		for(var i=0;i<6;i++){
			$obj.find($(".main-right")).append("<a></a>");
		}
		$obj.find($(".main-right")).find("a").append("<img />");
		$obj.find($(".main-right")).find("img").each(function(i){
		   this.src = "img/jing"+(i+1)+".jpg";
		});
		$obj.find($(".main-right")).find("a").css({
			"width":"199px",
			"height":"234px",
			"display":"inline-block",
			"border-right":"1px solid #eee",
			"border-bottom":"1px solid #eee"
		});
	};
	MainRightBox($("#firstFloor"));
	MainRightBox($("#secondFloor"));
	MainRightBox($("#thirdFloor"));
	MainRightBox($("#fourFloor"));
	MainRightBox($("#fiveFloor"));
	MainRightBox($("#sixFloor"));
	MainRightBox($("#sevenFloor"));
	MainRightBox($("#eightFloor"));
	MainRightBox($("#nineFloor"));
});


//2）第二个选项卡 时尚新品 动态生成 然后读取数据
$(function(){
	//tab栏下面的盒子 动态生成函数
	function TabBox($obj,imgs,p1Arr,p2Arr){
			//添加 ul
		$obj.find($(".tabbox2")).append("<ul></ul>");
		//添加 li
		for(let i=0;i<imgs.length;i++){
			$obj.find($(".tabbox2")).find("ul").append("<li></li>");
		}
		//添加 a
		$obj.find($(".tabbox2")).find("li").append("<a></a>");
		$obj.find($(".tabbox2")).find("li").find("a").append("<img/>").append("<p></p>").append("<p></p>");
		//给 p标签添加类名
		$obj.find($(".tabbox2")).find("a").each(function(i){
			$(this).find("p").eq(0).addClass("p-name");
			$(this).find("p").eq(1).addClass("p-price");
		});
		

		//设置样式
		$obj.find($(".tabbox2")).find("li").css({
			"width": '198px',
		    'height': '235px',
		    'float': 'left',
		    'overflow': 'hidden'
		});
		$obj.find($(".tabbox2")).find("a").css({
			'width': '197px',
		    'height': '234px',
		    'display': 'block',
		    'border-right': '1px solid #eee',
		    'border-bottom': '1px solid #eee',
		    'overflow': 'hidden'
		});

		$obj.find($(".tabbox2")).find("img").css({
			'display': 'block',
	    	'width': '130px',
	    	'height': '130px',
	    	'margin': '20px 0 15px 34px'
		});
		$obj.find($(".tabbox2")).find("a").find($(".p-name")).css({
			'width': '157px',
		    'height': '36px',
		    'margin-left': '20px',
		    'overflow': 'hidden',
		    'line-height': '18px',
		    'font-size': '12px',
		    'color': '#5e5e5e'
		});
		$obj.find($(".tabbox2")).find("a").find($(".p-price")).css({
			'height': '20px',
		    'line-height': '26px',
		    'color': '#ff0027',
		    'font-size': '14px',
		    'font-family': 'Arial,"Microsoft Yahei"',
		    "margin-left":"20px"
		});

		//读取数据
		$obj.find($(".tabbox2")).find("a").find("img").each(function(i){
			this.src = imgs[i];
		});
		
		$obj.find($(".tabbox2")).find($(".p-name")).each(function(i){
			$(this).html(p1Arr[i]);
		});
		$obj.find($(".tabbox2")).find($(".p-price")).each(function(i){
			$(this).html(p2Arr[i]);
		});
	}
	
	//数据
	//调用
	TabBox($("#firstFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#secondFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#thirdFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#fourFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#fiveFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#sixFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#sevenFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#eightFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
	TabBox($("#nineFloor"),["img/shi1.jpg","img/shi2.jpg","img/shi3.jpg","img/shi4.jpg","img/shi5.jpg","img/shi6.jpg","img/shi7.jpg","img/shi8.jpg","img/shi9.jpg","img/shi10.jpg"],["国美U7 全网通 曜金黑","荣耀 畅玩7X 全网通","荣耀9青春版 4 64GB 尊享版","魅蓝 Note6 全网通公开版","vivo X20A 全网通 星耀红","华为 麦芒6  64GB 全网通 双卡双待 流光金","OPPO R11s 全网通 黑色"," iPhone 8 64G 深空灰","华为 Mate10 Pro 128GB 全网通 宝石蓝","荣耀V10 尊享版 全网通"],["￥1299.00","￥1999.00","￥1799.00","￥1499.00","￥3198.00","￥2199.00","￥2999.00","￥5388.00","￥5399.00","￥3499.00"]);
});

$(function(){
	//3）楼层的tab栏切换
	function TabSwitch($obj){
		$obj.find($(".tab")).find("li").mouseenter(function(){
			//1) tab栏的变化
			var that = this;
			var index = $(this).index();
			
			$(this).each(function(){
				$(this).siblings().removeClass("tabbg").find("a").removeClass("tab-a-color");
			});
			$(that).addClass("tabbg").find("a").addClass("tab-a-color");
			//2）tab盒子的变化
			
			//思路： 当前的盒子显示，其他的盒子隐藏
			//each():以每个匹配的元素作为上下文来执行一个函数
			$obj.find($(".floor-body-main")).children().eq(index).each(function(){
				$(this).css("display","block").siblings().css("display","none");
			});

		});
	};
	TabSwitch($("#firstFloor"));
	TabSwitch($("#secondFloor"));
	TabSwitch($("#thirdFloor"));
	TabSwitch($("#fourFloor"));
	TabSwitch($("#fiveFloor"));
	TabSwitch($("#sixFloor"));
	TabSwitch($("#sevenFloor"));
	TabSwitch($("#eightFloor"));
	TabSwitch($("#nineFloor"));
});



//4) 子轮播图
//第一个 自轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#firstFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第二个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#secondFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第三个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#thirdFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第四个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#fourFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第五个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#fiveFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第六个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#sixFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第七个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#sevenFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第八个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#eightFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});
//第九个 子轮播图
$(function() {
	let subslide = new SlideShow({
		"boxDom": $("#nineFloor").find($(".main-left-slide")),
		"width": 389,
		"height": 470,
		"timeSpace": 3000,
		"btnColor": "#ccc",
		"btnHighColor": "#f50f57",
		"btnWidth": 18,
		"btnHeight": 4,
		"imgs": ["img/subslide1.jpg", "img/subslide2.jpg", "img/subslide3.jpg"]
	});
	subslide.initUI();
	subslide.initEvent();
	subslide.autoPlay();
});


//电梯导航部分
//1). 生成电梯
var floorArr = ["1F","2F","3F","4F","5F","6F","7F","8F","9F","10F"];
var floorTitleArr = ["手机通讯","电脑数码","家用电器","厨房卫浴","国美超市","服饰鞋包","家居家装","汽车用品","海外购","生活服务"];

for(let i=0;i<floorArr.length;i++){
	$("#elevator").find("ul").eq(0).append("<li></li>");
}
$("#elevator").find("ul").eq(0).find("li").addClass("handler").append("<b></b>").append("<a></a>");
$("#elevator").find($(".handler")).find("a").append("<span></span>").append("<p></p>");
//2). 读取并显示数据
$("#elevator").find($(".handler")).each(function(i){
	$(this).find("a").find("span").html(floorArr[i]);
});
$("#elevator").find($(".handler")).each(function(i){
	$(this).find("a").find("p").html(floorTitleArr[i]);
})

//3). 添加事件
//鼠标进入 和 鼠标离开 事件
$("#elevator").find($(".handler")).mouseenter(function(){	
	$(this).find("a").find("p").css({"color":"#f50f57"});
	$(this).find("a").find("span").css({"color":"#f50f57"});
});
$("#elevator").find($(".handler")).mouseleave(function(){
	if($(this).index()==currentFloor){
		showFloor(currentFloor);
	}else {
		$(this).find("a").find("span").css({"color":"#5e5e5e"});
		$(this).find("a").find("p").css({"color":"#5e5e5e"});
	}
});
$(".fl_top").mouseenter(function(){
	$(this).find("a").css({"background-position":"-216px -78px"});	
});
$(".fl_bottom").mouseenter(function(){
	$(this).find("a").css({"background-position":"-216px -26px"});
});
$(".fl_top").mouseleave(function(){
	$(this).find("a").css({"background-position":"-216px -52px"});
});
$(".fl_bottom").mouseleave(function(){
	$(this).find("a").css({"background-position":"-216px 0"});
});
var currentFloor = -1;
// 楼梯 滚动事件
$(window).scroll(function(){
	//显示当前楼层
	if($(window).scrollTop()>1200){
		for(var i=0;i<10;i++){
			hideFloor(i);
		}
		var index = parseInt(($(window).scrollTop()-1200)/545);
		currentFloor = index;
		showFloor(index);
	};

	// 隐藏楼梯
	if($(window).scrollTop()>6650 || $(window).scrollTop()<1200 ){
		$("#elevator").css("display","none");
	};
});

function showFloor(i){
	$("#elevator").css("display","block");
	$("#elevator").find(".handler").eq(i).find("b").css("display","block");
	$("#elevator").find(".handler").eq(i).find("a").find("p").css({"color":"#f50f57"});
	$("#elevator").find(".handler").eq(i).find("a").find("span").css({"color":"#f50f57"});
};
function hideFloor(i){
	$("#elevator").css("display","block");
	$("#elevator").find(".handler").eq(i).find("b").css("display","none");
	$("#elevator").find(".handler").eq(i).find("a").find("p").css({"color":"#5e5e5e"});
	$("#elevator").find(".handler").eq(i).find("a").find("span").css({"color":"#5e5e5e"});
};

$(".handler").click(function(){
	$(this).each(function(i){
		$(this).siblings().find("a").find("span").css({"color":"#5e5e5e"});
		$(this).siblings().find("a").find("p").css({"color":"#5e5e5e"});
	});
	
	$(this).find("a").find("p").css({"color":"#f50f57"});
	$(this).find("a").find("span").css({"color":"#f50f57"});

	$("body,html").animate({
        "scrollTop": 1200+545*$(this).index()
    }, 800,'swing');
});
$(".fl_top").click(function(){
	$("body,html").animate({
        "scrollTop": 0
    }, 1000);
});
$(".fl_bottom").click(function(){
	$("body,html").animate({
        "scrollTop": 7000
    }, 1000);
});
//电梯导航部分 结束

//顶部广告消失 
$(".topAd i").click(function(){
	$(".topAd").css({"display":"none"});
});

//滚动事件，固定搜索框
$("body").prepend("<div></div>")
$("body").find("div").eq(0).addClass("suspension");
$(".searchForm").clone().prependTo($(".suspension"));
$(".suspension").css({
	"display":"none"
});
$(window).scroll(function(){
	if($(window).scrollTop()>800){
		$(".suspension").css({
			"width": "100%",
			"height": "50px",
			"background": "rgba(255,255,255,0.7)",
			"position":"fixed",
			"top":0,
			"z-index":1001,
			"display":"block"
		});
		$(".searchForm").css({
			"margin":"8px auto"
		});
	};

	if($(window).scrollTop()<800){
		$(".suspension").css({
			"display":"none"
		});
	};
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







