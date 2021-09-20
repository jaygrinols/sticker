import React from 'react';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel' //https://www.npmjs.com/package/react-material-ui-carousel



// Props: elem: sticker data object
//TODO: ADD a carousel, figure out how to not show arrows when only one item... might have to render the image without the carousel if only one image for the sticker
// TODO: two images in the carousel, fix it when we have multiple items, still need to map images into carousel
function ProductPage(props) {
    const [cartValue, updateCartValue] = React.useState(1); //NOTE: This is just the cart value when choosing how much to add to cart, not the actual current overall cart value
    const maxCartValue = 99;
    const minCartValue = 1;

    const validCartValue = (number) => {
        return number >= minCartValue && number <= maxCartValue;
    };

    const handleIncreaseCartValue = () => {
        if (validCartValue(cartValue+1)) {
            updateCartValue(cartValue+1);
        }
    }
    const handleDecreaseCartValue = () => {
        if (validCartValue(cartValue-1)) {
            updateCartValue(cartValue-1);
        }
    }

    const handleAddToCart = () => {
        props.handleAddToCart(props.product, cartValue);
    }

    //TODO verify if the product page actually exists? Not necessary, but create an error page in App.js for bad routes
        return (
            <Grid container direction="row" style={{margin: "auto", height: "100%", width: "100%", position: "relative", zIndex: 0, top: 0, overflowX: "hidden", paddingTop: "20px"}}>
                <Grid item style={{backgroundColor: "white", float: "left", width: "50%"}} lg={6} xs={12}>
                        <img src={props.product.filename} style={{paddingLeft: "2%", paddingRight: "2%", paddingTop: "5%", paddingBottom: "5%", maxWidth: "90%"}}/>                    
                </Grid>
                <Grid item style={{display: "block", backgroundColor: "white", float: "right", width: "50%", fontFamily: 'Nanum Pen Script', paddingTop: "5%", paddingBottom: "5%", fontSize: "200%", paddingLeft: "5%", paddingRight: "5%"}} lg={6} xs={12}>
                    <h1 style={{textAlign: "left"}}>{props.product.title}</h1>
                    <h3 style={{fontFamily: "klee one", fontSize:"75%", textAlign: "left"}}>{props.product.price}</h3>
                    <p style={{fontFamily: "klee one", fontSize:"75%", textAlign: "left"}}>
                        <b>about: </b><span>{props.product.about}</span>
                    </p>
                    <p style={{fontFamily: "klee one", fontSize:"75%", textAlign: "left"}}>
                        <b>dimensions: </b>{props.product.dimensions}
                    </p>
                    <p style={{fontFamily: "klee one", fontSize:"75%", textAlign: "left"}}>
                        <b>material: </b>printed on vinyl sticker paper, laminated, glossy finish and water resistant.
                    </p>
                    <div style={{display: "inline-block", paddingTop: "5%"}}>
                        <ButtonGroup>
                        <IconButton onClick={handleDecreaseCartValue} style={{height:"41px", color: "#c7a2c4"}}>
                            <RemoveIcon/>
                        </IconButton>
                        <TextField value={cartValue} size="small" style={{width:"50px"}}/>
                        <IconButton onClick={handleIncreaseCartValue} style={{height:"41px", color: "#c7a2c4"}}>
                            <AddIcon/>
                        </IconButton>
                        <NavLink to="/cart" style={{textDecoration: "none"}}><Button style={{verticalAlign: "middle", height: "38px", backgroundColor: "#c7a2c4", color: "white"}} variant="contained" onClick={handleAddToCart}>Add to cart</Button></NavLink>
                        </ButtonGroup>
                        <br/>
                    </div>
                </Grid>
            </Grid>
        );
}
export default ProductPage;