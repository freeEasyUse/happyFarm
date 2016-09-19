farm.loginAndOut = {};


/**
 * 登录控制
 */
farm.loginAndOut.login = function() {
	console.log('login');
    var loginForm = $("#loginAndOut_loginForm");
    //输入不能为空
    var inputs = loginForm.find("input[class='form-control']");
    for (var i = 0; i < inputs.length; i++) {
    var value = inputs[i].value;
    if (value == '') {
        $.gritter.add({
            title : '提示',
            text : input[i].placeholder + "不能为空！",
            class_name : 'gritter-error gritter-center  gritter-light'
        });
        return;
        }
    }
    //ajax 请求 进行登录验证
    var username = inputs[0].value;
    var password = inputs[1].value;
	var options = {
        url : '/loginAndOut/login',
        type : 'post',
        data:{
            'username':username,
            'password':password
        },
		success : function(data) {
			console.log(data);
			var data = JSON.parse(data);
			if (data.status != "ERROR") {
                window.location.href = "/home";
                /**
				var user = data.message;
				var historyUser = $.cookie(ump.userCookie);
				if (!historyUser)
					$.cookie(ump.userCookie, null);
				$.cookie(ump.userCookie, JSON.stringify(user));
				if(document.getElementById("login-remember").checked){
					$.cookie("ump_username", username,{expires:7});
				}
                 */
			}else{
				$.gritter.add({
					title : '提示',
					text : data.reason,
					class_name : 'gritter-error gritter-center  gritter-light'
				});
			}
		},
		error : function(data) {
			$.gritter.add({
				title : '提示',
				text : data,
				class_name : 'gritter-error gritter-center  gritter-light'
			});
		}
	};
	$.ajax(options);
};


$(document).ready(function() {

	/**
	 *  添加回车登录
	 */
	$(document).keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        farm.loginAndOut.login();
			return false;
	    }
	});
});