import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import CartItem from './CartItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { NavLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
//TODO FOR PAYMENTS:
//full payment code: 
//https://stripe.com/docs/payments/integration-builder
//https://sweetcode.io/deploying-express-node-js-backend-heroku/
//https://blog.back4app.com/free-backend-app-hosting/
//create a payment intent when pressing "checkout" button from cart? (not in backdrop)
//request Full Name, phone number, email, mailbox number, card info


function Cart(props) {
    //TODO: persist cartitems and total price?? 
    //https://joaoforja.com/blog/how-to-persist-state-after-a-page-refresh-in-react-using-local-storage/
    //TODO: add stripe checkout on backdrop, keep loading then when stripe loads bring up credit card element with a material ui transition
    const handleIncreaseQuantity = (title) => {
        props.handleIncreaseQuantity(title);
    }
    const handleDecreaseQuantity = (title) => {
        props.handleDecreaseQuantity(title);
    }
    const handleRemoveFromCart = (title) => {
        props.handleRemoveFromCart(title);
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    const cartItemsMapped = props.cartItems.map((elem) => {   // elem is [product, quantity]
        return (
                <CartItem product={elem[0]} quantity={elem[1]} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} handleRemoveFromCart={handleRemoveFromCart}/>
        );
    });

    const checkoutButton = () => {
        if (props.cartItems.length === 0) {
            return (
                <LoadingButton disabled style={{backgroundColor: "grey", color: 'white'}} endIcon={<ArrowForwardIosIcon/>}>Check-out</LoadingButton>
            );
        }
        else {
            return (
                <LoadingButton onClick={handleToggle} disabled={false} style={{backgroundColor: "pink", color: 'white'}} endIcon={<ArrowForwardIosIcon/>}>Check-out</LoadingButton>
            );
        }
    }

    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();
      
        const handleSubmit = async (event) => {
          // Block native form submission.
          event.preventDefault();
      
          if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
      
          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.
          const cardElement = elements.getElement(CardElement);
      
          // Use your card Element with other Stripe.js APIs
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });
      
          if (error) {
            console.log('[error]', error);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
          }
        };

        if (!stripe || !elements) {
            return ((<CircularProgress color="inherit" />));
        }
        else {
            return (
                <form onSubmit={handleSubmit}>
                  <CardElement />
                  <button type="submit" disabled={!stripe}>
                    Pay
                  </button>
                </form>
              );
        }
      };
      

    return (
        <div>
            <h1 style={{fontFamily: 'Nanum Pen Script', fontSize: "300%", paddingTop: "0px", paddingBottom: "0px"}}>check-out</h1>
            <h3 style={{fontFamily: 'klee one', fontSize: "125%", color: "red"}}>NOTE: We are currently only accepting school mailbox orders from University of Puget Sound students. If you would like to request on-campus pickup, shoot us a DM on instagram. <br/>Sorry for the inconvenience! </h3>
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
            {cartItemsMapped}
            <h2 style={{fontFamily: 'klee one', fontSize: "125%"}}>Total: ${props.cartItemsTotalPrice.toFixed(2)}</h2>
            <Grid container direction="row">
                <Grid item xs={4}>
                    <NavLink to="shop" style={{textDecoration: "none"}}><Button style={{backgroundColor: "pink", color: 'white'}} startIcon={<ArrowBackIosIcon/>}>Continue shopping</Button></NavLink>
                </Grid>
                <Grid item xs={4}>
                    
                </Grid>
                <Grid item xs={4}>
                    {checkoutButton()}
                </Grid>
            </Grid>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                <IconButton style={{color: "white", position: "absolute", right: "0.5%", top: "0.5%"}} onClick={handleClose}>
                    <CloseIcon size="large"/>
                </IconButton>
                <div style={{minWidth: "300px", width: "25%", backgroundColor: "#6772e5", color: "#fff", padding: "10px"}}>
                    <CheckoutForm></CheckoutForm>
                </div>
            </Backdrop>
        </div>
    );
}
export default Cart;