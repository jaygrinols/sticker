/*
Created by: 
Jay Grinols (UW Seattle, Computer Science)
https://pasgals.com
Description:
Blueprint for thumbnail components displayed in the shop page.
*/

import React from 'react';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom'
import './App.css'

// Props: elem:sticker data object  
/* 
Props: 
src -> String of path to given product image
name -> String of given product name
price -> String of given product price in USD
*/

function Product(props) {
    return (
        <NavLink to={"/" + props.name}>
            <div style={{cursor: "pointer"}}>
                <Paper elevation={0} style={{display: 'inline-block', maxWidth: "100%", height: "100%"}}>
                    <img alt="" src={props.src} style={{width: "100%", padding:"0px", margin: "0px"}}></img>
                    <span lang="en" style={{width:"100%", height:"100%",overflowWrap:"break-word", WebkitHyphens: "auto", paddingLeft: "0%", color: "#c7a2c4", fontSize: "160%", textAlign: "left", fontFamily: 'Nanum Pen Script', paddingTop: "5px", padding:"0px", margin: "0px"}}><h4 style={{padding:"0px", margin: "0px", maxWidth: "100%"}}>{props.name}</h4><h4 style={{fontFamily: "klee one", fontSize: "60%", padding:"0px", margin: "0px", textAlign: "right"}}>{props.price}</h4></span>
                </Paper>
            </div>
        </NavLink>
    );
}
export default Product;
