import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import CartItem from './CartItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Cart(props) {
    let cartItemsString = JSON.stringify(props.cartItems);

    //TODO: Grey out checkout button if no items in cart
    //TODO: persist state of cart? 
    //https://joaoforja.com/blog/how-to-persist-state-after-a-page-refresh-in-react-using-local-storage/
    //TODO: Add removing from cart functionality
    //TODO: map CartItems with each product from props.cartItems
    return (
        <div>
            <h1 style={{fontFamily: 'Nanum Pen Script', fontSize: "300%", paddingTop: "0px", paddingBottom: "0px"}}>check-out</h1>
            <Grid container style={{backgroundColor: "white", fontFamily: 'Nanum Pen Script', fontSize: "180%", margin: "auto", fontWeight: "bold", textDecoration: "underline"}} direction="row">
                <Grid item xs={4}>
                    <p>Sticker</p>
                </Grid>
                <Grid item xs={2}>
                    <p>Price</p>
                </Grid>
                <Grid item xs={6}>
                    <p>Quantity</p>
                </Grid>
            </Grid>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <p> Cart: {cartItemsString} </p>
            <Button style={{backgroundColor: "pink", color: 'white'}} startIcon={<ArrowBackIosIcon/>}>Continue shopping</Button>
            <Button style={{backgroundColor: "pink", color: 'white'}} endIcon={<ArrowForwardIosIcon/>}>Checkout</Button>
        </div>
    );
}
export default Cart;