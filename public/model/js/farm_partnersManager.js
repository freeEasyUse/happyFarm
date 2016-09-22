farm.partnersManager = {};


farm.partnersManager.initTable = function(tableId){
    var settingParam = new Object();
    settingParam.url = '/partners';
    settingParam.columns = [
    {
        field: 'id',
        title: 'Item ID',
    }, {
        field: 'name',
        title: 'Item Name'
    }, {
        field: 'price',
        title: 'Item Price'
    }];
    settingParam.toolbar = '#parteners_toolbar';

    //调用公用方法
    farm.initTable('#parteners_table',settingParam);

};


//加载完成后 执行
$(document).ready(function() {
    farm.partnersManager.initTable('#parteners_table');
    //设置时间
    $("#partners_oprate_modal input[name='farm_partner_createTime']").datetimepicker({
        format: 'yyyy-mm-dd hh:ii', language: 'zh-CN'
    });

    $("#partners_oprate_modal input[name='farm_partner_updateTime']").datetimepicker({
        format: 'yyyy-mm-dd hh:ii', language: 'zh-CN'
    });

});

//打开模态框 新增
farm.partnersManager.openAddModel = function(){
    $('#partners_oprate_modal').modal('show');
};

//打开模态框 修改
farm.partnersManager.updatePartner = function(){
    //打开模态框
    farm.partnersManager.openAddModel();
    //获取当前选择的表格记录
    var select_rows = $('#parteners_table').bootstrapTable('getSelections');
    console.log(select_rows);

}

//新增合作伙伴
farm.partnersManager.addPartner = function(){
    $.post('/partners/addPartner');
}


