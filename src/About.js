/*
Created by: 
Jay Grinols (UW Seattle, Computer Science)
https://pasgals.com
Description: 
Page that talks about the creators and information about the business.
*/

import React from 'react';
import "./App.css";
import Paper from '@material-ui/core/Paper';
function About() {
    return (
        <div style={{fontFamily: "Klee One", paddingLeft: "5%", paddingRight:"5%"}}>
            <div style={{fontSize: "200%", fontFamily: "Nanum Pen Script"}}>
                <p style={{fontWeight: "bold"}}> Hello and Welcome to our sticker company! </p>
                <p> We are so excited to have you here! </p>
            </div>
            <Paper elevation={0} style={{width: "85%", margin: "auto"}}>
                <img alt="" src="about.png" style={{width: "100%"}}/>
                <div style={{textAlign: "left", paddingLeft: "8.5%", paddingTop: "0%", marginTop: "0%", width: "84.5%", wordWrap: "break-word", hyphens: "auto"}}><span style={{color: "#c7a2c4", fontWeight: "bold"}}>Figure 1: </span><span>A couple of friends who never leave the science building. The pasgals, from left to right, May, Bella, Diana.</span></div>
            </Paper>
            <div style={{textAlign: "left"}}>
                <p style={{color: "#c7a2c4", fontWeight: "bold", fontSize: "180%", fontFamily: "Nanum Pen Script"}}> Who We Are </p>
                <p>Our small business is based out of the University of Puget Sound in Tacoma, WA. The three of us are all senior-year chem/biochem majors, who started this company as a creative outlet outside of lab! Although none of us have art backgrounds, we quickly realized that heart outweighs experience and (most things) are done collaboratively.</p>
                <p style={{color: "#c7a2c4", fontWeight: "bold", fontSize: "180%", fontFamily: "Nanum Pen Script"}}>How We Chose the Name</p>
                <p>As we love chemistry and biochemistry, we sometimes have the tendency to get sidetracked in class, especially while taking thermodynamics virtually during the pandemic... this is actually how our company received its name. While discussing something to do with pressure in class, one of us made a joke about the units all being types of people. We had the bar bros, the psi guys, and finally, the pascal gals (or pasgals for short).</p>
                <div>
                    <p style={{color: "#c7a2c4", fontWeight: "bold", fontSize: "220%", fontFamily: "Nanum Pen Script"}}>FAQ</p>
                    <p style={{color: "#c7a2c4", fontWeight: "bold"}}>Who can purchase stickers?</p>
                    <p style={{color: "gray"}}>At the moment only members of the University of Puget Sound campus community with a campus mailbox can purchase our stickers. We are looking into opening up our business to members outside of the campus community in the near future. Stay tuned!</p>
                    <p style={{color: "#c7a2c4", fontWeight: "bold"}}>When will I get my order?</p>
                    <p style={{color: "gray"}}>We restock and ship on Mondays, Wednesdays, and Thursdays and ship through the campus mail service. Times will depend on campus mail room staff but you should get your stickers within a few business days! We will post new shipping time estimates here as we learn more. </p>
                    <p style={{color: "#c7a2c4", fontWeight: "bold"}}>Can we request new sticker designs?</p>
                    <p style={{color: "gray"}}>We will have a request form for you to submit sticker ideas/requests and if we like it, we may choose it! If your design gets chosen we will give you some free stickers of your design!</p>
                    <br/>
                </div>
            </div>
        </div>
    );
}
export default About;
