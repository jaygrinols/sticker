/*
Created by: 
Jay Grinols (UW Seattle, Computer Science)
https://pasgals.com
Description: 
Top level of application defining routes to home page, shop page, product page, about page, cart page...
*/
/* 
Additional features I would like to work on when I have time...
// TODO: Form to get notified when shipping becomes available
// TODO: Maybe add a stepper for a more fleshed out checkout page: https://mui.com/components/steppers/
// TODO: Set proper image in image preview for imessage, discord, etc. https://stackoverflow.com/questions/60641101/react-thumbnail-preview-when-posting-sharing-links-of-url
// TODO: Having some form of product IDs instead of referencing the name directly, not a very scalable approach. Probably will switch this when migrating to a database.
*/

import React from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import Stack from '@mui/material/Stack'
import './App.css';
import { Typography } from '@mui/material';
import { SocialIcon } from 'react-social-icons';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Shop from './Shop'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProductPage from './ProductPage';
import Cart from './Cart';
import Badge from '@mui/material/Badge';
import About from './About'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// https://stripe.com/docs/stripe-js/react#elements-provider
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Recommended to load this at the top level of your application to improve performance.

function App() {
  let rights = (<p style={{fontFamily: 'Nanum Pen Script', fontSize:"150%"}}>© 2021 pasgals co. All rights reserved. </p>);
  
  // Function to make sure cart quantity for an item doesn't go over or under required amounts
  const maxCartValue = 99;
  const minCartValue = 1;
  const validCartValue = (number) => {
    return number >= minCartValue && number <= maxCartValue;
  };

  // A fix for adding the cartItems to localstorage to persist across browser refreshes
  // https://joaoforja.com/blog/how-to-persist-state-after-a-page-refresh-in-react-using-local-storage/
  const cartItemsStored = JSON.parse(localStorage.getItem("cartItems"))
  const [cartItems, updateCartItems] = React.useState(  // cartItems: [[product: {title, filename, price, ...}, quantity], ...]
      Array.isArray(cartItemsStored) ? cartItemsStored : [] // If we have cart items in local storage, use that. Otherwise, initialize with an empty list
    );
  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems]);
  
  // Some functions to handle cart state
  // Reset the list of items in the cart
  const handleResetCart = () => { 
    updateCartItems([]);
  }
  // Add the item to the cart for the first time via the product page
  const handleAddToCart = (product, number) => {  // TODO: room for more efficiency by using sets and dictionaries, should be a relatively simple change.
    let newItemAlreadyInCart = false;
    let newCartItems = cartItems.slice();
    for (const elem of newCartItems) {
      let productNameInCart = elem[0]["title"];
      if (productNameInCart.valueOf() === product["title"].valueOf()) { // Update the current entry.
        elem[1] = number;
        updateCartItems(newCartItems);
        newItemAlreadyInCart = true;
        break;
      }
    }
    if (!newItemAlreadyInCart) {  // Add the item as a new entry if it wasn't an entry before.
      newCartItems = newCartItems.concat([[product, number]]);
      updateCartItems(newCartItems);
    }
  }
  // Increase the quantity of the item via the cart page (passed down)
  const handleIncreaseQuantity = (title) => { //name of the sticker
    let newCartItems = cartItems.slice();
    for (let i = 0; i < newCartItems.length; i++) {
      let elem = newCartItems[i];
      if (elem[0].title.valueOf() === title.valueOf()) {
        if (validCartValue(elem[1]+1)) {
          elem[1]++;
          newCartItems[i] = elem;
          updateCartItems(newCartItems);
        }
        break;
      }
    }
  };
  // Decrease the quantity of the item via the cart page (passed down)
  const handleDecreaseQuantity = (title) => {
    let newCartItems = cartItems.slice();
    for (let i = 0; i < newCartItems.length; i++) {
      let elem = newCartItems[i];
      if (elem[0].title.valueOf() === title.valueOf()) {
        if (validCartValue(elem[1]-1)) {
          elem[1]--;
          newCartItems[i] = elem;
          updateCartItems(newCartItems);
        }
        break;
      } 
    }
  };
  // Remove the item from the cart via the cart page
  const handleRemoveFromCart = (title) => {
    let newCartItems = cartItems.slice();
    for (let i = 0; i < newCartItems.length; i++) {
      let elem = newCartItems[i];
      if (elem[0].title.valueOf() === title.valueOf()) {
        newCartItems.splice(i, 1);
        updateCartItems(newCartItems);
        break;
      }
    }
  };

  // Create routes for each of the product's pages
  let productObjects = require("./productdata.json")["stickers"];
  let productPageRoutes = productObjects.map((elem) => {
    return (
      <Route exact path={"/" + elem.title} key={elem.title + "Route"}>
        <ProductPage product={elem} handleAddToCart={handleAddToCart} validCartValue={validCartValue}/>
      </Route>
      );
  });

  return (
    <Router>
    <div className="App">
      <header>
        <img alt="" src="Banner_Logo.png" style={{position: "relative", width: "70%", margin: "auto"}}/>
          <NavLink to="/cart"><Badge color="secondary" badgeContent={cartItems.length} style={{position: "absolute", top: "3%", right: "3%", color: "#c7a2c4"}}><ShoppingBasketIcon/></Badge></NavLink>
          <Toolbar style={{borderTop: "5px solid #f6ddf3", borderBottom: "5px solid #f6ddf3", width: "70%", margin: "auto"}}>
            <Stack direction="row" style={{margin: "auto", color: "gray", textDecoration: "none", display: "inline-block", fontFamily: 'Nanum Pen Script'}} spacing={5}>
              <NavLink to="/"><Typography variant="h4" style={{color: "gray", textDecoration: "none", display: "inline-block", fontFamily: 'Nanum Pen Script'}}>home</Typography></NavLink>
              <NavLink to="/shop"><Typography variant="h4" style={{color: "gray", textDecoration: "none", display: "inline-block", fontFamily: 'Nanum Pen Script'}}>shop</Typography></NavLink>
              <NavLink to="/about"><Typography variant="h4" style={{color: "gray", textDecoration: "none", display: "inline-block", fontFamily: 'Nanum Pen Script'}}>about</Typography></NavLink>
            </Stack>
          </Toolbar>
      </header>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/shop">
            <Shop/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/cart">
              <Elements stripe={stripePromise}>
                <Cart cartItems={cartItems} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} handleRemoveFromCart={handleRemoveFromCart} handleResetCart={handleResetCart}/>
              </Elements>
          </Route>
          {productPageRoutes}
        </Switch>
      <div>
        <img alt="" src="Logo1.png" style={{position: "fixed", left: "2%", bottom: "3%", width: "12%", minWidth: "90px"}}/>
        <SocialIcon url="https://www.instagram.com/pasgals.co/" style={{position: "fixed", right:"2%", bottom:"3%"}} network="instagram" />
      </div>
      <footer>
        <br/>
        <br/>
        <br/>
        <br/>
        {rights}
      </footer>
    </div>
    </Router>
  );
}

export default App;
