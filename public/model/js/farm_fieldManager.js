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