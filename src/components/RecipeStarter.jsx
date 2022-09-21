import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/material/styles';
import { Box, Button, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeployDialog from './DeployDialog';

const StyledButton = styled(Button)({
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

function RecipeStarter(props) {
  const recipeLookup = useParams();
  const [recipe, setRecipe] = useState();
  const { onStepChange } = props;

  const navigate = useNavigate();
  useEffect(() => onStepChange(1), [onStepChange]);
  useEffect(
    () => getCurrentRecipe(props.recipeList, recipeLookup.id),
    [props.recipeList, recipeLookup.id]
  );

  function getCurrentRecipe(array, lookup) {
    let find = array.find((obj) => obj.Lookup === lookup);
    setRecipe(find);
  }

  function handleForkClick() {
    props.onStepChange();
    if (props.authStatus !== 0) {
      navigate(`/recipe/${recipe.Lookup}/connect`);
    } else {
      navigate(`/recipe/${recipe.Lookup}/fork`);
    }
  }


  return (
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
      <Helmet>
        <title>Fathym - Recipe Project</title>
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
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Link>
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          {recipe && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                maxWidth: ['90%', '80%', '70%'],
              }}
            >
              <h2>{recipe.Name}</h2>

              <img
                className="starterImage"
                src={recipe.Image}
                alt={recipe.Name}
              ></img>

              <p>{recipe.Description}</p>
              {/* 
                            <h3>Ingredients</h3>

                            <p>{recipe.Ingredients}</p> */}
            </Box>
          )}
        </Box>

        <Box sx={{ marginTop: '4em' }}>
          <h4>Choose your deployment path</h4>

          {recipe?.RecipeType !== 'MFE' && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                justifyContent: 'space-evenly',
                alignContent: 'center',
                pt: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '400px',
                  width: '100%',
                }}
              >
                <Paper sx={{ p: 2, m: 2 }}>
                  <DeployDialog
                    ButtonLabel="Launch"
                    recipe={recipe}
                    recipeType="opensource"
                    deployPage={`/recipe/${recipe.Lookup}/deploy`}
                    data={{
                      RecipeID: recipe.ID,
                      ProjectName: recipe.Name,
                    }}
                    projectIsLoaded={props.projectIsLoaded}
                  />
                  <p>
                    If you use Fathym's deployment, your project will use NPM
                    package versions of your recipe's ingredients. The result
                    will be the same, only difference is you won't have
                    repositories or automated builds under your control.
                  </p>
                </Paper>
              </Box>

              <Box
                sx={{
                  maxWidth: '400px',
                  width: '100%',
                }}
              >
                <Paper sx={{ p: 2, m: 2 }}>
                  <StyledButton
                    variant="contained"
                    sx={{ textTransform: 'none', mb: 2 }}
                    onClick={handleForkClick}
                  >
                    Fork
                  </StyledButton>
                  <p>
                    Fathym will take all your recipe ingredients and create
                    copies of them in your personal Github organization. This
                    will set up everything you need for modern DevOps; source
                    repositories, build pipelines, and deployments.
                  </p>
                </Paper>
              </Box>
            </Box>
          )}

          {recipe?.RecipeType === 'MFE' && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                justifyContent: 'space-evenly',
                alignContent: 'center',
                pt: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '400px',
                  width: '100%',
                }}
              >
                <Paper sx={{ p: 2, m: 2 }}>
                  <StyledButton
                    variant="contained"
                    sx={{ textTransform: 'none', mb: 2 }}
                    onClick={handleForkClick}
                  >
                    Launch
                  </StyledButton>
                  <p>
                    Fathym will take all your recipe ingredients and create
                    copies of them in your personal GitHub organization. This
                    will set up everything you need for modern DevOps; source
                    repositories, build pipelines, and deployments.
                  </p>
                </Paper>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default RecipeStarter;
