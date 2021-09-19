import React from 'react';
import logo from './logo.svg';
import Drawer from '@material-ui/core/Drawer'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar'
import Stack from '@mui/material/Stack'
import './App.css';
import { Typography } from '@mui/material';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@material-ui/core/Box'
import Search from './Search'
import { SocialIcon } from 'react-social-icons';
import BottomNavigation from '@mui/material/BottomNavigation';
import Carousel from 'react-material-ui-carousel' //https://www.npmjs.com/package/react-material-ui-carousel

function Home() { //IMPLEMENT TITLE BAR BELOW IMAGE DEMO material ui // SLIDE SHOW FOR FEATURED INSTEAD OF IMAGELIST
    return (
      <div id='home'>
        <br/>
          <Box sx={{ width: "100%", height: 450, marginLeft: 'auto', marginRight: 'auto', position:'relative'}} >
            <Carousel>
              <img style={{width: "75%"}} src="/products/individual/img/IMG_2411.JPG"/>
              <img style={{width: "75%"}} src="/products/individual/img/IMG_2411.JPG"/>
              <img style={{width: "75%"}} src="/products/individual/img/IMG_2411.JPG"/>
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