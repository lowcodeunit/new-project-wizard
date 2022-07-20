import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Paper, Card, CardActions, CardMedia, CardContent, Tooltip } from '@mui/material';
import { SiAzuredevops, SiGithub } from 'react-icons/si';
import { IoLogoBitbucket } from "react-icons/io5";
import { AiFillGitlab } from "react-icons/ai";

const ColorButton = styled(Button)({
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',]
})


function WorkspaceSetup(props) {
  const navigate = useNavigate();
  function handleCustomClick() {
    if (props.authStatus !== 0) {
      navigate('/custom/connect');
    } else {
      navigate('/custom');
    }
  }
  // function capitalize(str) {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }
  function handleSourceClick(url) {
    window.open(url, '_blank').focus();
  }
  function handleCustom(recipe) {
    if (recipe.ID === "00000000-0000-0000-0000-000000000009") {
      handleOpenSource(recipe);
    } else {
      handleForkClick(recipe);
    }
  }
  function handleForkClick(recipe) {
    props.onStepChange();
    props.selectedRecipe(recipe.ID);
    if (props.authStatus !== 0 && window.self !== window.top) {
      window.open(window.self + `/recipe/${recipe.Lookup}/connect`, '_top').focus();
    } else if (props.authStatus !== 0) {
      navigate(`/recipe/${recipe.Lookup}/connect`);
    } else if (window.self !== window.top) {
      window.open(window.self + `/recipe/${recipe.Lookup}/fork`, '_top').focus();
    } else {
      navigate(`/recipe/${recipe.Lookup}/fork`);
    }
  }

  function handleOpenSource(recipe) {
    props.onStepChange();
    props.selectedRecipe(recipe.ID);
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
    if (window.self !== window.top) {
      window.open(window.self +`/recipe/${recipe.Lookup}/deploy`, '_top').focus();
    } else {
    navigate(`/recipe/${recipe.Lookup}/deploy`);
    }
  }

  let importSection = (
    <Paper elevation={6} sx={{ height: '150px', maxWidth: '600px', textAlign: "left", px: ['5px', '10px', '15px'], borderTop: '6px solid #4a918e', marginBottom: '60px'}}>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <SiGithub size='1.5em' className='GitLogos' />
        <Tooltip title="Coming soon">
          <Box>
            <SiAzuredevops color="lightgrey" size='1.5em' className='GitLogosDisabled' />
            <IoLogoBitbucket color="lightgrey" size='1.5em' className='GitLogosDisabled' />
            <AiFillGitlab color="lightgrey" size='1.5em' className='GitLogosDisabled' />
          </Box>
        </Tooltip>
      </Box>


      <h4>Import an existing GitHub project</h4>
      <ColorButton
        sx={{ textTransform: 'none' }}
        variant="contained"
        onClick={handleCustomClick}
      >
        Import from Git

      </ColorButton>
    </Paper>
  )

  let recipeSection = (

    <Grid container spacing={3}
      alignItems="center"
      justify="center"
      sx={{
        px: "10px",
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

      {
        props.recipeList.map((item) => {
          let buttonBox;
          let sourceCode;

          if (item.SourceCode !== null) {
            sourceCode =
              <ColorButton
                sx={{ textTransform: 'none' }}
                variant="text"
                onClick={() => handleSourceClick(item.SourceCode)}
              >
                Source Code
              </ColorButton>
          }

          if (item.RecipeType === 'MFE') {
            buttonBox = (
              <CardActions>
                <ColorButton
                  sx={{ textTransform: 'none' }}
                  variant="contained"
                  value={item}
                  onClick={() => handleCustom(item)}
                >
                  Launch
                </ColorButton>
                {sourceCode}
              </CardActions>
            );
          } else {
            buttonBox = (
              <CardActions>
                <ColorButton
                  sx={{ textTransform: 'none' }}
                  value={item}
                  onClick={() => handleForkClick(item)}
                  variant="contained"
                >
                  Fork
                </ColorButton>
                <ColorButton
                  sx={{ textTransform: 'none', backgroundColor:'white' }}
                  onClick={() => handleOpenSource(item)}
                  variant="outlined"

                >
                  Launch
                </ColorButton>
                {sourceCode}
              </CardActions>
            );
          }

          return (
            <Grid item xs={12} sm={6} md={6} container
              alignItems="center"
              justify="center"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card elevation={6} sx={{ maxWidth: "600px", width: '100%', backgroundColor: '#ebecf0' }} >
                <CardMedia
                  component="img"
                  sx={{
                    height: "auto"
                  }}
                  image={item.Image}
                />
                <CardContent sx={{ height: { xs: '180px', m: '150px', lg: '150px' }, textAlign: 'left' }}>
                  <h4>
                    {item.Name}
                  </h4>
                  <p>
                    {item.Description}
                  </p>
                </CardContent>
                {buttonBox}
              </Card>
            </Grid>

          );
        })
      }

    </Grid >
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Helmet>
        <title>Fathym - Select your project</title>
      </Helmet>
      <Box
        sx={{
          width: ['90%', '80%', '60%'],
          display: 'flex',
          flexDirection: 'column',
          my: 2,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            width: '100%',
            justifyContent: 'flex-start',
            textAlign: 'left',
            flexDirection: "column",
            paddingBottom: '20px',
            paddingLeft: ['5px', '10px', '20px']
          }}
        >
          <h2>Deploy a project</h2>
          <p>
            Import a project from your GitHub account, or start from one of our templates below.
          </p>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {importSection}
          </Box>

          <h2>Get Started with a template </h2>
          <p>
            Launch from our open-source repo or fork to your own.
          </p>
          <p>
            <strong>Note: </strong>To customize the code you must fork to your own repo.
          </p>
        </Box>
        <Box>{recipeSection}</Box>
      </Box>
    </Box>
  );
}

export default WorkspaceSetup;
