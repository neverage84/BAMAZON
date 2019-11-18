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
       
        
        for (var i = 0; i < res.length; i++){
           
            console.log("ITEM: " + res[i].item_id + " | PRODUCT: " + res[i].product_name + " | DEPARTMENT: " + res[i].department_name + " | PRICE: " + res[i].price + " | QUANTITY IN STOCK: " + res[i].stock_quantity + " | PRODUCT SALES: " + res[i].product_sales);
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

function AddInv(){

    inquirer
   .prompt([
       {
           type: "input",
           message: "For which product would you like to increase inventory (Provide ID#)",
           name: "Add"
       },
       {
           type: "input",
           message:"What quantity are you adding?",
           name: "AddQuantity"

       }
   ])
   .then(function(Response){
        UpdateItem(Response.Add, Response.AddQuantity);
 
   });
    
  




   function UpdateItem(IDnumber, QuantityAdded){
     db.connect(function(err){
    if (err) throw err;
        if (err) throw err;
        db.query("SELECT * FROM products WHERE ?",
        {
            item_id: IDnumber
        },
        function(err,res){
            if (err) throw err;
            var NewQuantity = parseInt(res[0].stock_quantity) + parseInt(QuantityAdded);
            db.query("UPDATE products SET ? WHERE ?",
            [
                {
                  stock_quantity: NewQuantity
                 },
                 {
                item_id: IDnumber
                 }
            ],
            function(err,res){
                if (err) throw err;
                console.log(res.affectedRows + " product update!\n");
                console.log("New Quantity is " + NewQuantity + " units.");
            })
db.end();
        })    

    })


   }
       };
      
    //prompt from user for new product
   function NewProd(){
       inquirer
       .prompt([
           {
               type: "input",
               message: "Product Name?",
               name: "Product"
           },
           {
              type: "input",
              message: "Department Name?",
              name: "Department"
           },
           {
               type: "input",
               message: "Sales Price?",
               name: "Price"
           },
           {
               type:"input",
               message: "Quantity?",
               name: "Quantity"
           }
       ])
       .then(function(Response){
           addNewRow(Response.Product, Response.Department, Response.Price, Response.Quantity);
       })
   }
   
   //function to add row
   function addNewRow(product, department, price, quantity){
       db.connect(function(err){
           if (err) throw err;
        db.query("INSERT INTO products SET ?",
        {
            product_name: product,
            department_name: department,
            price: price,
            stock_quantity: quantity
        },
        function(err,res){
            if (err) throw err;
            console.log(res.affectedRows + " product added!\n");
        }
        )
        db.end();
       })
   }
 



