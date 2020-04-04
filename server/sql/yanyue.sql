-- 创建数据库yanyue,并且设置编码utf8
create DATABASE IF NOT EXISTS yanyue DEFAULT CHARACTER SET 'UTF8';

-- 使用数据库
use yanyue;

-- 新建用户user表
create TABLE IF NOT EXISTS `user`(
    `id` INT UNSIGNED AUTO_INCREMENT KEY COMMENT '用户id',
    `username` VARCHAR(20) NOT NULL UNIQUE COMMENT '用户名',
    `password` CHAR(32) NOT NULL COMMENT '密码',
    `roles` VARCHAR(20) NOT NULL UNIQUE COMMENT '权限角色',
    `email` VARCHAR(50)  UNIQUE COMMENT '邮箱',
    `age` TINYINT  COMMENT '年龄',
    `card` CHAR(18)  UNIQUE COMMENT '身份证号',
    `tel` CHAR(11) UNIQUE COMMENT '电话',
    `address` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '地址',
    `sex` ENUM('男','女','保密') NOT NULL DEFAULT '保密' COMMENT '性别'
) ENGINE=INNODB CHARSET=UTF8;


-- 查看表结构
DESC user;

insert user (id,username,password,roles,email,age,card,tel,address,sex)
values(1,'yanyue','123456','admin','1874524491@qq.com',26,'320882199505270238','15720826383','南京','男');

-- 删除表
DROP TABLE IF EXISTS user;


