import React from 'react';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// Props: elem: sticker data object
//TODO: e still allowed in input (exponential)

function ProductPage(props) {
    const [cartValue, updateCartValue] = React.useState(1);
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

    //TODO verify if the product page actually exists? Not necessary, but create an error page in App.js for bad routes
        return (
            <Grid container direction="row" style={{margin: "auto", height: "100%", width: "100%", position: "relative", zIndex: 0, top: 0, overflowX: "hidden", paddingTop: "20px"}}>
                <Grid item style={{backgroundColor: "white", float: "left", width: "50%"}} lg={6} xs={12}>
                    <img src={props.product.filename} style={{paddingLeft: "2%", paddingRight: "2%", paddingTop: "5%", paddingBottom: "5%", maxWidth: "90%"}}/>
                </Grid>
                <Grid item style={{backgroundColor: "white", float: "right", width: "50%", fontFamily: 'Nanum Pen Script', paddingTop: "10%", fontSize: "200%"}} lg={6} xs={12}>
                    <h1>{props.product.title}</h1>
                    <h3>{props.product.price}</h3>
                    <p>
                        Description: {props.product.about}
                    </p>
                    <div style={{display: "inline-block"}}>
                        <ButtonGroup>
                        <Button onClick={handleDecreaseCartValue}>
                            -
                        </Button>
                        <TextField value={cartValue} size="small" style={{width:"50px"}}/>
                        <Button onClick={handleIncreaseCartValue}>
                            +
                        </Button>
                        <Button style={{verticalAlign: "middle", height: "38px", backgroundColor: "pink"}} variant="contained" color="success">Add to cart</Button>
                        </ButtonGroup>
                        <br/>
                    </div>
                </Grid>
            </Grid>
        );
}
export default ProductPage;