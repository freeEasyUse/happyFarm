/**
 * 商家用户管理
 */
farm.businessUser = {};


/**
 * 初始化组件 
 * 下拉选择框 时间组件等
 */
farm.businessUser.initComment = function(){

}




farm.businessUser.initTable = function(tableId){
    var settingParam = new Object();
    settingParam.url = '/businessUser';
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

});


farm.businessUser.openAddModel = function(){
     $('#businessUserManager_oprate_modal').modal('show');
}