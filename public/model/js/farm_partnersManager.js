farm.partnersManager = {};

farm.partnersManager.setTable = function(){
    console.log("#farm_partnersManager_table");
    var data = [
        [
            "Tiger Nixon",
            "System Architect",
            "Edinburgh",
            "5421",
            "2011/04/25",
            "$3,120"
        ],
        [
            "Garrett Winters",
            "Director",
            "Edinburgh",
            "8422",
            "2011/07/25",
            "$5,300"
        ]
    ];

    $("#farm_partnersManager_table").DataTable();
};

//加载完成后 执行
$(document).ready(function() {
    farm.partnersManager.setTable();
});

