import React from 'react';
import Product from './Product';
import Grid from '@material-ui/core/Grid';

function Shop(props) {
    let items = require("./productdata.json")["stickers"]; //TODO: ADD UNIQUE KEYS AFFECTS PERFORMANCE
    const listItems = items.map((item, index) => {
        return (
        <Grid item md={3} xs={6} key={index} style={{padding:"2%"}}>
            <div style={{height: "100%"}}>
                <Product src={item.filename} name={item.title} price={item.price}/>
            </div>
        </Grid>)
    });
    return (
        <div>
            <br/>
            <Grid container spacing={3} style={{maxWidth: "80%", margin: "auto"}}>
                {listItems}
            </Grid>
        </div>
    );
}

export default Shop;