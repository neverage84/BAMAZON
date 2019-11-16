//Require necessary modules

var mysql = require("mysql");
var inquirer = require("inquirer");

//Connect to sql database
var db = mysql.createConnection({
 host: "localhost",

 port: 3306,

 user: "root",

 password: "123456789",
 database: "bamazon_db"
});

//Run Menu Options upon loading
 MenuOptions();


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

    //handle each selection from menu
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

//List all products available
function ViewProducts(){
    db.connect(function(err) {
        if (err) throw err;
        console.log("Selecting and Displaying all products...\n");
        db.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
       
        var ItemArr = [];
        for (var i = 0; i < res.length; i++){
            ItemArr.push(res[i]);
            console.log("ITEM: " + res[i].item_id + " | PRODUCT: " + res[i].product_name + " | DEPARTMENT: " + res[i].department_name + " | PRICE: " + res[i].price + " | QUANTITY IN STOCK: " + res[i].stock_quantity);
        }
       
        // Log all results of the SELECT statement
    db.end(); 
        
    })
    
    
    });

}

function LowInventory(){
    db.connect(function(err){
        if (err) throw err;
        db.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
            if (err) throw err;
            console.log(res);
        })
    db.end();
    })
}