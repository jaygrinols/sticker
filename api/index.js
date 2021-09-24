const express = require('express')
const app = express()
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

app.use(express.static("public"));
app.use(express.json());

const productsObj = require("./productdata.json")["stickers"];
let products = {};
for (let element of productsObj) {
  products[element.title] = element.price;
}

const calculateProductPrice = (elem) => { // [title, quantity]  //return price in cents
  let priceString = products[elem[0]];
  let price = elem[1] * Number(priceString.replace(/[^0-9.-]+/g,"")) * 100;
  return price;
};

// IMPORTANT TODO: Add checks to front end request to make sure quantities and names are fine 
// potential problem? negative quantities to reduce price (above 50 cents but still)
// probably can use tools to tamper with https requests
const calculateOrderAmount = items => { //items = [[title, quantity]] 
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    // Calculate the price in CENTS
    let price = 0;

    for (let element of items) {
      console.log(element);
      price += calculateProductPrice(element);
    }
    console.log(price);
    return price;
};  
//https://stackoverflow.com/questions/18642828/origin-origin-is-not-allowed-by-access-control-allow-origin/18643011#18643011
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x
//https://github.com/tyler-johnson/stripe-meteor/issues/37

var allowCrossDomain = function(req, res, next) {   // TODO: PROPERLY SETUP THIS HOSTING
    res.header('Access-Control-Allow-Origin', "*"); //SET IT TO JUST THE MAIN DOMAIN...SUCH AS https://sticker-i96g5lkxd-jaygrinols.vercel.app
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
   app.use(allowCrossDomain);
}

const itemsDescription = (items) => {
    let descriptionArr = [];
    for (let element of items) {
        let [name, quantity] = element;
        let itemstr = name + " x" + quantity;
        descriptionArr.push(itemstr);
    }
    return descriptionArr.join(', ');
}
//items is of format [[productname, quantity]]
app.post("/api", async (req, res) => {
    //SET IT TO JUST THE MAIN DOMAIN...SUCH AS https://sticker-i96g5lkxd-jaygrinols.vercel.app

    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      description: itemsDescription(items)
    });
    res.send({
        clientSecret: paymentIntent.client_secret
      });
});

module.exports = app;
//app.listen(4242, () => console.log('Node server listening on port: ' + process.env.PORT));
