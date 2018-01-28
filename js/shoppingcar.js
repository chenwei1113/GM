
$(function(){
    //页面一加载,就显示购物车（从数据库中拿数据）
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
            console.log(data.length);
            console.log(getCookie("username"));
            showShoppingCartPage(data);
        }
    });
});
//显示购物车页面
function showShoppingCartPage(datas){
    for(let i=0;i<datas.length;i++){
        var str = `
        <div class='prd-info' goodsid='${datas[i].goodsId}'>
            <input type='checkbox' checked='checked' />
            <img src='img/${datas[i].goodsName}' />
            <span class='col-2'>${datas[i].goodsDesc}</span>
            <span class='col-3 perPrice'>￥${datas[i].goodsPrice}.00</span>
            <span class='col-4'>
                <input type='text' value='${datas[i].goodsCount}' id='numInCar' class='numInCar' />
                <a href='javascript:;' class='miunsNumInCar'>-</a>
                <a href='javascript:;' class='addNumInCar'>+</a>
            </span>
            <span class='col-5 sumPrice' id='sumPrice'>
                ￥${datas[i].goodsCount*datas[i].goodsPrice}.00
            </span>
            <span class='col-7'>
                <a href='javascript:;' class='remove' id='remove'>删除</a><br />
                <a href='javascript:;'>移入收藏夹</a>
            </span>
        </div>
                `;
        //console.log(datas.length);
        $(".prd-container").prepend(str);   
    }

    //建立全选的联系
    $(".selectAll").checkRelation($(".prd-info :checkbox"));
    //改变总价
    changeTotalPrice();
    //点击全选按钮，改变总价
    $(".selectAll").click(function(){
        changeTotalPrice();             
    });
    //计算购物车中的价格
    //增加数量
    $(".addNumInCar").bind("click",function(){
        //1) 点击 增加数量和减少数量的时候，让当前的checkbox变为选中的状态
        $(this).parent().parent().find($(":checkbox"))[0].checked=true;
        //2) 改变全选的状态
        changeSelectAllStatus();
        //改变数量和sumPrice
        changeNumAndPrice($(this),"+");
        changeTotalPrice();

        //发送请求，改变 数据库中的数量
        $.ajax({
            type: "get",
            url: 'php/updateGoodsCount.php',
            data: {
                "vipName": getCookie("username"),
                "goodsId": $(this).parent().parent().attr("goodsid"),
                "goodsCount": $(this).parent().children().eq(0).val()
            },
            dataType: 'json',
            success: function(data){
                console.log(data);
            }
        });

    });

  

    //减少数量
    $(".miunsNumInCar").bind("click",function(){
        $(this).parent().parent().find($(":checkbox"))[0].checked=true;
        //2) 改变全选的状态
        changeSelectAllStatus();
        changeNumAndPrice($(this),"-");
        changeTotalPrice();

        //发送请求，改变 数据库中的数量
        $.ajax({
            type: "get",
            url: 'php/updateGoodsCount.php',
            data: {
                "vipName": getCookie("username"),
                "goodsId": $(this).parent().parent().attr("goodsid"),
                "goodsCount": $(this).parent().children().eq(0).val()
            },
            dataType: 'json',
            success: function(data){
                console.log(data);
            }
        });

        
    });
    //点击复选框的时候，去计算totalPrice
    $(".prd-container :checkbox").click(function(){ 
        changeTotalPrice();     
    });

    //点击删除按钮，让其在页面上移除，并在数据库中删除本条记录
    $(".remove").click(function(){
        let isSure = confirm("确定要删除吗？");
        if(isSure == true){
            
            $.ajax({
                url: 'php/deleteGoods.php',
                type: 'get',
                dataType: 'json',
                data: {
                    "vipName": getCookie("username"),
                    "goodsId": $(this).parent().parent().attr("goodsid")
                },
                success: function(data){                   
                    alert("删除成功");
                }
            });
            $(this).parent().parent().remove();
        }
          
    });

    //修改购物车中商品的数量


}



//全选 功能
//jQuery插件
jQuery.fn.extend({
    //全选
    // 点击全选按钮，遍历所有的checkbox
    "checkAll": function(isChecked){
        //遍历   选择所有的checkbox
        this.each(function(){
            this.checked = isChecked;
        });
    },
    
    //所有的checkbox 与 全选按钮的联动
    //父与子的关系
    "checkRelation":function($sub){
        $parent = this;//定义父亲
        //1.父控制子
        //1）点击父亲的时候，儿子全选
        this.click(function(){
            $sub.checkAll($parent[0].checked);//根据父元素的状态 改变自己的状态
        });
        //2.子控制父
        $sub.click(function(){
            //遍历所有的子复选框
            let isChecked = true;
            $sub.each(function(){
                if(this.checked==false){
                    isChecked = false;
                }
            });
            $parent[0].checked = isChecked;
        });
        //不是在点击的时候，让子控制父。当子复选框的checked状态发生变化时，子控制父。
       
    }
});



function changeNumAndPrice($obj,operator){
    let childrens = $obj.parent().children();
   // console.log(childrens);
    let numInCar = parseInt(childrens.eq(0).val());
    if(operator=="+"){
        numInCar += 1;
    }else if(operator=="-"){
        if(numInCar==1){
            numInCar = 1;
            return;
        }
        numInCar -= 1;
    }
    childrens.eq(0).val(numInCar);
    var perPrice = $obj.parent().parent().find($(".perPrice")).html().substring(1);
    // console.log(perPrice);
    // console.log(numInCar);
    $obj.parent().parent().find($(".sumPrice")).html("￥"+(perPrice*numInCar).toFixed(2));
  
}

function changeTotalPrice(){

    //改变totalPrice时，先判断checkbox有没有被选中，选中的话，再去计算

    let totalPrice = 0;//parseInt($("#totalPrice").html().substring(1));
    $(".prd-container :checkbox").each(function(i){
    	if(this.checked==true){
    		totalPrice += parseInt($(this).siblings(".sumPrice").html().trim().substring(1));
    	}
    });
    
    $("#totalPrice").html("￥"+totalPrice.toFixed(2));
}


function changeSelectAllStatus(){
	let isChecked = true;
    $(".prd-container :checkbox").each(function(){
        if(this.checked==false){
            isChecked = false;
        }
    });
    $(".selectAll")[0].checked = isChecked;
}

function changeNumInDB(){
    //发送请求，改变 数据库中的数量
    $.ajax({
        type: "get",
        url: 'php/updateGoodsCount.php',
        data: {
            "vipName": getCookie("username"),
            "goodsId": $(this).parent().parent().attr("goodsid"),
            "goodsCount": $(this).parent().children().eq(0).val()
        },
        dataType: 'json',
        success: function(data){
            console.log(data);
        }
    });
}
