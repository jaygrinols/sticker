import React from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import Stack from '@mui/material/Stack'
import './App.css';
import { Typography } from '@mui/material';
import Box from '@material-ui/core/Box'
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

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


// TODO: Add footer so that it's possible to scroll the bottom icons to the very bottom
// TODO: maybe add a stepper for checkout: https://mui.com/components/steppers/
// TODO: badge for cart in corner: https://mui.com/components/badges/
// TODO: IMAGE PREVIEW FOR IMESSAGE DISCORD ETC
// https://stackoverflow.com/questions/60641101/react-thumbnail-preview-when-posting-sharing-links-of-url
function App() {
  let rights = (<p style={{fontFamily: 'Nanum Pen Script', fontSize:"150%"}}>© 2021 pasgals co. All rights reserved. </p>);
  const maxCartValue = 99;
  const minCartValue = 1;

  //make sure cart quantity for an item doesn't go over or under required amounts
  const validCartValue = (number) => {  //warning: defined somewhere else as well TODO cleanup helper functions
    return number >= minCartValue && number <= maxCartValue;
  };

  const cartItemsStored = JSON.parse(localStorage.getItem("cartItems"))

  const [cartItems, updateCartItems] = React.useState(
      Array.isArray(cartItemsStored) ? cartItemsStored : []
    );

  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems]);
  const handleResetCart = () => {
    updateCartItems([]);
  }
  const handleAddToCart = (product, number) => {
    let newItemAlreadyInCart = false;
    let newCartItems = cartItems.slice();
    for (const elem of newCartItems) {
      let productNameInCart = elem[0]["title"];
      if (productNameInCart.valueOf() === product["title"].valueOf()) {
        elem[1] = number;
        updateCartItems(newCartItems);
        newItemAlreadyInCart = true;
        break;
      }
    }
    if (!newItemAlreadyInCart) {
      newCartItems = newCartItems.concat([[product, number]]);
      updateCartItems(newCartItems);
    }
  }
  const handleIncreaseQuantity = (title) => { //name of the sticker
    console.log("is the increase running")
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

  // Define routes for each of the product's pages
  let productObjects = require("./productdata.json")["stickers"];
  let productRoutes = productObjects.map((elem) => {
    return (
      <Route exact path={"/" + elem.title} key={elem.title + "Route"}>
        <ProductPage product={elem} handleAddToCart={handleAddToCart} validCartValue={validCartValue}/>
      </Route>
      );
  });

  return (
    <Router>
    <div className="App">
      <div className="hello">
        <header>
        <img alt="" src="Banner_Logo.png" style={{position: "relative", width: "70%", margin: "auto"}}/>
          <NavLink to="/cart" style={{position: "absolute", top: "3%", right: "3%", color: "#c7a2c4"}}><Badge color="secondary" badgeContent={cartItems.length}><ShoppingBasketIcon/></Badge></NavLink>
          <Toolbar style={{borderTop: "5px solid #f6ddf3", borderBottom: "5px solid #f6ddf3", width: "70%", margin: "auto"}}>
            <Stack direction="row" style={{margin: "auto", maxWidth: "100%"}} spacing={5}>
            <NavLink to="/" style={{color: "gray", textDecoration: "none", display: "inline-block"}}><Typography variant="h4" style={{fontFamily: 'Nanum Pen Script'}}>home</Typography></NavLink>
            <NavLink to="/shop" style={{color: "gray", textDecoration: "none", display: "inline-block"}}><Typography variant="h4" style={{fontFamily: 'Nanum Pen Script'}}>shop</Typography></NavLink>
            <NavLink to="/about" style={{color: "gray", textDecoration: "none", display: "inline-block"}}><Typography variant="h4" style={{fontFamily: 'Nanum Pen Script'}}>about</Typography></NavLink>
            </Stack>
          </Toolbar>
        </header>
      </div>
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
        {productRoutes}
        </Switch>      
      <div className='bottom'>
      <Box>
      <img alt="" src="Logo1.png" style={{position: "fixed", left: "2%", bottom: "3%", width: "12%", minWidth: "90px"}}/>
      <SocialIcon url="https://www.instagram.com/pasgals.co/" style={{position: "fixed", right:"2%", bottom:"3%"}} network="instagram" />
      </Box>
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
