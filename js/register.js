

var regName = /[a-z0-9\u4E00-\u9FFF]{4,20}$/;
var regPass = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
var regPhone = /^1[34578]\d{9}$/;

$("#username").blur(function(){
	let value = $(this).val();
	//1. 先判断是否为空
	if(value==""){
		$(".errorMsg1").html("请输入用户名");
		changeRedColor($(".errorMsg1"));
		changeBorderRedColor($("#username"));
		$(".errorMsg1").css({"display":"inline-block"});
	}else {
		//2.不为空的话，再进行正则验证
		//2.1 验证不通过时，
		if(!regName.test(value)){
			$(".errorMsg1").html("用户名格式不正确");
			$(".errorMsg1").css({"display":"inline-block"});
			changeRedColor($(".errorMsg1"));
			changeBorderRedColor($("#username"));
		}else {//2.2 验证通过
			// $(".errorMsg1").css({"display":"none"});
			
			//前台验证通过后，再发送ajax请求
			$.ajax({
				url: "php/usercheck.php",
				type: "get",
				data: {
					"username":$("#username").val()
				},
				success: function(data){
					if(data=="1"){ //用户名不可用
						// usernameExists = false;
						changeRedColor($(".errorMsg1"));
						$(".errorMsg1").css({"display":"inline-block"});
						$(".errorMsg1").html("该用户名已存在");
						$(".rightTip").eq(0).css({"display":"none"});
						
					}else if(data=="0") { //用户名可用
						// usernameExists = true;
						$(".errorMsg1").css({"display":"inline-block"});
						changeBorderNormalColor($("#username"));
						changeNormalColor($(".errorMsg1"));
						$(".errorMsg1").html("该用户名可用");
						$(".rightTip").eq(0).css({"display":"inline-block"});
					}
				}
			});
		}
	}

});

$("#userpass").blur(function(){
	let value = $(this).val();
	//1. 先判断是否为空
	if(value==""){
		$(".errorMsg2").html("请输入密码");
		changeRedColor($(".errorMsg2"));
		changeBorderRedColor($("#userpass"));
		$(".errorMsg2").css({"display":"inline-block"});
		$(".rightTip").eq(1).css({"display":"none"});//对号框
	}else if(value!=""){
		//2.不为空的话，再进行正则验证
		//2.1 验证不通过时，
		if(!regName.test(value)){
			$(".errorMsg2").html("密码格式不正确");
			changeRedColor($(".errorMsg2"));
			changeBorderRedColor($("#userpass"));
			$(".rightTip").eq(1).css({"display":"none"});
			$(".errorMsg2").css({"display":"inline-block"});
		}else {//2.2 验证通过
			$(".rightTip").eq(1).css({"display":"inline-block"});
			$(".errorMsg2").css({"display":"none"});
			changeBorderNormalColor($("#userpass"));
			//确认密码 的框变成可输入的
			$(".i-text").eq(2)[0].disabled = false;
		}
	}
});

//确认密码
$(".i-text").eq(2).blur(function(){
	let value = $(this).val();
	//1. 先判断是否为空
	if(value==""){
		$(".errorMsg3").html("请输入密码");
		changeRedColor($(".errorMsg3"));
		changeBorderRedColor($(".i-text").eq(2));
		$(".rightTip").eq(2).css({"display":"none"});
		$(".errorMsg3").css({"display":"inline-block"});
	}else {
		//2. 验证两次输入的密码是否一致
		if(value==$("#userpass").val()){
			$(".rightTip").eq(2).css({"display":"inline-block"});
			$(".errorMsg3").css({"display":"none"});
			changeBorderNormalColor($(".i-text").eq(2));
		}else{
			$(".errorMsg3").html("两次密码输入不一致");
			changeRedColor($(".errorMsg3"));
			changeBorderRedColor($(".i-text").eq(2));
			$(".errorMsg3").css({"display":"inline-block"});
			$(".rightTip").eq(2).css({"display":"none"});
		}
	}
});




$("#phone").blur(function(){
	let value = $(this).val();
	//1. 先判断是否为空
	if(value==""){
		$(".errorMsg4").html("手机号不能为空");
		changeRedColor($(".errorMsg4"));
		changeBorderRedColor($("#phone"));
		$(".errorMsg4").css({"display":"inline-block"});
	}else if(value!=""){
		//2.不为空的话，再进行正则验证
		//2.1 验证不通过时，
		if(!regPhone.test(value)){
			$(".errorMsg4").html("手机号码格式有误，请重新输入");
			changeRedColor($(".errorMsg4"));
			changeBorderRedColor($("#phone"));
			$(".errorMsg4").css({"display":"inline-block"});
		}else {//2.2 验证通过
			$(".rightTip").eq(3).css({"display":"inline-block"});
			$(".errorMsg4").css({"display":"none"});
			changeBorderNormalColor($("#phone"));
		}
	}
});

function changeRedColor($obj){
	$obj.css({"color":"#E3101E"});
}
function changeBorderRedColor($obj){
	$obj.css({"border":"1px solid #E3101E"});
}
function changeNormalColor($obj){
	$obj.css({"color":"#a5a5a5"});
}
function changeBorderNormalColor($obj){
	$obj.css({"border":"1px solid #ccc"});
}


//点击立即注册时，对文本框的内容进行判断
$(".regform").submit(function () {
    if($("#username").val()==""||$("#userpass").val()==""||$(".i-text").eq(2).val()==""||$("#phone").val()==""){
        alert("输入框不能为空");
        return false; //阻止浏览器的默认行为。
    }
});
