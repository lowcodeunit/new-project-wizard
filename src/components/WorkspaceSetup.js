import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, Grid, Paper, Card, CardActions, CardMedia, CardContent } from '@mui/material';


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
    <Paper sx={{ height: '150px', maxWidth: "600px", textAlign: "center", px: "20px" }}
      variant="outlined">
      <h4>Import an existing GitHub project</h4>
      <Button
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
              <Button
                variant="outlined"
                onClick={() => handleSourceClick(item.SourceCode)}
              >
                Source Code
              </Button>
          }

          if (item.RecipeType === 'MFE') {
            buttonBox = (
              <CardActions>
                <Button
                  variant="contained"
                  value={item}
                  onClick={() => handleCustom(item)}
                >
                  Launch
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
                  variant="contained"
                >
                  Fork
                </Button>
                <Button
                  onClick={() => handleOpenSource(item)}
                  variant="contained"
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
              <Card sx={{ maxWidth: "600px" }} variant="outlined">
                <CardMedia
                  component="img"
                  sx={{
                    height: "auto", borderBottom: 1, borderColor: 'grey.500'
                  }}
                  image={item.Image}
                />
                <CardContent sx={{ height: "220px" }}>
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
      <Paper
        sx={{
          width: ['90%', '80%', '60%'],
          display: 'flex',
          flexDirection: 'column',
          my: 2,
          py: 2,
        }}
        variant="outlined"
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: "column",
            paddingBottom: '20px'
          }}
        >
          <h2>Deploy a project</h2>
          <p>
            Import a project from your GitHub account, or start from one of our templates below.
          </p>

          {importSection}

          <h2>Get Started with a template </h2>
          <p>
            Launch from our open-source repo or fork to your own.
          </p>
          <p>
            <strong>Note: </strong>To customize the code you must fork to your own repo.
          </p>
        </Box>
        <Box>{recipeSection}</Box>
      </Paper>
    </Box>
  );
}

export default WorkspaceSetup;
