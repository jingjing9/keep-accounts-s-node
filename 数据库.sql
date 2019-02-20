
CREATE DATABASE jizhangbao;
USE jizhangbao;

CREATE TABLE t_users(
user_id INT PRIMARY KEY AUTO_INCREMENT,
user_name VARCHAR(100)
);
INSERT INTO t_users VALUES(1,"微笑是我");
DROP TABLE t_bill;

CREATE TABLE t_bill(
	bill_id INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(100),
	bill_year INT,
	bill_month INT,
	bill_day INT,
	bill_sync INT,
	bill_icon VARCHAR(50),
	bill_word VARCHAR(600),
	bill_money NUMERIC(10,2),
	bill_week VARCHAR(25),
	bill_detail DATE
);

INSERT INTO t_bill VALUES(1,'微笑是我',2019,05,25,0,'fa fa-gift','买衣服',56.00,'星期二','2019-01-30');

