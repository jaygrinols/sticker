import React from 'react';
import "./App.css";

function About() {
    return (
        <div style={{fontFamily: "Klee One", paddingLeft: "5%", paddingRight:"5%"}}>
            <div style={{fontSize: "140%"}}>
                <p> Hello and Welcome to our sticker company! </p>
                <p> We are so excited to have you here! </p>
            </div>
            <img alt="" src="about.png" style={{width: "65%"}}/>
            <p> Who We Are </p>
            <p>Our small business is based out of the University of Puget Sound in Tacoma, WA. The three of us are all senior-year chem/biochem majors, who started this company as a creative outlet outside of lab! Although none of us have art backgrounds, we quickly realized that heart outweighs experience and (most things) are done collaboratively.</p>
            <p>How We Chose the Name</p>
            <p>As we love chemistry and biochemistry, we sometimes have the tendency to get sidetracked in class, especially while taking thermodynamics virtually during the pandemic... this is actually how our company received its name. While discussing something to do with pressure in class, one of us made a joke about the units all being types of people. We had the bar bros, the psi guys, and finally, the pascal gals (or pasgals for short).</p>
            <p>FAQ (in the same pink purple color)
Who can purchase stickers? (In pink purple color)
(In grey) At the moment only members of the University of Puget Sound campus community with a campus mailbox can purchase our stickers. We are looking into opening up our business to members outside of the campus community in the near future. Stay tuned!

When will I get my order? (In the pink purple color)
(In grey) We restock and ship on Mondays, Wednesdays, and Thursdays and ship through the campus mail service. Times will depend on campus mail room staff but you should get your stickers within a few business days! We will post new shipping time estimates here as we learn more. 

Can we request new sticker designs? (In the pink purple)
(In grey) We will have a request for you to submit sticker ideas/requests and if we like it, we may choose it! If your design gets chosen we will give you a free sticker of your design!</p>
        </div>
    );
}

export default About;