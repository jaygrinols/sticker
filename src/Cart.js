/*
Created by: 
Jay Grinols (UW Seattle, Computer Science)
https://pasgals.com
Description: 
Page that contains cart features. Checkout is implemented in this file, and is accessed from the cart page.
*/

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
import CheckIcon from '@material-ui/icons/Check';
import Zoom from '@mui/material/Zoom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
//full payment code: 
//https://stripe.com/docs/payments/integration-builder
//create a payment intent when pressing "checkout" button from cart? (not in backdrop)
//request Full Name, phone number, email, mailbox number, card info

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "white",
      lineHeight: "20px",
      color: "grey",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "rgb(192, 192, 192)"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

/* 
Props: 
cartItems -> Current items in cart, format of object: [[product: {title, filename, price, ...}, quantity], ...]
handleIncreaseQuantity() -> Passed down function to increase the current quantity of the item in cart (further passed down to CartItem)
handleDecreaseQuantity() -> Passed down function to decrease the current quantity of the item in cart (further passed down to CartItem)
handleRemoveFromCart() -> Passed down function to entirely remove an item in cart (further passed down to CartItem)
handleResetCart() -> Passed down function to clear out the cart
*/

function Cart(props) {
  const stripe = useStripe();
  const elements = useElements();

  // TODO: Refactor, these wrapped function definitions are redundant, as they are only used inside of the child component CartItem.----------
  const handleIncreaseQuantity = (title) => {
      props.handleIncreaseQuantity(title);
  }
  const handleDecreaseQuantity = (title) => {
      props.handleDecreaseQuantity(title);
  }
  const handleRemoveFromCart = (title) => {
      props.handleRemoveFromCart(title);
  }
  // TODO: Refactor, these wrapped function definitions are redundant, as they are only used inside of the child component CartItem.----------

  const [open, setOpen] = React.useState(false);  // Represents whether the checkout page is open or not (since it's a "popup" on a backdrop)
  const handleClose = () => {
    setOpen(false);
    //TODO: Clear cart if payment was successful (payment state 2)
    //setPaymentState(0);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const cartItemsMapped = props.cartItems.map((elem) => {   // elem = [product: {title, filename, price, ...}, quantity]
      return (
        <CartItem product={elem[0]} quantity={elem[1]} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} handleRemoveFromCart={handleRemoveFromCart}/>
      );
  });

  const calculateProductPrice = (elem) => { // elem = [product: {title, filename, price, ...}, quantity]
    let priceString = elem[0].price;
    let price = elem[1] * Number(priceString.replace(/[^0-9.-]+/g,""));
    return price; // Price in USD decimal (for example 3.5 = $3.50)
  };    
  const calculatePriceOfCart = (cartItems) => {
    let price = 0.0;
    for (const elem of cartItems) {
      price += calculateProductPrice(elem);
    }
    price = Math.round(price * 100)/100; // Round to two decimal places.
    return price; // Price in USD decimal (for example 3.5 = $3.50)
  }

    //UI STUFF ------------------------------------------------------------------------------------
    /*
    var orderComplete = function() {
        setPaymentState(2);
      };
      // Show the customer the error from Stripe if their card fails to charge
      var showError = function() {
        setPaymentState(3);
      };
      // Show a spinner on payment submission
      var loading = function() {
        setPaymentState(1);
      };*/
    //UI STUFF END --------------------------------------------------------------------------------

  const checkoutButton = () => {
      if (props.cartItems.length === 0) { // Gray out button and make unclickable if there's nothing to check out
          return (
              <LoadingButton disabled style={{backgroundColor: "grey", color: 'white'}} endIcon={<ArrowForwardIosIcon/>}>Check-out</LoadingButton>
          );
      }
      else {  // Normal checkout button function
          return (
              <LoadingButton onClick={handleOpen} disabled={false} style={{backgroundColor: "pink", color: 'white'}} endIcon={<ArrowForwardIosIcon/>}>Check-out</LoadingButton>
          );
      }
  }

  const handleSubmit = async (event, setPaymentState, form) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    
    let [name, email, phone, mailbox] = form;
    console.log(name, email, phone, mailbox);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
        email: email,
        phone: phone
      }
    });

    if (error) {
      console.log('[error]', error);
      setPaymentState(3);
      return;
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    let purchaseArray = [];
    for (let i = 0; i < props.cartItems.length; i++) {
      let quantity = props.cartItems[i][1];
      let title = props.cartItems[i][0].title;
      purchaseArray.push([title, quantity])
    }

    let purchase = {"items": purchaseArray};
    let fetchPromise;
    try {
      fetchPromise = fetch("https://pasgals.com/api", { // For general use
      //fetchPromise = fetch("http://localhost:80/api", {    // For local hosting
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(purchase)
      })
    }
    catch(e) {
      setPaymentState(4); // Something major (maybe the server is down)
      return;
    }
    fetchPromise.then(function(result) {
        return result.json();
      })
    .then(async function(data) {
        payWithCard(stripe, cardElement, data.clientSecret, setPaymentState, paymentMethod, mailbox, name, email);
    });

  };

  async function payWithCard(stripe, card, clientSecret, setPaymentState, paymentMethod, mailbox, name, email) {
    let mypromise = stripe
    .confirmCardPayment(clientSecret, {payment_method: paymentMethod.id, shipping: {
      name: name,
      address: {line1: mailbox},
    },
    receipt_email: email
    });

    mypromise.then(async (result) => {
      if (result.error) {
        setPaymentState(3);
        console.log(result.error);
      }
      else {
        setPaymentState(2);
        setTimeout(function() {
          handleClose();
          props.handleResetCart();
        }, 2000)
      }
    })
  };
    /*
      const [billingDetails, setBillingDetails] = React.useState({
        email: "",
        phone: "",
        name: "",
        mailboxNumber: ""
      });        
    */

  const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange,
    disabled
  }) => (
    <div className="FormRow">
      <label htmlFor={id} className="FormRowLabel">
        {label}
      </label>
      <input
        className="FormRowInput"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );

  const SubmitButton = ({ processing, disabled, text, paymentState} ) => {
    if (paymentState === 3) {
      return <div><Button type="submit" disabled={processing || disabled} style={{backgroundColor: "#8886D2", color: "red", marginBottom:"10px"}}>{text}</Button></div>
    }
    else {
      let newText = text + " $" + calculatePriceOfCart(props.cartItems).toFixed(2);
      return <div><Button type="submit" disabled={processing || disabled} style={{backgroundColor: "#8886D2", color: "white", marginBottom:"10px"}}>{newText}</Button></div>
    }
  }
      
  const CheckoutForm = () => {
    // payment states are: 0 untouched, 1 loading payment after submission, 2 payment success, 3 payment failure and option to retry
    const [paymentState, setPaymentState] = React.useState(0);
    const [name, onNameChange] = React.useState("");
    const [email, onEmailChange] = React.useState("");
    const [phone, onPhoneChange] = React.useState("");
    const [mailbox, onMailboxChange] = React.useState("");

    async function handleOnClick(e) {
      setPaymentState(1);
      handleSubmit(e, setPaymentState, [name, email, phone, mailbox]);
    }
    
    // Keep track of states of each field unrelated to credit card
    const onNameChangeH = (event) => {
      onNameChange(event.target.value);
    }
    const onEmailChangeH = (event) => {
      onEmailChange(event.target.value);
    }
    const onPhoneChangeH = (event) => {
      onPhoneChange(event.target.value);
    }
    const onMailboxChangeH = (event) => {
      onMailboxChange(event.target.value);
    }

    if (!stripe || !elements) {
        return (<CircularProgress color="inherit" />);
    }
    else {
      return (
        <form className="Form" onSubmit={handleOnClick}>
          <div>
          </div>
          <fieldset className="FormGroup">
            <Field label="Name" required={true} placeholder="First Last" onChange={onNameChangeH} disabled={paymentState===1 || paymentState===2}></Field>
            <Field label="Email" type="email" required={true} placeholder="pasgalsco@gmail.com" onChange={onEmailChangeH} disabled={paymentState===1 || paymentState===2}></Field>
            <Field label="Phone" type="tel" required={true} placeholder="(000)-000-0000" onChange={onPhoneChangeH} disabled={paymentState===1 || paymentState===2}></Field>
            <Field label="Mailbox" required={true} placeholder="0000" onChange={onMailboxChangeH} disabled={paymentState===1 || paymentState===2}></Field>
            <div style={{padding: "10px"}}>
            <CardElement options={CARD_OPTIONS}/>
            </div>
            {
              paymentState===0 ? <SubmitButton processing={paymentState===1} disabled={!stripe} text="pay" paymentState={paymentState}></SubmitButton> :
              paymentState===1 ? <p><CircularProgress color="inherit" /></p> :
              paymentState===2 ? <Zoom in={true}><CheckIcon size="large" style={{color: "#90ee90"}}/></Zoom> :
              paymentState===3 ? <SubmitButton processing={paymentState===1} disabled={!stripe} text="retry" paymentState={paymentState}></SubmitButton> :
              paymentState===4 ? <p> Server is down, try again later </p> : null
            }
          </fieldset>
        </form>
      );
    }
  };
      

  return (
      <div>
          <h1 style={{fontFamily: 'Nanum Pen Script', fontSize: "300%", paddingTop: "0px", paddingBottom: "0px"}}>check-out</h1>
          <h3 style={{fontFamily: 'klee one', fontSize: "125%", color: "red", padding:"0px 5px 0px 5px"}}>NOTE: We are currently only accepting school mailbox orders from University of Puget Sound students. If you would like to request on-campus pickup, shoot us a DM on instagram. <br/>Sorry for the inconvenience! </h3>
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
          <h2 style={{fontFamily: 'klee one', fontSize: "125%"}}>Total: ${calculatePriceOfCart(props.cartItems).toFixed(2)}</h2>
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
              <div style={{minWidth: "300px", width: "25%", backgroundColor: "#c7a2c4", color: "#fff", padding: "20px", borderRadius:"5px"}}>
                  <CheckoutForm>
                  </CheckoutForm>
                  <img alt="" src="poweredbystripe.png" style={{width: "45%"}}/>                                
              </div>
          </Backdrop>
      </div>
  );
}
export default Cart;
