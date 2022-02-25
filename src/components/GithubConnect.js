import '../App.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function GithubConnect(props) {
  const recipeLookup = useParams();
  function authGit() {
    let redirectUri = encodeURI(`${props.base}custom`);

    if (recipeLookup.id) {
      redirectUri = encodeURI(`${props.base}recipe/${recipeLookup.id}/fork`);
    }
    window.location.href = `/.oauth/github?redirectUri=${redirectUri}`;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Helmet>
        <title>Fathym - Connect</title>
      </Helmet>
      <Paper sx={{ width: { xs: "90%", sm: "50%", display: 'flex', flexDirection: 'column' }, my: 2, py: 2 }} elevation={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <Link to={`/`}>
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
            >
              <ArrowBackIcon color="primary" />
            </IconButton>
          </Link>
        </Box>

        <Box sx={{ pt: 2 }}>
          <h1>Connect Your GitHub</h1>
          <GitHubIcon color="primary" fontSize='large' />
          <p>
            You've chosen a flow that requires a GitHub connection. It's simple,
            and we'll help you with the following:
          </p>

          <Button variant="contained" sx={{ mb: 2 }} onClick={authGit}>
            Connect to Github
          </Button>
          <Box>
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
        </Box>
      </Paper>
    </Box>
  );
}

export default GithubConnect;
