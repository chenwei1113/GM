<?php
	header("content-type","text/html;charset=utf-8");

	//一、接收前端数据
	$username = $_POST['username'];//username是input框中的name属性的值
	$userpass = $_POST['userpass'];

	//二、处理数据
	//1. 链接服务器（搭桥）
	$conn = mysql_connect("localhost","root","root");
	//2. 选择数据库（目的地）
	mysql_select_db("gomedb",$conn);
	//3. 数据库操作
	//1) 查找用户名是否存在
	$sqlstr = "select * from vip where username='".$username."' and userpass='".$userpass."'";
	$result = mysql_query($sqlstr,$conn);//php执行sql语句，返回的是查询结果，表格
	//2）获取查询结果的行数
	$rows = mysql_num_rows($result);
    //4. 关闭数据库
    mysql_close($conn);

    //三、响应
    // if($rows==0){
    // 	echo "alert(&quot;用户名或密码输入错误&quot;)";
    // }else{
    // 	echo "恭喜您，登录成功";
    // }
    echo $rows;

?>