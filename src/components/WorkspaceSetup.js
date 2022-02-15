import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Button, Divider, Tooltip, Grid, Paper } from '@mui/material';
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
        {/* {props.recipeList.map((item) => (
          <Grid
            order={item.Tier}
            item
            xs={6}
            sm={6}
            md={4}
            sx={{ height: '15vh', mt:10 }}
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
        ))} */}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Helmet>
        <title>LowCodeUnit - Select your project</title>
      </Helmet>

      <Paper sx={{ width: '70%', my:2 }}>
     
          <Box>What can you fathym? Get started with your code.</Box>
          <Box>
            <DriveFileMoveIcon color="primary" />
            Get started with a zip file.
            <Button variant="contained">Upload</Button>
          </Box>
          <Box>
            <GitHubIcon color="primary" />
            Get started with GitHub.
            <Button variant="contained">Connect</Button>
          </Box>

      </Paper>


      <Paper sx={{ width: '70%', my:2 }}>
        <Box sx={{ pt: 2 }}>
          <h2>Get started with a template</h2>
          <p>
            Launch from our open source repo or fork to yours to launch. <br />
            Note: to customize your code you must fork to your own repo
          </p>
          {recipeSection}
        </Box>
      </Paper>
    </Box>
  );
}

export default WorkspaceSetup;
