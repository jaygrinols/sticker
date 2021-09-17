import React from 'react';
import Paper from '@material-ui/core/Paper';

function Product(props) {
    return (
        <div style={{cursor: "pointer"}} onClick={() => {alert("Hi!!!")}}>
            <Paper elevation={0} style={{display: 'inline-block'}}>
                <img src={props.src} style={{width: "100%", minWidth: "100px"}}></img>
                <p style={{paddingLeft: "0%", color: "#c7a2c4", fontSize: "100%", textAlign: "left"}}><h4>{props.name}</h4><div style={{lineHeight: "0%"}}><br/></div>{props.price}</p>
            </Paper>
        </div>
    );
}
export default Product;