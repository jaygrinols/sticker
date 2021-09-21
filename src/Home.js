import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box'
import Carousel from 'react-material-ui-carousel' //https://www.npmjs.com/package/react-material-ui-carousel

function Home() { //IMPLEMENT TITLE BAR BELOW IMAGE DEMO material ui // SLIDE SHOW FOR FEATURED INSTEAD OF IMAGELIST
    return (
      <div id='home'>
        <br/>
          <Box sx={{ width: "100%", height: 450, marginLeft: 'auto', marginRight: 'auto', position:'relative'}} >
            <Carousel>
              <img alt="" style={{width: "75%"}} src="/products/individual/img/IMG_2411.JPG"/>
              <img alt="" style={{width: "75%"}} src="/products/individual/img/IMG_2411.JPG"/>
              <img alt="" style={{width: "75%"}} src="/products/individual/img/IMG_2411.JPG"/>
            </Carousel>
          </Box>
          <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default Home;