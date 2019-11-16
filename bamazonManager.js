var mysql = require("mysql");
var inquirer = require("inquirer");

var db = mysql.createConnection({
 host: "localhost",

 port: 3306,

 user: "root",

 password: "123456789",
 database: "bamazon_db"
});

db.connect(function(err){
    if (err) throw err;
    MenuOptions();
})