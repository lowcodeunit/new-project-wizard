import '../App.css';
import React from 'react';
import LCUComponent from './LCUComponent';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Stack, Typography, Button } from '@mui/material';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import logo from '../recipelogos/logo.svg'


class Header extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.lcu.track('closed', 'setup/closed');

    window.location.href = `/dashboard`;
  }

  render() {
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
            <Box sx={{display: 'flex', width:'100%'}}>
                <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0.5}
                sx={{flexGrow: 1, alignContent:'start'}}>
                <Box sx={{display:'flex',flexDirection:'row',  alignItems:"center", height: '100%'}}>
                    <Box
                    component="img"
                    sx={{ 
                    height: '65%'
                    }}
                    alt="Your logo."
                    src={logo}
                    />
                    <Box>
                    <Typography
                        sx={{fontFamily: 'Encode Sans Condensed, sans-serif', fontWeight: '900', fontSize:'20px', pl: 2}}
                        noWrap={true}
                    > 

                    </Typography>
                    </Box>
                </Box>
                </Stack>
                <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={0.5}
                >
                <Button
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={this.handleClose}
                >
                    <ViewCompactIcon />
                    <Typography sx={{fontFamily: 'Roboto, Helvetica Neue, sans-serif',fontSize:'14px', textTransform:'none', pl:1}}>
                      <p>Dashboard</p>
                    </Typography>
                </Button>
                </Stack>
            </Box>
            </Toolbar>
        </AppBar>
    );
  }
}

export default Header;
