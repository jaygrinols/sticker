/*
Created by: 
Jay Grinols (UW Seattle, Computer Science)
https://pasgals.com
Description: 
Blueprint for a cart page item to be used within the cart page.
*/

import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import { NavLink } from 'react-router-dom';

/* 
Props: 
product -> Object representing one product containing fields {title: (sticker name), filename: (path to image), price: (USD string), about: (description), dimensions: (physical sticker dimensions)}
quantity -> Quantity of this product as a number
handleIncreaseQuantity() -> Passed down function to increase the current quantity of the item in cart
handleDecreaseQuantity() -> Passed down function to decrease the current quantity of the item in cart
handleRemoveFromCart() -> Passed down function to entirely remove an item in cart
*/

function CartItem(props) {  
    const handleIncreaseQuantity = () => {
        props.handleIncreaseQuantity(props.product.title);
    };
    const handleDecreaseQuantity = () => {
        props.handleDecreaseQuantity(props.product.title);
    };
    const handleRemoveFromCart = () => {
        props.handleRemoveFromCart(props.product.title);
    };
    return (
        <div style={{backgroundColor: "white"}}>
            <Grid container direction="row">
                <Grid item xs={4} style={{display: "flex", alignItems: "center", justifyContent: "center", fontFamily: 'Nanum Pen Script', fontSize: "125%"}}>
                    <NavLink to={props.product.title}><img alt="" src={props.product.filename} style={{minWidth: "40%", width: "40%"}}></img></NavLink>
                </Grid>
                <Grid item xs={2} style={{display: "flex", alignItems: "center", justifyContent: "center", fontFamily: 'Nanum Pen Script', fontSize: "125%"}}>
                    <p style={{fontFamily: "klee one", fontSize:"90%"}}>{props.product.price}</p>
                </Grid>
                <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <TextField size="small" style={{width:"50px"}} value={props.quantity}/>
                    <ButtonGroup orientation="vertical">
                        <IconButton size="small" onClick={handleIncreaseQuantity}>
                            <AddIcon style={{width:"50%", maxWidth: "50px", color: "#c7a2c4"}}/>
                        </IconButton>
                        <IconButton size="small" onClick={handleDecreaseQuantity}>
                            <RemoveIcon style={{width:"50%", maxWidth: "50px", color: "#c7a2c4"}}/>
                        </IconButton>
                    </ButtonGroup>
                    <IconButton onClick={handleRemoveFromCart}>
                        <DeleteIcon style={{color: "#c7a2c4"}}/>
                    </IconButton>
                </Grid>
            </Grid>
            <hr style={{width: "90%", border: "none", backgroundColor: "pink", height: "3px"}}/>
        </div>
    );
}
export default CartItem;
