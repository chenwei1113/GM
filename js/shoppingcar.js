
$(function(){


})



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
    //反选,,对每个checkbox进行遍历
    "reverse": function(){
        this.each(function(){
            this.checked = !this.checked;
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
    }
});

$(document).ready(function(){
    //这个函数的意思是 把一个复选框和多个复选框关联起来
    $(".selectAll").checkRelation($(".prd-info :checkbox"));



    //计算购物车中的总价(如果是选中状态下的才去计算)
    $(".prd-container :checkbox").click(function(){	
		console.log($(".prd-container :checkbox:checked"));//打印是选中状态的checkbox
				
    });

	$(".prd-container :checkbox").each(function(i){
		if(this.checked==true){
			//console.log($(this));
		}
	});

});

//计算购物车中的价格
//增加数量
$(".addNumInCar").bind("click",function(){
    //console.log($(this).parent().parent().find($(":checkbox")));    
    changeNumAndPrice($(this),"+");
    changeTotalPrice();
});
//减少数量
$(".miunsNumInCar").bind("click",function(){
    changeNumAndPrice($(this),"-");
    changeTotalPrice();
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
    //改变totalPrice
    let totalPrice = 0;//parseInt($("#totalPrice").html().substring(1));
    $(".prd-info .sumPrice").each(function(i){
        //trim();去掉字符串前后的空格
        
        totalPrice += parseInt($(this).html().trim().substring(1));
    });
    
    $("#totalPrice").html("￥"+totalPrice.toFixed(2));
}
