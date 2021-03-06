/**
 * Created by 91275 on 2018/11/12.
 */
var express = require('express');//引入express框架
var favicon = require('serve-favicon');//引入图标框架
var morgan = require('morgan');//引入日志模块
var bodyParser = require('body-parser');//引入post请求的模块
var ejs = require('ejs');
var app=express();//搭建服务
app.use(morgan('dev'));//配日志
//配置静态文件访问地址 方法一
app.use(express.static(__dirname+'/public')); //两个下划线dirname绝对路径
app.use(favicon(__dirname+'/public/favicon.ico'));//配置图标地址
//使用post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//配置视图路径
app.set('views',__dirname+'/view');
//配置html格式为模板引擎
app.engine('html',ejs.__express);
//设置模板引擎的类型
app.set('view engine','html');
//设置允许跨域请求
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','X-Requested-With');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By','3.2.1');
    res.header('Content-Type','application/json;charset=utf-8');
    next();
});

//使用自定义模块
var  srout = require('./routes/sxRoute');
app.use(srout);
app.listen(1223,function () {  //配置端口号
    console.log('项目启动')
});