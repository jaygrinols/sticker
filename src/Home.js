/*
Created by: 
Jay Grinols (UW Seattle, Computer Science)
https://pasgals.com
Description: 
Landing page.
*/

import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box'
import Carousel from 'react-material-ui-carousel' // Community made component: https://www.npmjs.com/package/react-material-ui-carousel
import { NavLink } from 'react-router-dom';

// Would like to contribute to the Carousel in the future, to preload images in the carousel.
// https://github.com/Learus/react-material-ui-carousel/issues/88
// https://stackoverflow.com/questions/42615556/how-to-preload-images-in-react-js

/* 
Props: N/A
*/

function Home(props) { // Currently contains two banner advertisements on the home page in the carousel.
  let items = require("./productdata.json")["stickers"];

  // Takes user to a random dinosaur sticker product page when clicking on the dinosaur ad, and a random halloween sticker product page when clicking on the halloween ad
  let dinosaurNames = []; 
  let halloweenNames = [];
  for (let product of items) {
    if (product.filename.startsWith("/products/productwatermark/dinosaurs")) {
      dinosaurNames.push("/" + product.title);
    }
    else if (product.filename.startsWith("/products/productwatermark/halloween")) {
      halloweenNames.push("/" + product.title);
    }
  }
  let randomDinosaurIndex = Math.floor(dinosaurNames.length * Math.random());
  let randomDinosaurName = dinosaurNames[randomDinosaurIndex];
  let randomHalloweenIndex = Math.floor(halloweenNames.length * Math.random());
  let randomHalloweenName = halloweenNames[randomHalloweenIndex];

    return (
      <div id='home'>
        <br/>
        <Box sx={{ width: "100%", marginLeft: 'auto', marginRight: 'auto', position:'relative'}} >
          <Carousel animation="fade" autoplay={true} stopAutoPlayOnHover={false} interval={7000} navButtonsAlwaysInvisible={true}>
            <NavLink to={randomHalloweenName}><img alt="" style={{width:"80%"}} src="BannerHome1.jpeg"/></NavLink>
            <NavLink to={randomDinosaurName}><img alt="" style={{width:"80%"}} src="BannerHome2.png"/></NavLink>
          </Carousel>
        </Box>
      </div>
    );
}
export default Home;
