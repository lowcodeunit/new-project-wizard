import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, Grid, Paper, Typography, Card, CardActions, CardMedia, CardContent } from '@mui/material';

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
    if (props.authStatus !== 0) {
      navigate(`/recipe/${recipe.Lookup}/connect`);
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
    navigate(`/recipe/${recipe.Lookup}/deploy`);
  }

  let importSection = (
    <Paper sx={{ height: '150px', width: "350px", textAlign:"center" }}>
      <h3>Import an existing GitHub project</h3>
      <Button
        sx={{}}
        variant="contained"
        onClick={handleCustomClick}
      >
        Import from GitHub
      </Button>
    </Paper>
  )

  let recipeSection = (
    <Grid container spacing={3}
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>

      {props.recipeList.map((item) => {
        let buttonBox;
        let sourceCode;

        if (item.sourceCode) {
          <Button
            onClick
          >
            Source Code
          </Button>
        }

        if (item.RecipeType === 'MFE') {
          buttonBox = (
            <CardActions>
              <Button
                value={item}
                onClick={() => handleCustom(item)}
              >
                {item.Button}
              </Button>
              {sourceCode}
            </CardActions>
          );
        } else {
          buttonBox = (
            <CardActions>
              <Button
                value={item}
                onClick={() => handleForkClick(item)}
              >
                Fork
              </Button>
              <Button
                onClick={() => handleOpenSource(item)}
              >
                Launch
              </Button>
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
            <Card sx={{ width: 600 }}>
              <CardMedia
                component="img"
                sx={{ height: "300px" }}
                image={item.Image}
              />
              <CardContent sx={{ minHeight: "170px" }}>
                <Typography gutterBottom variant="h4" component="div">
                  {item.Name}
                </Typography>
                <p>
                  {item.Description}
                </p>
              </CardContent>
              {buttonBox}
            </Card>
          </Grid>

        );
      })}

    </Grid>
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
      <Paper
        sx={{
          width: ['90%', '80%', '60%'],
          display: 'flex',
          flexDirection: 'column',
          my: 2,
          py: 2,
        }}
        elevation={6}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            pl: [0, 0, 4],
            width: '100%',
            flexDirection:"column",
            textAlign: "left"
          }}
        >
          <h2>Deploy a project</h2>
          <p>
            Import a project from your GitHub account, or start from one of our templates below.
          </p>

          {importSection}

          <h2>Start from a template</h2>
          <p>
            Start a new project from one of our templates. Note: to edit your project, select fork
          </p>
        </Box>
        <Box>{recipeSection}</Box>
      </Paper>
    </Box>
  );
}

export default WorkspaceSetup;
