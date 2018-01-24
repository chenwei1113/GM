


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
    //console.log($("#ulbox li").eq(2).attr("goodsid"));
};

//点击li的时候，把当前的goodsid保存在cookie中
$("#ulbox").delegate("li","click",function(){
    saveCookie("goodsid",$(this).attr("goodsid"),7);
});


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





