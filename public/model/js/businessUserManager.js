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