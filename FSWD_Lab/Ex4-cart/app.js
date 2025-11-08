const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

const items = [
  { dish: "Pizza", price: 200 },
  { dish: "Burger", price: 100 },
  { dish: "Pasta", price: 150 },
  { dish: "Briyani", price: 250 }
];

let cart = [];

app.get("/", (req,res)=>{
  res.render("index",{items});
});

app.post("/", (req,res)=>{
  const dish = req.body.dish;
  const qty = Number(req.body.quantity);
  const item = items.find(i => i.dish === dish);
  if(item){
    cart.push({dish, qty, price: item.price});
  }
  res.redirect("/cart");
});

app.get("/cart", (req,res)=>{
  res.render("cart",{cart});
});

app.listen(3000, ()=> console.log("Running on http://localhost:3000"));
