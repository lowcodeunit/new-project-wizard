import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, Divider, Tooltip, Grid } from '@mui/material';

function WorkspaceSetup(props) {
  const navigate = useNavigate();
  function handleCustomClick(){
    if(props.authStatus!==0){
      navigate('/custom/connect');
    } else {
      navigate('/custom');
    }
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
      <Grid
        container
        justify="center"
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        wrap
      >
        {props.recipeList.map((item) => (
          <Grid
            order={item.Tier}
            item
            xs={6}
            sm={6}
            md={4}
            sx={{ height: '15vh' }}
          >
            <Tooltip title={item.Name}>
              <Button
                sx={{ maxHeight: '15vh' }}
                onClick={() => {
                  navigate(`/recipe/${item.Lookup}`);
                }}
              >
                <img
                  className="Recipe"
                  src={item.PreviewImage}
                  srcSet={item.PreviewImage}
                  alt={item.Name}
                />
              </Button>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>LowCodeUnit - Select your project</title>
      </Helmet>
      <Box>
        <Box sx={{ py: 8, px: 2 }}>
          <Box>
            <h2>Custom Projects</h2>
            <p>
              Already have your own project in a github repo, or want to start
              from scratch? Here we'll help you setup the deployment and you do
              all the coding.
            </p>
            <Button
              size="large"
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                handleCustomClick();
              }}
            >
              Create Custom Project
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ pt: 2 }}>
        <h2>Choose Project Recipe</h2>
        <p>
          Select an existing Recipe to get started quickly, or create your own
          custom project.
        </p>
        {recipeSection}
      </Box>
    </Box>
  );
}

export default WorkspaceSetup;
