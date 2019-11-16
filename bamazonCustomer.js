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
    buyItem(Response.ID, Response.Quantity);
})


function readitems() {
    db.connect(function(err) {
        if (err) throw err;
        console.log("Selecting and Displaying all products...\n");
        db.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        
       
        
        console.log(res);
        
        
       
        // Log all results of the SELECT statement
        
        
    })
    
    
    });

}

function buyItem(ItemID, ItemQuantity){

    
  
    db.query("SELECT * FROM products WHERE ?", 
    {
        item_id: ItemID
    }, 
    function(err,res){
        if (err) throw err;

        if (res[0].stock_quantity < ItemQuantity) {
            console.log("Insufficient quantity!");
        }
        else {
            var NewQuantity = res[0].stock_quantity - ItemQuantity;
            var TotalCost = parseFloat(ItemQuantity * res[0].price).toFixed(2);
            db.query("UPDATE products SET ? WHERE ?",
            [
              {
                  stock_quantity: NewQuantity
              } ,
              {
                item_id: ItemID
              } 
            ],
            function(err, res){
                if (err) throw err;

                console.log(res.affectedRows + " product updated!\n");
                console.log("Total Cost is $" + TotalCost);
            }
           
            )
           
        }
        
        
   db.end();   
}
);



}


   