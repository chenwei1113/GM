<meta charset="utf-8" />
<?php
	header("content-type","text/html;charset=utf-8");

	//一、接收前端数据
	$username = $_POST['username'];
	$userpass = $_POST['userpass'];

	//二、处理数据
	//1.链接服务器
	$conn = mysql_connect('localhost','root','root');
	//2.选择数据库
	mysql_select_db("gomedb",$conn);
	//3. 数据库操作
	//1) 查找用户名是否存在
	$sqlStr = "select * from vip where username='".$username."'";
	$result = mysql_query($sqlStr,$conn);
	$rows = mysql_num_rows($result);
	if($rows==0){
		//2) 把该用户名插入到数据库中
		//执行sql语句
		$sqlStr = "insert into vip(username,userpass) values('".$username."','".$userpass."')";
		mysql_query($sqlStr,$conn);

		//4、关闭数据库
		mysql_close($conn);

		//三、响应
		echo "恭喜您，注册成功，进入<a href='../index.html'>首页</a>";

	}else if($rows==1){
		//三、响应
		echo "注册失败，该用户名已经存在！";
	}
?>