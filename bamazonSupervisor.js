//Require necessary modules

var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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
        console.log("Selecting and Displaying Product Sales by Department...\n");
        db.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales), SUM(products.product_sales) - departments.over_head_costs AS 'total_profit' FROM departments JOIN products ON (departments.department_name = products.department_name) GROUP BY departments.department_name, departments.department_id",
        function(err,res){
            if (err) throw err;
            const table = cTable.getTable(res);
            console.log(table);
        }
        )

        db.end();
    })
}

function NewDepartment(){
    inquirer
    .prompt([
        {
            type: "input",
            message: "Department Name",
            name:"DPN"
        },
        {
            type:"input",
            message:"What are the Overhead Costs?",
            name:"Overhead"
        }
    ])
    .then(function(Response){
        db.connect(function(err){
            if (err) throw err;
            db.query("INSERT INTO departments SET ?",
            {
                department_name: Response.DPN,
                over_head_costs: Response.Overhead
            },
            function(err,res){
                if (err) throw err;
                console.log (res.affectedRows +  "department Added");
            }
            )
        })
    })
}