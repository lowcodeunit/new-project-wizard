import '../App.css';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

function WorkspaceSetup(props) {
  const navigate = useNavigate();
  function handleCustomClick() {
    if (props.authStatus !== 0) {
      navigate('/custom/connect');
    } else {
      navigate('/custom');
    }
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

  let recipeSection = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 4,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {props.recipeList.map((item) => {
          let buttonBox;

          if (item.RecipeType === 'MFE') {
            buttonBox = (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  className="recipeButtons"
                  sx={{ mr: 1 }}
                  value={item}
                  onClick={() => handleForkClick(item)}
                >
                  Launch Micro Frontend
                </Button>
              </Box>
            );
          } else {
            buttonBox = (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  className="recipeButtons"
                  sx={{ mr: 1 }}
                  value={item}
                  onClick={() => handleForkClick(item)}
                >
                  Fork
                </Button>
                <Button
                  variant="contained"
                  className="recipeButtons"
                  onClick={() => handleOpenSource(item)}
                >
                  Launch
                </Button>
              </Box>
            );
          }

          return (
            <Box>
              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={2} md={2}>
                  <img
                    className="recipeImage"
                    src={item.PreviewImage}
                    alt={item.Lookup}
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: ['600', '600', '900'],
                        fontSize: ['20px'],
                      }}
                      align="left"
                      noWrap={true}
                    >
                      {capitalize(item.Lookup)}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: '400',
                        fontSize: ['15px'],
                        display: ['none', 'none', 'block'],
                      }}
                      noWrap={false}
                      align="left"
                    >
                      {`${item.Description.substring(0, 80)}...`}
                      <Link color="primary" to={`/recipe/${item.Lookup}`}>
                        More Info
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box
                    sx={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      pt: [0, 1, 4],
                    }}
                  >
                    {buttonBox}

                    <Link
                      className="recipeLink"
                      color="primary"
                      to={`/recipe/${item.Lookup}`}
                    >
                      More Info
                    </Link>
                  </Box>
                </Grid>
              </Grid>
              <hr />
            </Box>
          );
        })}
      </Box>
    </Box>
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
            justifyContent: 'space-between',
            pl: [0, 0, 4],
            width: '100%',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          }}
        >
          <h2>Get started with a template</h2>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' },
            }}
          >
            <Button
              sx={{ mr: [0, 0, 5], height: '70%' }}
              variant="contained"
              onClick={handleCustomClick}
            >
              Create custom project
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 4 }}>
          <p>
            Launch from our open source repo or fork to yours to launch. Note:
            to customize your code you must fork to your own repo
          </p>
        </Box>
        <Box>{recipeSection}</Box>
      </Paper>
    </Box>
  );
}

export default WorkspaceSetup;
