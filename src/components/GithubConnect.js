import '../App.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import DvrIcon from '@mui/icons-material/Dvr';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function GithubConnect() {
  const recipeLookup = useParams();
  function authGit() {
    let redirectUri = encodeURI(`/custom`);
    
    if (recipeLookup.id) {
      var search = window.location.search;

      redirectUri = encodeURI(`/recipe/${recipeLookup.id}/fork${search}`);
    }

    window.location.href = `/.oauth/github?redirectUri=${redirectUri}`;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Helmet>
        <title>LowCodeUnit - Connect</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Link to="/">
          <IconButton size="large" edge="end" color="inherit" aria-label="menu">
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Box>

      <Box sx={{ pt: 2 }}>
        <h1>Connect Your GitHub</h1>
        <p>
          You've chosen a flow that requires a GitHub connection. It's simple,
          and we'll help you with the following:
        </p>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            justifyContent: 'space-evenly',
            pt: 2,
          }}
        >
          <Paper sx={{ p: 3, m: 2 }}>
            <Button variant="contained" sx={{ mb: 2 }} onClick={authGit}>
              Connect to Github
            </Button>
            <Box sx={{ textAlign: 'left' }}>
              <li>Setup modern DevOps build processes using Github actions</li>
              <li>Fork and/or setup repositories for your Github code</li>
              <li>
                Provide streamlined source control management for your team
              </li>
              <li>
                If you don't have a GitHub account, create a new account{' '}
                <a
                  href="https://github.com/signup"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>{' '}
                first
              </li>
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
      </Box>
    </Box>
  );
}

export default GithubConnect;
