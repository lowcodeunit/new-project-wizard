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
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={8} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <img className='recipeImage' src={item.PreviewImage} alt={item.Lookup} />

                <Typography
                  sx={{ fontWeight: ['600', '600', '900'], fontSize: ['20px'], pl: [1, 1, 2], pt:[0,0,4]}}
                  noWrap={true}
                >
                  {capitalize(item.Lookup)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={8}>
              <Box sx={{ width: '100%', alignItems: "center", justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: "center", justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    className='recipeButtons'
                    sx={{ mr: 1 }}
                    value={item}
                    onClick={() => handleForkClick(item)}
                  >
                    Fork
                  </Button>
                  <Button
                    variant="contained"
                    className='recipeButtons'
                    onClick={handleOpenSource}
                  >
                    Launch
                  </Button>
                </Box>
                <Link color="primary" to={`/recipe/${item.Lookup}`}>More Info</Link>
              </Box>
            </Grid>
          </Grid>

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
      <Paper sx={{ width: { xs: "90%", sm: "60%", display: 'flex', flexDirection: 'column' }, my: 2, py: 2 }} elevation={6}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: [0, 0, 4], width: '100%', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
          <h2>Get started with a template</h2>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' } }}>
            <Button sx={{ mr: [0, 0, 5], height: "70%" }} variant="contained" onClick={handleCustomClick}>Create custom project</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: 4 }}>
          <p>
            Launch from our open source repo or fork to yours to launch.
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
