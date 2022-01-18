import '../App.css';
import React from "react";
import {Box, Button} from '@mui/material';





class LoadingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
  
  }

  render(){
      return(  
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'space-evenly'}}>
            <Box sx={{}}>
                <h2>We're configuring your new project</h2>
                <p> The next step is to hop into our dashboard and start building your new website! </p>
            </Box>
            <a href="/dashboard">
              <Button
              variant="contained"
              sx={{ mt: 4 }}

              size="large"
              >
                Continue to Dashboard
              </Button>
          </a>
        </Box>
      )
  }
}

export default LoadingPage;
