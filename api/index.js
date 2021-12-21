/*
Created by: 
Jay Grinols (UW Seattle, Computer Science)
https://pasgals.com
Description: 
Backend that handles validating purchases and processing the payment.
*/

const express = require('express')
const app = express()
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);
app.use(express.static("public"));
app.use(express.json());

const productsObj = require("./productdata.json")["stickers"]; // Unfortunately not letting me pull directly from the productdata.json file in /src. Haven't figured out a fix for that.
let products = {};  // Map of product names -> price string (example: "$3.50")
for (let element of productsObj) {
  products[element.title] = element.price;
}

// Function that returns product price in cents
const calculateProductPrice = (elem) => { // elem = [title, quantity]
  let priceString = products[elem[0]];
  let price = elem[1] * Number(priceString.replace(/[^0-9.-]+/g,"")) * 100;
  return price;
};

// Function to validate purchase request
const maxCartQuantity = 99;
const minCartQuantity = 1;
const validateItems = (items) => { // items = [[titleA, quantityA], ...]
    if (items.length == 0) {    // Can't make a no item purchase
        return false;
    }
    const titles = new Set(); // Set to check for duplicate items. (for example, avoids problem of having [titleA, 99] twice, resulting in a 198 total quantity of titleA)
    for (let element of items) {
        titles.add(element[0].normalize()); // Add to set for duplicate check
        if ( !(element[1] <= maxCartQuantity && element[1] >= minCartQuantity)) { // Check whether quantity of item is valid.
            return false;
        }

        let titlesData = Object.keys(products); // TODO: Can be optimized by keeping this as a set outside of this function.
        let existsInData = false;
        for (let title of titlesData) { // Checks that title is a real product. 
            if (title.valueOf() === element[0].valueOf()) {
                existsInData = true;
            }
        }
        if (!existsInData) {
            return false;
        }
    }
    if (titles.size != items.length) {
        return false;    // Check for duplicate types of items
    }
    return true;
}

// Function to calculate the total amount to send to Stripe (in cents)
const calculateOrderAmount = items => { //items = [[titleA, quantityA], ...]
    // Calculate the order total on the backend to prevent people from manipulating the amount on the frontend client
    let price = 0;

    for (let element of items) {
      price += calculateProductPrice(element);
    }
    return price;
};  

// Function to create an "order string" for the stripe dashboard. (to make orders readable on the dashboard for the sticker creators)
const itemsDescription = (items) => { //items = [[titleA, quantityA], ...]
    let descriptionArr = [];
    for (let element of items) {
        let [name, quantity] = element;
        let itemstr = name + " x" + quantity;
        descriptionArr.push(itemstr);
    }
    return descriptionArr.join(', ');
}

app.post("/api", async (req, res) => {
    const { items } = req.body;
    if (!validateItems(items)) {
        res.status(400).send({
            message: "items not valid"
        })
    }
    else {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            description: itemsDescription(items)
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        });  
    }
});

// Some Vercel settings... --------------------------------------------------------------------------------------------------------------------
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
   app.use(allowCrossDomain);
}
module.exports = app;   // for vercel serverless functions
// Some Vercel settings... --------------------------------------------------------------------------------------------------------------------

// To use as a normal express app: 
//app.listen(80, () => console.log('Node server listening on port: ' + 80));
