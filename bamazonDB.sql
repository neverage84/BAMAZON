DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
 item_id INTEGER(11) AUTO_INCREMENT,
 product_name VARCHAR(30),
 department_name VARCHAR(50),
 price FLOAT(10,2),
 stock_quantity INTEGER(11)
);