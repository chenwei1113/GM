//保存数据
// function saveData(){
// 	var goodsnum = parseInt($("#numId").html())+parseInt($("#goodsNum").val());
// 	console.log(goodsnum);
// 	//添加cookie
// 	saveCookie("goodsnum",goodsnum,7);
// }
//读取数据
// function getData(){
// 	var goodsnum = getCookie("goodsnum");
// 	//判断有没有存入的数据
// 	if(goodsnum==""){
// 		return;
// 	}
// 	$("#numId").html(goodsnum);
// 	return goodsnum;
// }

//浏览最终购买
function FinalBuy($obj){
//	容器
	this.boxDom = $obj.boxDom;
//	图片数组
	this.imgArr  = $obj.imgArr;
//	价格数组
	this.priceArr = $obj.priceArr;
//	描述文字数组
	this.textArr = $obj.textArr;
	
	//初始化界面
	$(this.boxDom).append("<ul></ul>");
	for(var i=0;i<this.imgArr.length;i++){
		$(this.boxDom).find("ul").append("<li></li>");
	}
	$(this.boxDom).find("li").append("<img />").append("<p></p>").append("<div></div>");
	//设置样式
	$(this.boxDom).find("ul").css({
		"padding":"0 10px"
	});
	$(this.boxDom).find("li").css({
		"width": "188px",
		"height":"264px",
		"text-align":"center"
	});
	$(this.boxDom).find("li").find("p").css({
		"font-weight": "400",
	    "font-size": "18px",
	    "text-align": "left",
	    'margin-top': '7px',
	    "color": "#e3101e"
	});
	$(this.boxDom).find("li").find("div").css({
		'color': '#666',
	    'height': '40px',
	    'line-height': '20px',
	    'overflow': 'hidden',
	    'text-align': 'left'
	});
	//添加事件
	$(this.boxDom).find("li").find("div").bind({
		"mouseenter" : function(){
						$(this).css({
							"color": "#e3101e",
							"text-decoration": "underline",
							"cursor":"pointer"
						})},
		"mouseleave": function(){
			$(this).css({
				"color":"#666",
				"text-decoration": "none"
			});
		}
	});
	
	
	//写数据
	$(this.boxDom).find("li").find("p").each(function(i){
		$(this).html(priceArr[i]);
	});
	$(this.boxDom).find("li").find("div").each(function(i){
		$(this).html(textArr[i]);
	});
	$(this.boxDom).find("li").find("img").each(function(i){
		this.src = imgArr[i];
	});	
}

