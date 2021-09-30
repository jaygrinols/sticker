import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box'
import Carousel from 'react-material-ui-carousel' //https://www.npmjs.com/package/react-material-ui-carousel
import { NavLink } from 'react-router-dom';

//Potentially contribute to the carousel project? 
//https://github.com/Learus/react-material-ui-carousel/issues/88
//https://stackoverflow.com/questions/42615556/how-to-preload-images-in-react-js

function Home(props) { //IMPLEMENT TITLE BAR BELOW IMAGE DEMO material ui // SLIDE SHOW FOR FEATURED INSTEAD OF IMAGELIST
  let items = require("./productdata.json")["stickers"];

  //WARNING: CHOOSE A RANDOM NAME FOR HOMEPAGE BANNER: THIS WILL BE DEPRECATED IN THE FUTURE WHEN DIRECTORY STRUCTURE IS CHANGED
  //SAME WARNING: CHOOSE A RANDOM HALLOWEEN NAME
  //TODO: implement random halloween name
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