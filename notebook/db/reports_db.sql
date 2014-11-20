--
-- Скрипт сгенерирован Devart dbForge Studio for MySQL, Версия 6.2.280.0
-- Домашняя страница продукта: http://www.devart.com/ru/dbforge/mysql/studio
-- Дата скрипта: 17.11.2014 11:49:19
-- Версия сервера: 5.6.21-log
-- Версия клиента: 4.1
--


USE reports;

CREATE TABLE sells (
  id int(11) NOT NULL AUTO_INCREMENT,
  state varchar(50) DEFAULT NULL,
  income decimal(10, 0) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 53
AVG_ROW_LENGTH = 315
CHARACTER SET utf8
COLLATE utf8_general_ci;