 //放大镜面向对象
function BigMirror(obj){
    //放置  大的图片 的dom元素
    this.$Obj = obj.$Obj;
    // 放大效果  的盒子  html对象
    this.$bigShow = null;
    // 放大镜 的 html对象
    this.$bigMirror = null;
    
    //放大镜的宽高
    this.bigMirrorWidth = obj.bigMirrorWidth;
    this.bigMirrorHeight = obj.bigMirrorHeight;
    
    //放大的倍数
    this.multiple = obj.multiple;
}
//创建外观
BigMirror.prototype.createUI = function(){
    //放大镜
	this.$bigMirror = $("<div></div>");
	this.$bigMirror.css({
        "position": "absolute",
        "left": 0,
        "top": 0,
		"width": this.bigMirrorWidth,
		"height": this.bigMirrorHeight,
		"background-color": "#ccc",
		"opacity": 0.4,
        "display":"none"
	});
	this.$Obj.append(this.$bigMirror);

    //放大效果
    this.$bigShow = $("<div></div>");
    this.$bigShow.addClass("bigShow");
    this.$bigShow.css({
        "position": "absolute",
        "border": "1px solid #d9d9d9",
        "left": this.$Obj.width() + 10,
        "top": 0,
        "width": this.bigMirrorWidth*this.multiple, //2.25
        "height": this.bigMirrorHeight*this.multiple,
		"background": "url(img/fdj1_800.jpg)",
        "background-repeat": "no-repeat",      
        "background-size": this.$Obj.width()*this.multiple+"px "+this.$Obj.height()*this.multiple,
        "z-index": "200",		
        "display":"none"
    });
    this.$Obj.append(this.$bigShow);
}

BigMirror.prototype.initEvent = function(){
    var that = this;
    this.$Obj.mouseenter(function(){
        that.$bigMirror.css({"display":"block","cursor":"move"});
        that.$bigShow.css("display","block");
    });
    this.$Obj.mouseleave(function(){
        that.$bigMirror.css("display","none");
        that.$bigShow.css("display","none");
    });
    //移动事件
    this.$Obj.mousemove(function(evt){
        //一、放大镜跟着鼠标走
        //计算鼠标距离box左上角的位置
        let left = evt.pageX-$(this).offset().left;//鼠标距离页面的横向距离-box距离页面的横向距离
        let top = evt.pageY-$(this).offset().top;

        //计算放大镜的位置
        let bigMirrorLeft = left-that.bigMirrorWidth/2;
        let bigMirrorTop = top-that.bigMirrorHeight/2;

        //边界处理
        //if(left>=小图的宽度-放大镜的宽度){
        if(bigMirrorLeft>=that.$Obj.width()-that.$bigMirror.width()){
            bigMirrorLeft =that.$Obj.width()-that.$bigMirror.width();
        }else if(bigMirrorLeft<=0){
            bigMirrorLeft =0;
        }

        if(bigMirrorTop>=that.$Obj.height()-that.$bigMirror.height()){
            bigMirrorTop =that.$Obj.height()-that.$bigMirror.height();
        }else if(bigMirrorTop<=0){
            bigMirrorTop =0;
        }

        that.$bigMirror.css({
            "left":bigMirrorLeft,
            "top":bigMirrorTop
        });

        //二、大图的移动
        that.$bigShow.css({
            "background-position":-1*(that.multiple)*bigMirrorLeft+"px "+-1*(that.multiple)*bigMirrorTop+"px"
        });

    });
}