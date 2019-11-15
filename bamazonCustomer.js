var inquirer = require("inquirer");

var mysql = require("mysql");
var db = mysql.createConnection({
    host: "127.0.0.1",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "123456789",
    database: "bamazon_db"
});

readitems();

inquirer
.prompt([
    {
        type: "input",
        message: "What is the id number for the product you would like to buy?",
        name: "ID"

    },
    {
        type: "input",
        message: "How many units of the product would you like to buy?",
        name: "Quantity"
    }

])
.then(function(Response) {
    
})


function readitems() {
    console.log("Selecting and Displaying all products...\n");
    db.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var Items = [];
        Items.push(res);
       
        // Log all results of the SELECT statement
        console.log(res);
        console.log(Items);
        db.end();
    });

}
