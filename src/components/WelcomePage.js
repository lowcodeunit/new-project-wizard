import '../App.css';
import React from 'react';
import LCUComponent from './LCUComponent';
import { Box, Button, AppBar, Toolbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import DvrIcon from '@mui/icons-material/Dvr';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

class WelcomePage extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.authGit = this.authGit.bind(this);
  }

  authGit() {
    const reidrectUri = window.location.pathname + window.location.search;
    window.location.href = `/.oauth/github?redirectUri=${reidrectUri}`;
    this.props.onStepChange();
  }

  render() {
    return (
      <Box sx={{ pt: 2 }}>
        <h1>Thank you for Signing Up</h1>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            justifyContent: 'space-evenly',
            pt: 2,
          }}
        >
          <Paper sx={{ p: 3, m: 2 }}>
            <Button variant="contained" sx={{ mb: 2 }} onClick={this.authGit}>
              Connect to Github
            </Button>
            <Box sx={{ textAlign: 'left' }}>
              <li>Setup Build processes using Github actions</li>
              <li>Fork repositories to your Github</li>
              <li>Create YML files</li>
              <li>more....</li>
            </Box>
          </Paper>
          <Paper sx={{ p: 2, m: 2 }}>
            <Button disabled variant="contained" sx={{ mb: 2 }}>
              Continue Without Github
            </Button>
            <Box sx={{ textAlign: 'left' }}>
              <li>Coming soon</li>
              <li>Upload zip files of your own code</li>
              <li>preview some of our premade templates</li>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            pt: 13,
            display: { md: 'flex', xs: 'none' },
            flexDirection: { sm: 'row', med: 'column' },
            justifyContent: 'center',
          }}
        >
          <SettingsIcon sx={{ transform: 'scale(5.0)', m: 5 }} />
          <ArrowRightAltIcon sx={{ transform: 'scale(5.0)', m: 5 }} />
          <DvrIcon sx={{ transform: 'scale(5.0)', m: 5 }} />
          <ArrowRightAltIcon sx={{ transform: 'scale(5.0)', m: 5 }} />
          <CloudUploadIcon sx={{ transform: 'scale(5.0)', m: 5 }} />
        </Box>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: 'auto', bottom: 0 }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ mr: 2 }} onClick={this.authGit}>
              {' '}
              Connect to Github
            </Button>
            <Button disabled variant="contained">
              {' '}
              Continue Without Github
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default WelcomePage;
