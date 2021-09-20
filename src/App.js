import React from 'react';
import logo from './logo.svg';
import Drawer from '@material-ui/core/Drawer'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar'
import Stack from '@mui/material/Stack'
import './App.css';
import { Typography } from '@mui/material';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@material-ui/core/Box'
import Search from './Search'
import { SocialIcon } from 'react-social-icons';
import BottomNavigation from '@mui/material/BottomNavigation';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Shop from './Shop'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProductPage from './ProductPage';
import Cart from './Cart';
import Badge from '@mui/material/Badge';


// TODO: Add footer so that it's possible to scroll the bottom icons to the very bottom
// TODO: maybe add a stepper for checkout: https://mui.com/components/steppers/
// TODO: badge for cart in corner: https://mui.com/components/badges/
function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }
  const maxCartValue = 99;
  const minCartValue = 1;

  const validCartValue = (number) => {  //warning: defined somewhere else as well TODO cleanup helper functions
    return number >= minCartValue && number <= maxCartValue;
};

const calculateProductPrice = (elem) => { // [product, quantity]
  let priceString = elem[0].price;
  let price = elem[1] * Number(priceString.replace(/[^0-9.-]+/g,""));
  return price;
};

  const [cartItems, updateCartItems] = React.useState([]); //don't forget quantity! maybe redirect back to shop after adding to cart
  const [cartItemsTotalPrice, updateCartItemsTotalPrice] = React.useState(0.0);
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
    let price = 0.0;
    for (const elem of newCartItems) {
      price += calculateProductPrice(elem);
    }
    price = Math.round(price * 100)/100;
    updateCartItemsTotalPrice(price);
  }

  const handleIncreaseQuantity = (title) => {
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
    let price = 0.0;
    for (const elem of newCartItems) {
      price += calculateProductPrice(elem);
    }
    price = Math.round(price * 100)/100;
    updateCartItemsTotalPrice(price);

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
    let price = 0.0;
    for (const elem of newCartItems) {
      price += calculateProductPrice(elem);
    }
    price = Math.round(price * 100)/100;
    updateCartItemsTotalPrice(price);
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
    let price = 0.0;
    for (const elem of newCartItems) {
      price += calculateProductPrice(elem);
    }
    price = Math.round(price * 100)/100;
    updateCartItemsTotalPrice(price);
  };

  let productObjects = require("./productdata.json")["stickers"];
  let productRoutes = productObjects.map((elem) => {
    return (
      <Route exact path={"/" + elem.title}>
      <ProductPage product={elem} handleAddToCart={handleAddToCart}/>
      </Route>
      );
  });

  let appbar = ( <AppBar class="TitleBar">
  <Toolbar>
    <IconButton class="MenuButton" variant="contained" onClick={handleDrawerOpen} onBackdropClick='true'>
      <MenuIcon fontSize='large'/>
    </IconButton>
    <Typography variant="h6" sx={{paddingLeft: "20%"}}> Sticker Shop </Typography>
    <Box sx={{paddingLeft: "10%"}}>
      <Search/>
    </Box>
  </Toolbar>
</AppBar>);
let rights = (<p style={{fontFamily: 'Nanum Pen Script', fontSize:"150%"}}>© 2021 Pasgals Co. All rights reserved. </p>);

  return (
    <Router>
    <div class="App">
      <Drawer anchor='left' open={open} onClose={handleDrawerClose}>
        <div>
          <NavLink to="/" style={{color: "black", "text-decoration": "none"}}><MenuItem onClick={handleDrawerClose}> Home </MenuItem></NavLink>
          <NavLink to="/shop" style={{color: "black", "text-decoration": "none"}}><MenuItem onClick={handleDrawerClose}> Shop </MenuItem></NavLink>
          <MenuItem> Individual Stickers </MenuItem>
          <MenuItem> Sticker Sheets </MenuItem>
          <NavLink to="/about" style={{color: "black", "text-decoration": "none"}}><MenuItem onClick={handleDrawerClose}> About </MenuItem></NavLink>
        </div>
      </Drawer>
      <div class="hello">
        <header>
        <img src="Banner_Logo.png" style={{position: "relative", width: "70%", margin: "auto"}}/>
          <NavLink to="/cart" style={{position: "absolute", top: "3%", right: "3%", color: "#c7a2c4"}}><Badge color="secondary" badgeContent={cartItems.length}><ShoppingBasketIcon/></Badge></NavLink>
          <Toolbar style={{borderTop: "5px solid #f6ddf3", borderBottom: "5px solid #f6ddf3", width: "70%", margin: "auto"}}>
            <Stack direction="row" style={{margin: "auto", maxWidth: "100%"}} spacing={5}>
            <NavLink to="/" style={{color: "gray", "text-decoration": "none", display: "inline-block"}}><Typography variant="h4" style={{fontFamily: 'Nanum Pen Script'}}>home</Typography></NavLink>
            <NavLink to="/shop" style={{color: "gray", "text-decoration": "none", display: "inline-block"}}><Typography variant="h4" style={{fontFamily: 'Nanum Pen Script'}}>shop</Typography></NavLink>
            <NavLink to="/about" style={{color: "gray", "text-decoration": "none", display: "inline-block"}}><Typography variant="h4" style={{fontFamily: 'Nanum Pen Script'}}>about</Typography></NavLink>
            </Stack>
          </Toolbar>
        </header>
      </div>
      <body>
        <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/shop">
            <Shop/>
        </Route>
        <Route exact path="/about">
            <p> About under construction </p>
            <p> TODO: FAQ, restock times, actual about info, maybe a sticker request form</p>
        </Route>
        <Route exact path="/cart">
            <p> <Cart cartItems={cartItems} cartItemsTotalPrice={cartItemsTotalPrice} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} handleRemoveFromCart={handleRemoveFromCart}/> </p>
        </Route>
        {productRoutes}
        
        </Switch>
      </body>
      
      <div class='bottom'>
      <Box container>
      <img src="logo1.png" style={{position: "fixed", left: "2%", bottom: "3%", width: "12%", minWidth: "90px"}}/>
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
