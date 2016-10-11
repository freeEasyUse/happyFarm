/**
 * 商家下的地块管理
 */
farm.field = {};

farm.field.initTable = function(tableId){
        var settingParam = new Object();
    settingParam.url = '/field';
    settingParam.columns = [
    {
        field: '_id',
        title: 'id',
        visible:false
    }, {
        field: 'fieldName',
        title: '地块名称',
        visible:false
    },
     {
        field: 'fieldCode',
        title: '地块编号'
    }
    , {
        field: 'fieldPartnerCode',
        title: '商家编码'
    },
    {
        field:'fieldPartnerName',
        title:'商家名字'
    },{
        field:'fieldSize',
         title:'地块大小'
    },
    {
        field:'fieldCreateTime',
        title:'创建时间',
        formatter:function(value,row,index){
            return farm.dateToStr(value);
        }
    },
    {
        field:'fieldUpdateTime',
        title:'修改时间',
        formatter:function(value,row,index){
            return farm.dateToStr(value);
        }
    },
    {
        field:'fieldVedio',
        title:'监控设备'
    },
    {
        field:'fieldStatus',
        title:'当前状态'
    },
    {
        field:'fieldUserCode',
        title:'当前使用人编码'
    },
    {
        field:'fieldUserName',
        title:'当前使用人'
    },
    {
        field:'fieldDes',
        title:'描述'
    }];

    settingParam.toolbar = '#field_toolbar';

    //调用公用方法
    farm.initTable(tableId,settingParam);
}


//加载完成后 执行
$(document).ready(function() {
    //设置表格
    farm.field.initTable('#field_table');
    //设置时间
    farm.initDateCombo($("#field_oprate_modal input[name='field_createTime']"),'yyyy-mm-dd hh:ii');
    farm.initDateCombo($("#field_oprate_modal input[name='field_updateTime']"),'yyyy-mm-dd hh:ii');


});

/**
 * 打开新增模态框
 */
farm.field.openAddModel = function(){
    $('#field_oprate_modal').modal('show');

    $("#field_oprate_modal input[name='field_createTime']").datetimepicker('setDate',new Date());
    $("#field_oprate_modal input[name='field_updateTime']").datetimepicker('setDate',new Date());
    $("#field_oprate_modal input[name='field_createTime']").attr({disabled:'disabled'});
    $("#field_oprate_modal input[name='field_updateTime']").attr({disabled:'disabled'});

    //隐藏新增按钮 显示修改按钮
    $(".modal-footer button[name='field_savePartner']").show();
    $(".modal-footer button[name='field_updatePartner']").hide();
}

/**
 * 打开修改模态框
 */
farm.field.openUpdateModel = function(){
    //获取当前选中记录
    var selectObjectArray = $('#field_table').bootstrapTable('getSelections');
    if(farm.Ext_isArray(selectObjectArray)&&selectObjectArray.length===1){
        //打开模态框
        farm.field.openAddModel();
        var selectObject = selectObjectArray[0];
        farm.field.setOptionValue(selectObject);

        //隐藏新增按钮 显示修改按钮
        $(".modal-footer button[name='field_savePartner']").hide();
        $(".modal-footer button[name='field_updatePartner']").show();


    }
    else{
         bootbox.alert({message:'请选择一条记录进行修改',title : '提示'});
    }
}

/**
 * 保存新增内容
 */
farm.field.saveField = function(){
    //获取新增输入
    var obj = farm.field.getOptionValue();
    //发送请求
    $.post('/field/addField',obj,function(data){
        //关闭模态框
        $('#field_oprate_modal').modal('toggle');
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'新增操作成功',title : '提示'});
            //刷新表格
            $('#field_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'新增操作失败',title : '提示'});
        }
    },'json');
}



/**
 * 修改内容
 */
farm.field.updateField = function(){
    var obj = farm.field.getOptionValue();
    $.post('/field/updateField',obj,function(data){
        //关闭模态框
        $('#field_oprate_modal').modal('toggle');
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'修改操作成功',title : '提示'});
            //刷新表格
            $('#field_table').bootstrapTable('refresh',{silent: true});
        }
        else{
                bootbox.alert({message:'修改操作失败',title : '提示'});
        }
    },'json');
}


/**
 * 删除记录
 */
