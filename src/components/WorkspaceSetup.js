import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, Divider, Tooltip, Grid, Paper, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

function WorkspaceSetup(props) {
  const navigate = useNavigate();
  function handleCustomClick() {
    if (props.authStatus !== 0) {
      navigate('/custom/connect');
    } else {
      navigate('/custom');
    }
  }
  function handleForkClick(recipe) {
    props.onStepChange();
    if (props.authStatus !== 0) {
      navigate(`/recipe/${recipe.Lookup}/connect`);
    } else {
      navigate(`/recipe/${recipe.Lookup}/fork`);
    }
  }

  function handleOpenSource(recipe) {
    props.onStepChange();
    let data = {
      RecipeID: recipe.ID,
      ProjectName: recipe.Name,
    };
    fetch('/api/lowcodeunit/create/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log('Request complete! response:', res);
      props.projectIsLoaded();
    });
    navigate('/deploy');
  }
  let recipeSection = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 4,
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        {props.recipeList.map((item) => (
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.5}
              sx={{ flexGrow: 1, alignContent: 'start' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <Box
               
                  sx={{
                    backgroundColor: 'red',
                    pl: 8,
                    width: '10%',
                    Height: '10%'
                  }}
                  alt="Your logo."
                 
                />
                <img className='recipeImage' src={item.PreviewImage}/>
                <Box>
                  <Typography
                    sx={{ fontFamily: 'Encode Sans Condensed, sans-serif', fontWeight: '900', fontSize: '20px', pl: 2 }}
                    noWrap={true}
                  >
                    {item.Lookup}
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
                variant="contained"
                sx={{}}
                onClick={handleForkClick}
              >
                Fork
              </Button>
              <Button
                variant="contained"
                sx={{}}
                onClick={handleOpenSource}
              >
                Launch
              </Button>
            </Stack>
          </Box>

        ))}
      </Box>
    </Box >
  );

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Helmet>
        <title>Fathym - Select your project</title>
      </Helmet>

      <Paper sx={{ width: { xs: "90%", sm: "70%", display: 'flex', flexDirection: 'column' }, my: 2, py: 2 }} elevation={6} >

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 4 }}>
          <h2>
            What can you fathym? Get started with your code.
          </h2>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 8, width: '40%' }}>
            <DriveFileMoveIcon fontSize="large" color="primary" sx={{ pr: 2 }} />
            Get started with a zip file. (coming soon)
          </Box>
          <Box>
            <Button variant="contained" disabled sx={{ display: 'flex', justifyContent: 'flex-end' }}>Upload</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', py: 2 }} >
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 8, width: '40%' }}>
            <GitHubIcon fontSize="large" color="primary" sx={{ pr: 2 }} />
            Get started with GitHub.
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleCustomClick}>Connect</Button>
          </Box>
        </Box>

      </Paper >


      <Paper sx={{ width: { xs: "90%", sm: "70%", display: 'flex', flexDirection: 'column' }, my: 2, py: 2 }} elevation={6}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 4 }}>
          <h2>Get started with a template</h2>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 4 }}>
            <p>
              Launch from our open source repo or fork to yours to launch. <br />
              Note: to customize your code you must fork to your own repo
            </p>
          </Box>
        <Box>
          {recipeSection}
        </Box>
      </Paper >
    </Box >
  );
}

export default WorkspaceSetup;