//入口函数
$(function(){
//	页面一加载,就读取cookie的数据
	//getData();
	//console.log(getCookie("goodsid")); //可以得到goodsid
	//页面一加载，发送ajax请求，从数据库中读取数据，并显示
	$.ajax({
		url: "php/getGoodsInfo.php",
		type: "get",
		data: {
			"goodsId": getCookie("goodsid")
		},
		dataType: "json",
		success: function(data){
			showDetailPage(data);
		}
	});

	
	//放大镜
	var b = new BigMirror({
		$Obj : $("#bigMirrorBox"),
        bigMirrorWidth: 200,
        bigMirrorHeight: 200,
		"multiple":1.78
    });
    b.createUI();
    b.initEvent(); 	
    
    //放大镜部分 的事件
    var fdjimgArr = [];//450
    var bigImgArr = [];//800

    function showDetailPage(data){
    	$("#imglist img").eq(0).attr('src','img/'+data.goodsType);
    	$("#imglist img").eq(1).attr('src','img/'+data.beiyong2);
    	$("#imglist img").eq(2).attr('src','img/'+data.beiyong5);
    	$("#imglist img").eq(3).attr('src','img/'+data.beiyong8);
    	$("#imglist img").eq(4).attr('src','img/'+data.beiyong11);

    	$("#bigMirrorBox").css({
    		"background-image": 'url(img/'+data.goodsImg+')'
    	});

    	$(".bigShow").css({
    		"background-image": 'url(img/'+data.beiyong1+')'
    	});

    	$(".title").html(data.goodsDesc);
    	$(".price").html("￥"+data.goodsPrice);

    	
		fdjimgArr.push(data.goodsImg);
		fdjimgArr.push(data.beiyong3);
		fdjimgArr.push(data.beiyong6);
		fdjimgArr.push(data.beiyong9);
		fdjimgArr.push(data.beiyong12);

		bigImgArr.push(data.beiyong1);
		bigImgArr.push(data.beiyong4);
		bigImgArr.push(data.beiyong7);
		bigImgArr.push(data.beiyong10);
		bigImgArr.push(data.beiyong13);	
    }


    $("#imglist").find("img").bind({
    	//鼠标进入
    	"mouseenter": function(){
    		$(this).css({
    			"border": "1px solid #e3101e"
    		}).siblings().css({
    			"border": "1px solid transparent"
    		});
      		//console.log(fdjimgArr[$(this).index()]);
    		$("#bigMirrorBox").css({
    			"background-image": "url('img/"+fdjimgArr[$(this).index()]+"')"
    		});
    		$(".bigShow").css({
    			"background-image": "url('img/"+bigImgArr[$(this).index()]+"')"
    		});
    	},
    	
    });
    
    
//  加入 购物车 事件
	var goodsnum = 1;
	$(".addnum").click(function(){
		goodsnum = $("#goodsNum").val();
		goodsnum++;
		$("#goodsNum").val(goodsnum);
	});
	$(".miunsnum").click(function(){
		goodsnum--;
		if(goodsnum < 1){
			$("#goodsNum").val(1);
			return;
		}
		$("#goodsNum").val(goodsnum);
	});
	
	
	//点击加入购物车，改变购物车的数量
	//购物车中的数量
	//点击加入购物车，发送ajax请求，把商品添加到购物车中，并改变小购物车中的数量
	$(".joingwc").click(function(){
		$.ajax({
	        url:'php/addShoppingCart.php',
	        type: 'get',
	        dataType: 'json',
	        data: {
	            "goodsId": getCookie("goodsid"),
	            "vipName": getCookie("username"),
	            "goodsCount": $("#goodsNum").val()
	        },
	        success: function(data){
	             //显示购物车
	            $.ajax({
	                type: "get",
	                url: 'php/getShoppingCart.php',
	                data: {
	                    'vipName':getCookie("username")
	                },
	                dataType: "json",
	                success: function(data){
	                    getPrdNumFormCart(data);
	                }
	            });
	        }
	    });		
	}); 
	
	//详情页一加载的时候，就发送ajax请求，得到购物车中所有商品的数量，显示在右上角的小购物车中,并且改变小购物车的样式
	$(function(){
		$.ajax({
			type: "get",
			url: 'php/getShoppingCart.php',
			data: {
				'vipName':getCookie("username")
			},
			dataType: "json",
			success: function(data){
				getPrdNumFormCart(data);
			}
		});
	});

	function getPrdNumFormCart(data){
		var prdNum = 0;
		for(let i=0;i<data.length;i++){
			prdNum += parseInt(data[i].goodsCount);
		}
		//console.log(prdNum);
		$("#numId").html(prdNum);

		//如果商品数量不为0，去改小购物车的样式
		if(prdNum!=0){
			//改变购物车的颜色
			$(".shopnum").css({
				"background":"#dd00a7"
			});
			$(".shopnum").find("i").css({
				"border-color":"transparent transparent transparent #dd00a7"
			});
			$("#carttext").html("去购物车结算");
		}
	}

	//根据goodsnum 判断购物车的颜色 
	if($("#numId").html()>0){
		$(".shopnum").css({
			"background":"#dd00a7"
		});
		$(".shopnum").find("i").css({
			"border-color":"transparent transparent transparent #dd00a7"
		});
	}
	
	//浏览最终购买 模块
	FinalBuy({
		"boxDom": $(".buy-Pics"),
		"imgArr": ["img/buy1.jpg","img/buy2.jpg","img/buy3.jpg","img/buy4.jpg","img/buy3.jpg","img/buy3.jpg","img/buy3.jpg","img/buy3.jpg"],
		"priceArr": ["￥2088.00","￥2088.00","￥2088.00","￥2088.00","￥2088.00","￥2088.00","￥2088.00","￥2088.00"],
		"textArr": ["Beats Solo3 Wireless 头戴式无线蓝牙耳机(霹雳红)","森海塞尔/SENNHEISER MX80 入门重低音手机电脑耳塞式耳机(黑色)","森海塞尔/SENNHEISER MX80 入门重低音手机电脑耳塞式耳机(黑色)","森海塞尔/SENNHEISER MX80 入门重低音手机电脑耳塞式耳机(黑色)","森海塞尔/SENNHEISER MX80 入门重低音手机电脑耳塞式耳机(黑色)","森海塞尔/SENNHEISER MX80 入门重低音手机电脑耳塞式耳机(黑色)","森海塞尔/SENNHEISER MX80 入门重低音手机电脑耳塞式耳机(黑色)","森海塞尔/SENNHEISER MX80 入门重低音手机电脑耳塞式耳机(黑色)"]
	});
	
});

