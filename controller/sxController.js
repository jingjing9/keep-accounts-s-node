var sxModel=require('./../model/sxModel.js');
var sxController={
    login:function (req,res) {
        var user_name = req.query.user_name;
        sxModel.login1(user_name,function(err,data){
            if(err){
                console.log('查询login1数据库报错');
            }else{
                res.send({'num': data[0].num})
            }
        })
    },
    login2:function (req,res) {
        var user_name = req.query.user_name;
        sxModel.login2(user_name,function(err,data){
            if(err){
                console.log('插入数据库login2报错');
            }else{
                res.send({msg:'登录成功'})
            }
        })
    },
    writeone:function (req,res) {
        var user_name = req.query.user_name;
        var bill_sync = req.query.bill_sync;
        var bill_icon = req.query.bill_icon;
        var bill_word = req.query.bill_word;
        var bill_year = req.query.bill_year;
        var bill_month = req.query.bill_month;
        var bill_day = req.query.bill_day;
        var bill_money = req.query.bill_money;
        var bill_week = req.query.bill_week;
        var bill_detail = req.query.bill_detail;
        sxModel.writeone(user_name,bill_sync,bill_icon,bill_word,bill_year,bill_month,bill_day,bill_money,bill_week,bill_detail,function(err,data){
            if(err){
                console.log('插入数据库writeone报错');
            }else{
                console.log('插入数据库writeone成功');
                res.send({msg:'插入数据writeone成功'})
            }
        })
    },
    showdetail:function (req,res) {
        var user_name = req.query.user_name;
        var bill_year = req.query.bill_year;
        var bill_month = req.query.bill_month;
        sxModel.showdetail(user_name,bill_year,bill_month,function(err,data){
            if(err){
                console.log('查询showdetail数据库报错');
            }else{
                res.send({arr: data})
            }
        })
    },
    getyeardata:function (req,res) {
        var user_name = req.body.user_name;
        var bill_year = req.body.bill_year;
          sxModel.getyeardata(user_name,bill_year,function(err,data){
              if(err){
                  console.log('查询getyeardata数据库报错');
              }else{
                  console.log(data);
                  res.send({arr: data})
              }
          })
    },
    getmonthdata:function (req,res) {
        var user_name = req.body.user_name;
        var bill_year = req.body.bill_year;
        var bill_month = req.body.bill_month;
        sxModel.getmonthdata(user_name,bill_year,bill_month,function(err,data){
            if(err){
                console.log('查询getyeardata数据库报错');
            }else{
                console.log(data);
                res.send({arr: data})
            }
        })
    }


};

module.exports=sxController;