/**
 * 商家用户管理
 */
farm.businessUser = {};


/**
 * 初始化组件 
 * 下拉选择框 时间组件等
 */
farm.businessUser.initComment = function(){

    //加载地块信息
     $.ajax({
            url:'/businessUser/getAbleField',
            type:'GET',
            success:function(data){
                //返回json
                var result = JSON.parse(data);
                //设在选择框
               $.each(result,function(k,v){
                   var soption = "<option value="+v.fieldCode+">"+v.fieldName+"</option>";
                   $("#businessUserManager_oprate_modal select[name='buserFieldCode']").append(soption);
               });
            }
        });

        //设置商家信息
        $.ajax({
            url:'/businessUser/getUserInfo',
            type:'GET',
            success:function(data){
                //返回json
                var result = JSON.parse(data);
                //设置商家信息
                $("#businessUserManager_oprate_modal input[name='buserBusinessCode']").val(result.userCode);
                $("#businessUserManager_oprate_modal input[name='buserBusinessCode']").attr('disabled',true);
            }
        });

    

}




farm.businessUser.initTable = function(tableId){
    var settingParam = new Object();
    settingParam.url = '/businessUser';
    settingParam.columns = [
    {
    buserId: '_id',
    title: 'id',
    visible:false
    },
    {
    field: 'buserCardNumber',
    title: '用户证件号'
    },
    {
    field: 'buserName',
    title: '用户名'
    },
    {
    field: 'buserPhone',
    title: '手机号'
    },
    {
    field: 'buserFieldCode',
    title: '分配地块'
    },
    {
    field: 'buserBusinessCode',
    title: '商家编号'
    },
    {
    field: 'buserFieldStartDate',
    title: '开始时间'
    },
    {
    field: 'buserFieldEndDate',
    title: '到期时间'
    },
    {
    field: 'buserBusinessDes',
    title: '描述'
    }
    ];


    settingParam.toolbar = '#field_toolbar';

    //调用公用方法
    farm.initTable(tableId,settingParam);
}






//加载完成后 执行
$(document).ready(function() {
    //farm.businessUser.initTable("#businessUserManager_table");
    console.log('document ready');
    farm.businessUser.initComment();
});


/**
 * 打开新增
 */
farm.businessUser.openAddModel = function(){
     $('#businessUserManager_oprate_modal').modal('show');
}



farm.businessUser.getOptionValue = function(){

    var obj = new Object();
    obj.buserCardNumber = $("#businessUserManager_oprate_modal input[name='buserCardNumber']").val(); //证件号
    obj.buserName = $("#businessUserManager_oprate_modal input[name='buserName']").val();   //用户名
    obj.buserPhone = $("#businessUserManager_oprate_modal input[name='buserPhone']").val(); //联系电话
    obj.buserCreateDate = $("#businessUserManager_oprate_modal input[name='buserCreateDate']").val();   //创建时间
    obj.buserUpdateDate = $("#businessUserManager_oprate_modal input[name='buserUpdateDate']").val();   //修改时间
    obj.buserFieldCode = $("#businessUserManager_oprate_modal select[name='buserFieldCode']").val(); //地块编码
    obj.buserBusinessCode = $("#businessUserManager_oprate_modal input[name='buserBusinessCode']").val();//关联商家
    obj.buserFieldStartDate = $("#businessUserManager_oprate_modal input[name='buserFieldStartDate']").val();//租用开始时间
    obj.buserFieldEndDate = $("#businessUserManager_oprate_modal input[name='buserFieldEndDate']").val();//租用到期时间
    obj.buserBusinessDes = $("#businessUserManager_oprate_modal input[name='buserBusinessDes']").val();//描述

    return obj;


}