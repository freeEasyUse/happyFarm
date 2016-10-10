/**
 * 基础js
 */
var farm = {};
console.log('base');

/**
 * 添加tab item
 * menuCode 菜单id
 * showText 显示标题
 */
farm.addTabIem = function(url,menuCode,showText){
    console.log("add tab item");
    //获取ul 存放标签
    var ulElement = $('.nav.nav-tabs.tabdrop');
    //获取div 存放标签页
    var divElement = $('.tile-body.tab-content.nopadding.rounded-bottom-corners');
    //创建过元素 直接显示
    if($("#"+menuCode).length>0){
        $('a[href="#'+menuCode+'"]').tab('show');
    }
    //动态添加
    else{
        //创建tab标签        
        ulElement.append('<li><a href="#'+menuCode+'" data-toggle="tab"><i class="fa fa-file"></i>'+showText+'</a><span class="label label label-transparent-black tab-close"><i class="fa fa-times"></i></span></li>');
        //创建tab页
        divElement.append('<ul class="tab-pane fade" id='+menuCode+'></ul>');
        //获取url对应的页面内容
         $("#" + menuCode).load(url,function(XMLHttpRequest, textStatus, errorThrown){
             if(textStatus == "error"){
                 alert('加载内容错误！');
             }
             //显示内容
             else{
                 $('a[href="#'+menuCode+'"]').tab('show');
                 //注册标签页关闭事件
                 $('a[href="#'+menuCode+'"]').next().find('i').click(function(){
                    //移除添加内容
                   $('a[href="#'+menuCode+'"]').parent().remove();
                   $("#"+menuCode).remove();         
                 });
             }
         });
    }
};




/**
 * 初始化表格
 */
farm.initTable = function(tableId,optionParam){
    //定义默认元素
    var defaultParam = {
        url:"",
        columns:[],
        classes:"table table-responsive table-striped table-hover",
        //pageNumber:1,   //页数
        pageSize:10,    //每页条数
        pageList:[10],
        locale:'zh-CN',
        pagination:true,    //是否显示分页
        search:true,
        showToggle:true,   //显示切换按钮
        showColumns:true,   //显示列切换

    }
    var resultParam = $.extend(defaultParam,optionParam);
    //添加选择列
    resultParam.columns.unshift({field:'state',checkbox: true});
    $(tableId).bootstrapTable(resultParam);
};




/**
 * 判断是否为数组
 */
farm.Ext_isArray = function(obj) {    
	return Object.prototype.toString.call(obj) === '[object Array]';     
}

/**
 * 判断是否为空
 */
farm.Ext_isEmpty = function(v){
    return v === null || v === undefined || v===''||(farm.Ext_isArray(v) && !v.length);
}

/**
 * 设置时间控件
 */
farm.initDateCombo = function(input,format,defaultValue){
	if(farm.Ext_isEmpty(input)){
		return;
	}
	//初始化日期组建
	input.datetimepicker({
	    language:'zh-CN',
		forceParse: true,  
		pickTime: false,
		todayBtn: true,
		autoclose:true,
		minView: 2,
		format:format
     }).next().on('click', function(){
		$(this).prev().focus();
	 });
     if(defaultValue!=null){
         input.datetimepicker('setDate',defaultValue);
     }
};


/**
 * 表格格式化日期
 */
farm.dateToStr = function(dateStr,endDay){
    var myDate = new Date(dateStr);
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
    var nowDay = myDate.getDate();        //获取当前日(1-31)
    var hour = myDate.getHours();       //获取当前小时数(0-23)
    var mm = myDate.getMinutes();     //获取当前分钟数(0-59)
    var ss = myDate.getSeconds();     //获取当前秒数(0-59)
    if(endDay){
        return year+"-"+month+"-"+nowDay;
    }
    return year+"-"+month+"-"+nowDay+" "+hour+":"+mm+":"+ss;
}



/**
 * 页面加载完成
 */
$(document).ready(function(){

});