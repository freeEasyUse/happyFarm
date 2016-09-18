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
});

