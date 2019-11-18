DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

ALTER TABLE products
DROP product_sales
ADD product_sales FLOAT(10,2) DEFAULT 0;

CREATE TABLE products(
 item_id INTEGER(11) AUTO_INCREMENT,
 product_name VARCHAR(30),
 department_name VARCHAR(50),
 price FLOAT(10,2),
 stock_quantity INTEGER(11),
 PRIMARY KEY (item_id)
);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Razor", "Bathroom Products", 10.50, 30);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Bathrobe", "Bathroom Products", 45.99, 25);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Earbuds", "Electronics", 6.99, 50);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 399, 21);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Running Shoes", "Fitness", 149, 10);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 4.99, 30);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Clothing", 19.50, 75);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("T-shirt", "Clothing", 15.75, 5);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Lysol", "Cleaning Products", 9.99, 35);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Dishsoap", "Cleaning Products", 5.50, 80);

INSERT INTO products( product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels", "Cleaning Products", 7.75, 15);

CREATE TABLE departments(
department_id INTEGER(11) AUTO_INCREMENT,
department_name VARCHAR(50),
over_head_costs INTEGER(11),
PRIMARY KEY (department_id)
);

