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
 * 页面加载完成
 */
$(document).ready(function(){

});