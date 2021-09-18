import React from 'react';
import Button from "@material-ui/core/Button";

function Cart(props) {
    let cartItemsString = JSON.stringify(props.cartItems);

    return (
        <div>
            <p> Cart: {cartItemsString} </p>
            <Button style={{backgroundColor: "pink", color: 'white'}}>Checkout</Button>
        </div>
    );
}
export default Cart;