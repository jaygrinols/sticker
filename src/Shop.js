import React from 'react';
import Product from './Product';
import Grid from '@material-ui/core/Grid';

function Shop() {
    //let items = require("../public/products/individual/productdata.json")["stickers"];
    //console.log(items);
    // TODO: fix mobile vs desktop sizing for product images
    return (
        <div>
            <p>
                Shop under construction...
            </p>
            <Grid container spacing={3} style={{maxWidth: "80%", margin: "auto"}}>
                <Grid item lg={3} xs={6}>
                <Product src="./products/individual/img/IMG_2402.JPG" name="Sample Sticker asdf asdf " price="$5.99"/>
                </Grid>
                <Grid item lg={3} xs={6}>
                <Product src="./products/individual/img/IMG_2403.JPG" name="Sample Sticker" price="$5.99"/>
                </Grid>
                <Grid item lg={3} xs={6}>
                <Product src="./products/individual/img/IMG_2404.JPG" name="Sample Sticker" price="$5.99"/>
                </Grid>
                <Grid item lg={3} xs={6}>
                <Product src="./products/individual/img/IMG_2405.JPG" name="Sample Sticker" price="$5.99"/>
                </Grid>
                <Grid item lg={3} xs={6}>
                <Product src="./products/individual/img/IMG_2406.JPG" name="Sample Sticker" price="$5.99"/>
                </Grid>
            </Grid>
            
        </div>
    );
}

export default Shop;