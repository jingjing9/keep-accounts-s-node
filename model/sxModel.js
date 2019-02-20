var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'jizhangbao'
});
var sxModel={
    login1:function (user_name,fn) {
        var sql=`SELECT COUNT(*) AS num FROM t_users WHERE user_name = '${user_name}'`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    login2:function (user_name,fn) {
        var sql=`INSERT INTO t_users VALUES(NULL,'${user_name}')`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    writeone:function (user_name,bill_sync,bill_icon,bill_word,bill_year,bill_month,bill_day,bill_money,bill_week,bill_detail,fn) {
        var sql=`INSERT INTO t_bill VALUES(NULL,'${user_name}',${bill_year},${bill_month},${bill_day},${bill_sync},'${bill_icon}','${bill_word}',${bill_money},'${bill_week}','${bill_detail}')`;
        console.log(sql)
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    showdetail:function (user_name,bill_year,bill_month,fn) {
        var sql=`SELECT * FROM t_bill WHERE user_name = '${user_name}' && bill_year = ${bill_year} && bill_month = ${bill_month} ORDER BY bill_detail`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getyeardata:function (user_name,bill_year,fn) {
        var sql=`SELECT bill_money,bill_sync,bill_month FROM t_bill WHERE user_name = '${user_name}' && bill_year = ${bill_year} ORDER BY bill_month`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getmonthdata:function (user_name,bill_year,bill_month,fn) {
        var sql=`SELECT bill_money,bill_sync,bill_month,bill_icon,bill_word FROM t_bill WHERE user_name = '${user_name}' && bill_year = ${bill_year} && bill_month = ${bill_month}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }

};
module.exports=sxModel;