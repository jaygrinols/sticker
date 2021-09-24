import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box'
import Carousel from 'react-material-ui-carousel' //https://www.npmjs.com/package/react-material-ui-carousel
import { NavLink } from 'react-router-dom';

function Home() { //IMPLEMENT TITLE BAR BELOW IMAGE DEMO material ui // SLIDE SHOW FOR FEATURED INSTEAD OF IMAGELIST
    return (
      <div id='home'>
        <br/>
        <Box sx={{ width: "100%", marginLeft: 'auto', marginRight: 'auto', position:'relative'}} >
          <Carousel animation="fade" autoplay={true} stopAutoPlayOnHover={false} interval={7000} navButtonsAlwaysInvisible={true}>
            <NavLink to="/shop"><img alt="" style={{width:"90%"}} src="BannerHome1.jpeg"/></NavLink>
            <NavLink to="/shop"><img alt="" style={{width:"90%"}} src="BannerHome2.png"/></NavLink>
          </Carousel>
        </Box>
      </div>
    );
}

export default Home;