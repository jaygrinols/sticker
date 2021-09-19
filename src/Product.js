import React from 'react';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom'
import './App.css'

// Props: elem:sticker data object
function Product(props) {
    return (
        <NavLink to={"/" + props.name}>
        <div style={{cursor: "pointer"}}>
            <Paper elevation={0} style={{display: 'inline-block'}}>
                <img src={props.src} style={{width: "100%", minWidth: "100px"}}></img>
                <p style={{paddingLeft: "0%", color: "#c7a2c4", fontSize: "130%", textAlign: "left", fontFamily: 'Nanum Pen Script'}}><h4>{props.name}</h4><div style={{lineHeight: "0%"}}><br/></div>{props.price}</p>
            </Paper>
        </div>
        </NavLink>
    );
}
export default Product;