farm.field.removeField = function(){
    var selectObjectArray = $('#field_table').bootstrapTable('getSelections');
    if(farm.Ext_isArray(selectObjectArray)&&selectObjectArray.length>0){
        var fieldCodes = new Array();
        $.each(selectObjectArray, function(k, v){
            fieldCodes.push(v.fieldCode);
        });
        //发送请求
        $.post('/field/deleteField',{"arrStr":fieldCodes.toString()},function(data){
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'删除操作伙伴成功',title : '提示'});
            //刷新表格
            $('#field_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'删除操作伙伴失败',title : '提示'});
            }
        },'json');
    }
}


/**
 * 获取填写值
 */
farm.field.getOptionValue = function(){
    var obj = new Object();
    obj.fieldName = $("#field_oprate_modal input[name='field_name']").val();    //地块名字
    obj.fieldCode = $("#field_oprate_modal input[name='field_code']").val();    //地块编码
    obj.fieldPartnerCode = $("#field_oprate_modal input[name='field_partnerCode']").val();    //所属商家编码
    obj.fieldPartnerName = $("#field_oprate_modal input[name='field_partnerName']").val();    //所属商家名字
    obj.fieldStatus = $("#field_oprate_modal select[name='field_status']").val();    //状态
    obj.fieldUserCode = $("#field_oprate_modal input[name='field_userCode']").val();    //当前租用人编码
    obj.fieldSize = $("#field_oprate_modal input[name='field_size']").val();    //地块大小
    obj.fieldVedio = $("#field_oprate_modal input[name='field_video']").val();    //视频
    obj.fieldCreateTime = $("#field_oprate_modal input[name='field_createTime']").val();    //创建时间
    obj.fieldUpdateTime = $("#field_oprate_modal input[name='field_updateTime']").val();    //修改时间
    obj.fieldDes = $("#field_oprate_modal input[name='field_des']").val();     //描述
    obj.fieldUserName = $("#field_oprate_modal input[name='field_userName']").val();    //当前租用人名字
    return obj;
}



/**
 * 根据表格内容 设置修改值
 */
farm.field.setOptionValue = function(obj){
    //设置显示值
    $("#field_oprate_modal input[name='field_name']").val(obj.fieldName);    //地块名字
    $("#field_oprate_modal input[name='field_code']").val(obj.fieldCode);    //地块编码
    $("#field_oprate_modal input[name='field_partnerCode']").val(obj.fieldPartnerCode);    //所属商家编码
    $("#field_oprate_modal input[name='field_partnerName']").val(obj.fieldPartnerName);    //所属商家名字
    $("#field_oprate_modal select[select='field_status']").val(obj.fieldStatus);    //状态
    $("#field_oprate_modal input[name='field_userCode']").val(obj.fieldUserCode);    //当前租用人编码
    $("#field_oprate_modal input[name='field_size']").val(obj.fieldSize);    //地块大小
    $("#field_oprate_modal input[name='field_video']").val(obj.fieldVedio);    //视频
    $("#field_oprate_modal input[name='field_createTime']").val(obj.fieldCreateTime);    //创建时间
    $("#field_oprate_modal input[name='field_updateTime']").val(obj.fieldUpdateTime);    //修改时间
    $("#field_oprate_modal input[name='field_des']").val(obj.fieldDes);     //描述
    $("#field_oprate_modal input[name='field_userName']").val(obj.fieldUserName);    //当前租用人名字

    //设置改项目
    $("#field_oprate_modal input[name='field_code']").attr({disabled:'disabled'});
    $("#field_oprate_modal input[name='field_partnerCode']").attr({disabled:'disabled'});
    $("#field_oprate_modal input[name='field_partnerName']").attr({disabled:'disabled'});
    $("#field_oprate_modal input[name='field_userCode']").attr({disabled:'disabled'});
    $("#field_oprate_modal input[name='field_userName']").attr({disabled:'disabled'});
    $("#field_oprate_modal input[name='field_createTime']").attr({disabled:'disabled'});
    $("#field_oprate_modal input[name='field_updateTime']").attr({disabled:'disabled'});

}




/**
 * 打开批量处理模态框
 */
farm.field.openBatchModal = function(){
    $("#field_batchImport_modal").modal('show');
}
