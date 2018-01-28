

//列表页一加载的时候，就发送ajax请求，得到购物车中所有商品的数量，显示在右上角的小购物车中
$(function(){
    getData();
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


//页面一加载，就去读取商品列表数据
$(function(){
    $.ajax({
        url:"php/getGoodsList.php",
        type: "get",
        dataType: "json",
        success: function(data){
            showGoodsinfo(data);
        } 
    });
});
function showGoodsinfo(datas){
    let $ulbox = $("#ulbox");
    for(var i=0;i<datas.length;i++){
        let str = "<li goodsid='"+datas[i].goodsId+"'><p><a href='detail.html'><img src='img/"+datas[i].goodsName+"' /></a></p>"+
            "<p class='price'>￥"+datas[i].goodsPrice+"</p>"+
            "<p class='description'>"+datas[i].goodsDesc+"</p>"+
            "<p class='ziying'>自营</p>"+
            "<p class='joincart'><a href='javascript:;'>加入购物车</a></p></li>";
        $ulbox.append(str);
    }  
    

    //点击li的时候，把当前的goodsid保存在cookie中
    $("#ulbox").delegate("li","click",function(){
        saveCookie("goodsid",$(this).attr("goodsid"),7);
    });

    //当点击加入购物车的时候，发送ajax请求
    $("#ulbox").delegate(".joincart",'click',function(event){
        saveCookie("goodsid",$(this).parent().attr("goodsid"),7);
        event.stopPropagation();
        //添加购物车
        $.ajax({
            url:'php/addShoppingCart.php',
            type: 'get',
            dataType: 'json',
            data: {
                "goodsId": getCookie("goodsid"),
                "vipName": getCookie("username"),
                "goodsCount": "1"
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
};


//用 事件委托 绑定事件
 $("#ulbox").delegate("li","mouseenter",function(){
    //对确定的每一个li进行操作
    $(this).each(function(){
        $(this).css({"border":"1px solid #ccc"});
        $(this).find($(".joincart")).show("normal");
    });
});

$("#ulbox").delegate("li","mouseleave",function(){
    //对确定的每一个li进行操作
    $(this).each(function(){
        $(this).css({"border":"1px solid transparent"});
        $(this).find($(".joincart")).hide("normal");
    });
});








