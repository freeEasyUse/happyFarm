farm.partnersManager = {};

farm.partnersManager.setTable = function(){
    $("#farm_partnersManager_table").DataTable();
};

//加载完成后 执行
$(document).ready(function() {
    farm.partnersManager.setTable();
});

