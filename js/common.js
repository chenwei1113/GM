
//保存cookie
//添加cookie
//参数：cookie名,cookie值,有效时长(单位：天)
function saveCookie(cookieName,cookieValue,cookieDates){
	var d = new Date();
	d.setDate(d.getDate()+cookieDates);
	document.cookie = cookieName+"="+cookieValue+";expires="+d.toGMTString();
}

//读取cookie//解析cookie
//参数：cookie名 
//返回值： cookie值
function getCookie(cookieName){
	var cookieStr = decodeURIComponent(document.cookie);
	var cookieValue = "";//用来存储cookie值
	var arr = cookieStr.split("; ");
	for(var i=0;i<arr.length;i++){
		if(arr[i].indexOf(cookieName+"=")==0){
			//得到cookie值
			cookieValue = arr[i].substring((cookieName+"=").length);
			break;
		}
	}
	return cookieValue;
}