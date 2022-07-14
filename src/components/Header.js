import '../App.css';
import React from 'react';
import LCUComponent from './LCUComponent';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Stack, Typography, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
        <AppBar position="static">
            <Toolbar>
            <Box sx={{display: 'flex', width:'100%'}}>
                <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0.5}
                sx={{flexGrow: 1, alignContent:'start'}}>
                <Box sx={{display:'flex',flexDirection:'row',  alignItems:"center"}}>
                    <Box
                    component="img"
                    sx={{ 
                    height: {xs:20, s:20, m:40, lg:50}
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
                    <DashboardIcon />
                    <Typography variant="p" sx={{fontSize:'14px'}}>
                      Dashboard
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
