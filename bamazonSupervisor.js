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
SupervisorMenuOptions();

function SupervisorMenuOptions(){
    inquirer
    .prompt([
        {
            type: "rawlist",
            message: "Which task would you like to do?",
            choices:["View Product Sales by Department", "Create New Department"],
            name: "SupervisorMenu"
        }
    ])
    .then(function(Response){
    //     const table = cTable.getTable(res);
    //    console.log(table);
    switch (Response.SupervisorMenu){
        case "View Product Sales by Department":
        ViewProductSales();
        break;

        case "Create New Department":
        NewDepartment();
        break;
    }
    })
}

function ViewProductSales(){
    db.connect(function(err){
        if (err) throw err;
        console.log("Selecting and Displaying Product Sales by Department...");


        db.end();
    })
}