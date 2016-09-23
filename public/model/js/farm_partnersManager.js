farm.partnersManager = {};


farm.partnersManager.initTable = function(tableId){
    var settingParam = new Object();
    settingParam.url = '/partners';
    settingParam.columns = [
    {
        field: '_id',
        title: 'id',
        visible:false
    }, {
        field: 'partnerPassword',
        title: '密码',
        visible:false
    },
     {
        field: 'partnerName',
        title: '伙伴名称'
    }
    , {
        field: 'partnerPhone',
        title: '联系方式'
    },
    {
        field:'partnerAddress',
        title:'地址'
    },{
        field:'partnerCode',
         title:'编码'
    },
    {
        field:'partnerCreateTime',
        title:'创建时间'
    },
    {
        field:'partnerUpdateTime',
        title:'修改时间'
    },
    {
        field:'partnerDes',
        title:'描述'
    }];
    settingParam.toolbar = '#parteners_toolbar';

    //调用公用方法
    farm.initTable('#parteners_table',settingParam);

};


//加载完成后 执行
$(document).ready(function() {
    farm.partnersManager.initTable('#parteners_table');
    //设置时间
    farm.initDateCombo($("#partners_oprate_modal input[name='farm_partner_createTime']"),'yyyy-mm-dd hh:ii');
    farm.initDateCombo($("#partners_oprate_modal input[name='farm_partner_updateTime']"),'yyyy-mm-dd hh:ii');
});

//打开模态框 新增
farm.partnersManager.openAddModel = function(){
    $('#partners_oprate_modal').modal('show');
    //清空模态框数据
    $('#partners_oprate_modal input').val('');
    //设置时间
    $("#partners_oprate_modal input[name='farm_partner_createTime']").datetimepicker('setDate',new Date());
    $("#partners_oprate_modal input[name='farm_partner_updateTime']").datetimepicker('setDate',new Date());
    $("#partners_oprate_modal input[name='farm_partner_createTime']").attr({disabled:'disabled'});
    $("#partners_oprate_modal input[name='farm_partner_updateTime']").attr({disabled:'disabled'});
    //设置密码
    $("#partners_oprate_modal input[name='farm_partner_password']").val('111111'); 
    //设置修改按钮隐藏
    $(".modal-footer button[name='farm_updatePartner']").hide();
    $(".modal-footer button[name='farm_savePartner']").show();
};

//打开模态框 修改
farm.partnersManager.openUpdatePartner = function(){
    //获取当前选择的表格记录
    var selectObjectArray = $('#parteners_table').bootstrapTable('getSelections');
    if(farm.Ext_isArray(selectObjectArray)&&selectObjectArray.length===1){
        //打开模态框
        farm.partnersManager.openAddModel();
        var selectObject = selectObjectArray[0];
        //设置属性值
        $("#partners_oprate_modal input[name='farm_partner_name']").val(selectObject.partnerName);    //名称
        $("#partners_oprate_modal input[name='farm_partner_phone']").val(selectObject.partnerPhone);  //电话
        $("#partners_oprate_modal input[name='farm_partner_address']").val(selectObject.partnerAddress);  //地址
        $("#partners_oprate_modal input[name='farm_partner_password']").val(selectObject.partnerPassword); //密码
        $("#partners_oprate_modal input[name='farm_partner_code']").val(selectObject.partnerCode);        //code
        $("#partners_oprate_modal input[name='farm_partner_createTime']").val(selectObject.partnerCreateTime);    //创建时间
        $("#partners_oprate_modal input[name='farm_partner_updateTime']").val(selectObject.partnerUpdateTime);    //修改时间
        $("#partners_oprate_modal input[name='farm_partner_des']").val(selectObject.partnerDes);      //描述
        //设置不可修改项目
        $("#partners_oprate_modal input[name='farm_partner_createTime']").attr({disabled:'disabled'});
        $("#partners_oprate_modal input[name='farm_partner_updateTime']").attr({disabled:'disabled'});
        $("#partners_oprate_modal input[name='farm_partner_password']").attr({disabled:'disabled'});
        $("#partners_oprate_modal input[name='farm_partner_code']").attr({disabled:'disabled'});
        //设置新增按钮隐藏
        $(".modal-footer button[name='farm_updatePartner']").show();
        $(".modal-footer button[name='farm_savePartner']").hide();
    }
    else{
         bootbox.alert({message:'请选择一条记录进行修改',title : '提示'});
    }
    
}

//新增合作伙伴
farm.partnersManager.savePartner = function(){
    //获取新增输入
    var obj = farm.getModelValue();
    //发送请求
    $.post('/partners/addPartner',obj,function(data){
        //关闭模态框
        $('#partners_oprate_modal').modal('toggle');
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'新增合作伙伴成功',title : '提示'});
            //刷新表格
            $('#parteners_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'新增合作伙伴失败',title : '提示'});
        }
    },'json');
}

/**
 * 修改记录
 * 
 */
farm.partnersManager.updatePartner = function(){
    //获取当前选择的表格记录
    var selectObjectArray = $('#parteners_table').bootstrapTable('getSelections');
    if(farm.Ext_isArray(selectObjectArray)&&selectObjectArray.length===1){
        var obj = farm.getModelValue();
        //修改时间
        obj.partnerUpdateTime = new Date();

        //发送请求
        $.post('/partners/updatePartner',obj,function(data){
        //关闭模态框
        $('#partners_oprate_modal').modal('toggle');
        //清空模态框数据
        $('#partners_oprate_modal input').val('');
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'修改合作伙伴成功',title : '提示'});
            //刷新表格
            $('#parteners_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'修改合作伙伴失败',title : '提示'});
        }
        },'json');
    }
}



/**
 * 删除选中记录
 */
farm.partnersManager.deletePartner =  function(){
    //获取选择记录
    var selectObjectArray = $('#parteners_table').bootstrapTable('getSelections');
    if(farm.Ext_isArray(selectObjectArray)&&selectObjectArray.length>0){
        var partnerCodes = new Array();
        $.each(selectObjectArray, function(k, v){
            partnerCodes.push(v.partnerCode);
        });
        //发送请求
        $.post('/partners/deletePartner',{"arrStr":partnerCodes.toString()},function(data){
        //成功提示
        if(data.state ==='success'){
            bootbox.alert({message:'删除合作伙伴成功',title : '提示'});
            //刷新表格
            $('#parteners_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'删除合作伙伴失败',title : '提示'});
            }
        },'json');
    }
    else{
        bootbox.alert({message:'请先选择记录',title : '提示'})
    }
}



/**
 * 获取面板值
 */
farm.getModelValue = function(){
    var obj = new Object();
    obj.partnerName = $("#partners_oprate_modal input[name='farm_partner_name']").val();    //名称
    obj.partnerPhone = $("#partners_oprate_modal input[name='farm_partner_phone']").val();  //电话
    obj.partnerAddress = $("#partners_oprate_modal input[name='farm_partner_address']").val();  //地址
    obj.partnerPassword = $("#partners_oprate_modal input[name='farm_partner_password']").val(); //密码
    obj.partnerCode = $("#partners_oprate_modal input[name='farm_partner_code']").val();        //code
    obj.partnerCreateTime = $("#partners_oprate_modal input[name='farm_partner_createTime']").val();    //创建时间
    obj.partnerUpdateTime = $("#partners_oprate_modal input[name='farm_partner_updateTime']").val();    //修改时间
    obj.partnerDes = $("#partners_oprate_modal input[name='farm_partner_des']").val();      //描述
    return obj;
}