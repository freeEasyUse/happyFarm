var express = require('express');
var router = express.Router();
var common = require('../common/common');

/**
 * 用户登录
 */
router.get('/',function (req,res,next) {
  res.render('login', {title:'用户登录'});
});

/**
 * 管理人员登录
 */
router.get('/manager',function (req,res,next) {
  res.render('manager', {title:'管理人员登录'});
});






/* 主页 */
router.get('/home', function(req, res, next) {
  //判断是否登录
  //common.authentication(req,res);
  //创建左侧菜单内容
  var menus = new Array();

  //系统管理
  var s_menu = new Object();
  s_menu.showText = '系统管理';
  s_menu.isParent = true;
  var ss_menu1 = new Object();
  ss_menu1.showText = '环境初始化';
  ss_menu1.url = 'model/envirement.html';
  ss_menu1.menuCode = "1";
  ss_isParent = false;

  var ss_menu2 = new Object();
  ss_menu2.showText = '合作商管理';
  ss_menu2.menuCode = "2";
  ss_menu2.url = 'model/partnersManager.html';
  ss_menu2.isParent = false;

  s_menu.children = [ss_menu1,ss_menu2];


  //商家管理
  var j_menu = new Object();
  j_menu.showText = '商家管理';
  j_menu.isParent = true;
  var jj_menu1 = new Object();
  jj_menu1.showText = '地块管理';
  jj_menu1.menuCode = '3';
  jj_menu1.url = 'model/fieldManager.html';
  jj_menu1.isParent = false;

  var jj_menu2 = new Object();
  jj_menu2.menuCode = '4';
  jj_menu2.showText = '统计';
  jj_menu2.url = 'model/envirement.html';
  jj_menu2.isParent = false;

  j_menu.children = [jj_menu2,jj_menu1];


  //用户目录
  var u_menu = new Object();
  u_menu.showText = '用户管理';
  u_menu.isParent = true;
  var uu_menu1 = new Object();
  uu_menu1.showText = '我的信息';
  uu_menu1.url = 'model/envirement.html';
  uu_menu1.menuCode = "5";
  uu_menu1.isParent = false;

  var uu_menu2 = new Object();
  uu_menu2.showText = '在线查看';
  uu_menu2.url = 'model/envirement.html';
  uu_menu2.isParent = false;
  uu_menu2.menuCode = "6";

  u_menu.children = [uu_menu1,uu_menu2];

  menus.push(u_menu);
  menus.push(j_menu);
  menus.push(s_menu);

  var result = new Object();
  result.title = 'happFarm';
  result.menus = menus;
  result.userName = 'yekai';
  console.log(result);
  res.render('index', result);
});

module.exports = router;
