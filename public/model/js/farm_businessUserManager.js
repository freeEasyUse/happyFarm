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

        //设置时间
        farm.initDateCombo($("#businessUserManager_oprate_modal input[name='buserCreateDate']"),'yyyy-mm-dd hh:ii',new Date());
        farm.initDateCombo($("#businessUserManager_oprate_modal input[name='buserUpdateDate']"),'yyyy-mm-dd hh:ii',new Date());
        farm.initDateCombo($("#businessUserManager_oprate_modal input[name='buserFieldStartDate']"),'yyyy-mm-dd',new Date());
        farm.initDateCombo($("#businessUserManager_oprate_modal input[name='buserFieldEndDate']"),'yyyy-mm-dd',new Date());

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
    field:'buserFieldName',
    title:'地块名字'
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
    farm.businessUser.initTable("#businessUserManager_table");
    console.log('document ready');
    //farm.businessUser.initComment();
});


/**
 * 打开新增
 */
farm.businessUser.openAddModel = function(){

     farm.businessUser.clearOptionValue();
     farm.businessUser.initComment();
     //显示修改按钮 隐藏新增按钮
     $(".modal-footer button[name='buser_save']").show();
     $(".modal-footer button[name='buser_update']").hide();
     $('#businessUserManager_oprate_modal').modal('show');
}


/**
 * 打开修改界面
 */
farm.businessUser.openUpdateModel = function(){
     //获取选中的记录
     var selectObjectArray = $('#businessUserManager_table').bootstrapTable('getSelections');
     if(farm.Ext_isArray(selectObjectArray)&&selectObjectArray.length===1){
        farm.businessUser.openAddModel();
        var selectObject = selectObjectArray[0];
        farm.businessUser.setOptionValue(selectObject);

        //证件号不允许修改
        $("#businessUserManager_oprate_modal input[name='buserCardNumber']").attr({disabled:'disabled'});
        //显示修改按钮 隐藏新增按钮
        $(".modal-footer button[name='buser_save']").hide();
        $(".modal-footer button[name='buser_update']").show();

     }
     else{
         bootbox.alert({message:'请选择一条记录',title : '提示'});
     }
}





/**
 * 保存新增
 */
farm.businessUser.save = function(){
       //获取新增输入
    var obj = farm.businessUser.getOptionValue();
    //发送请求
    $.post('/businessUser/addBusinessUser',obj,function(data){
        //关闭模态框
        $('#businessUserManager_oprate_modal').modal('toggle');
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'新增操作成功',title : '提示'});
            //刷新表格
            $('#businessUserManager_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'新增操作失败',title : '提示'});
        }
    },'json');
}



/**
 * 修改保存
 */
farm.businessUser.updateSave = function(){
    //获取修改记录
    var obj = farm.businessUser.getOptionValue();
    //发送修改请求
    $.post('/businessUser/updateBusinessUser',obj,function(data){
        //关闭模态框
        $('#businessUserManager_oprate_modal').modal('toggle');
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'操作成功',title : '提示'});
            //刷新表格
            $('#businessUserManager_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'操作失败',title : '提示'});
        }
    },'json');   
}






/**
 * 获取值
 */
farm.businessUser.getOptionValue = function(){
    var obj = new Object();
    obj.buserCardNumber = $("#businessUserManager_oprate_modal input[name='buserCardNumber']").val(); //证件号
    obj.buserName = $("#businessUserManager_oprate_modal input[name='buserName']").val();   //用户名
    obj.buserPhone = $("#businessUserManager_oprate_modal input[name='buserPhone']").val(); //联系电话
    obj.buserCreateDate = $("#businessUserManager_oprate_modal input[name='buserCreateDate']").val();   //创建时间
    obj.buserUpdateDate = $("#businessUserManager_oprate_modal input[name='buserUpdateDate']").val();   //修改时间
    obj.buserFieldCode = $("#businessUserManager_oprate_modal select[name='buserFieldCode']").val(); //地块编码
    obj.buserFieldName =  $("#businessUserManager_oprate_modal select[name='buserFieldCode']").text();  //地块名字
    obj.buserBusinessCode = $("#businessUserManager_oprate_modal input[name='buserBusinessCode']").val();//关联商家
    obj.buserFieldStartDate = $("#businessUserManager_oprate_modal input[name='buserFieldStartDate']").val();//租用开始时间
    obj.buserFieldEndDate = $("#businessUserManager_oprate_modal input[name='buserFieldEndDate']").val();//租用到期时间
    obj.buserBusinessDes = $("#businessUserManager_oprate_modal input[name='buserBusinessDes']").val();//描述
    return obj;
}


/**
 * 设置值
 */
farm.businessUser.setOptionValue = function(obj){
    $("#businessUserManager_oprate_modal input[name='buserCardNumber']").val(obj.buserCardNumber); //证件号
    $("#businessUserManager_oprate_modal input[name='buserName']").val(obj.buserName);   //用户名
    $("#businessUserManager_oprate_modal input[name='buserPhone']").val(obj.buserPhone); //联系电话
    $("#businessUserManager_oprate_modal input[name='buserCreateDate']").val(obj.buserCreateDate);   //创建时间
    $("#businessUserManager_oprate_modal input[name='buserUpdateDate']").val(obj.buserUpdateDate);   //修改时间
    //$("#businessUserManager_oprate_modal select[name='buserFieldCode']").val(obj.buserFieldCode); //地块编码
    //地块选择
    var soption = "<option value="+obj.buserFieldCode+">"+obj.buserFieldName+"</option>";
    $("#businessUserManager_oprate_modal select[name='buserFieldCode']").append(soption);
    $("#businessUserManager_oprate_modal select[name='buserFieldCode']").val(obj.buserFieldCode);
    $("#businessUserManager_oprate_modal input[name='buserBusinessCode']").val(obj.buserBusinessCode);//关联商家
    $("#businessUserManager_oprate_modal input[name='buserFieldStartDate']").val(obj.buserFieldStartDate);//租用开始时间
    $("#businessUserManager_oprate_modal input[name='buserFieldEndDate']").val(obj.buserFieldEndDate);//租用到期时间
    $("#businessUserManager_oprate_modal input[name='buserBusinessDes']").val(obj.buserBusinessDes);//描述
}

/**
 * 打开操作
 */
farm.businessUser.clearOptionValue = function(){

    $("#businessUserManager_oprate_modal input[name='buserCardNumber']").removeAttr("disabled");
    $("#businessUserManager_oprate_modal input[name='buserUpdateDate']").datetimepicker('setDate',new Date());  //修改时间
    $("#businessUserManager_oprate_modal select[name='buserFieldCode']").empty();   //清空select 选择

}