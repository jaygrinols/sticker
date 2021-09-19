import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';

function CartItem(props) {

    return (
        <div style={{backgroundColor: "white"}}>
            <Grid container direction="row">
                <Grid item xs={4} style={{display: "flex", alignItems: "center", justifyContent: "center", fontFamily: 'Nanum Pen Script', fontSize: "125%"}}>
                    <img src="./products/individual/img/IMG_2403.JPG" style={{minWidth: "40%", width: "40%"}}></img>
                </Grid>
                <Grid item xs={2} style={{display: "flex", alignItems: "center", justifyContent: "center", fontFamily: 'Nanum Pen Script', fontSize: "125%"}}>
                    <p>$4.99</p>
                </Grid>
                <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <TextField size="small" style={{width:"50px"}}/>
                    <ButtonGroup orientation="vertical">
                    <IconButton size="small">
                        <AddIcon style={{width:"50%", maxWidth: "50px", color: "#c7a2c4"}}/>
                    </IconButton>
                    <IconButton size="small">
                        <RemoveIcon style={{width:"50%", maxWidth: "50px", color: "#c7a2c4"}}/>
                    </IconButton>
                    </ButtonGroup>
                    <IconButton>
                        <DeleteIcon style={{color: "#c7a2c4", backgroundColor: "white"}}/>
                    </IconButton>
                </Grid>
            </Grid>
            <hr style={{width: "90%", border: "none", backgroundColor: "pink", height: "3px"}}/>
        </div>
    );
}

export default CartItem;