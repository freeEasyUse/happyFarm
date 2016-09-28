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
            bootbox.alert({message:'新增合作伙伴成功',title : '提示'});
            //刷新表格
            $('#field_table').bootstrapTable('refresh',{silent: true});
        }
        else{
            bootbox.alert({message:'新增合作伙伴失败',title : '提示'});
        }
    },'json');
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