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

function MenuOptions(){
    inquirer
    .prompt([
    {
            type: "rawlist",
            message: "Which task would you like to run?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "Task"
    }
    ])
    .then(function(Response) {
        switch(Response.Task){
            case "View Products for Sale":
            ViewProducts();
            break;

            case "View Low Inventory":
            LowInventory();
            break;

            case "Add to Inventory":
            AddInv();
            break;

            case "Add New Product":
            NewProd();
            break;
        }

    })

   
}
