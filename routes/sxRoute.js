//引入
var express=require('express');
var sxController=require('./../controller/sxController.js');

//定义的模块
var myRouter=express.Router();
myRouter.route('/login').get(sxController.login);
myRouter.route('/login2').get(sxController.login2);
myRouter.route('/writeone').get(sxController.writeone);
myRouter.route('/showdetail').get(sxController.showdetail);
myRouter.route('/getyeardata').post(sxController.getyeardata);
myRouter.route('/getmonthdata').post(sxController.getmonthdata);
//导出模块
module.exports=myRouter;