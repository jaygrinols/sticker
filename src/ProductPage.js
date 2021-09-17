import React from 'react';
import Grid from '@mui/material/Grid';
// Props: elem: sticker data object

function ProductPage(props) {
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
                </Grid>
            </Grid>
        );
}
export default ProductPage;