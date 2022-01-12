import '../App.css';
import React from "react";
import {Box, Divider} from '@mui/material';





class LoadingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
    this.authGit = this.authGit.bind(this);
  }

  authGit() {
    const reidrectUri = window.location.pathname + window.location.search;

    window.location.href = `/.oauth/github?redirectUri=${reidrectUri}`;

    this.ConnectClicked = true;
    this.props.onStepChange()
  }

  render(){
      return(  
        <Box sx={{display:"flex", flexDirection:"row", justifyContent: 'space-evenly'}}>
            <Box sx={{width:'40%'}}>
                <h2>We're configuring your new project</h2>
                <p>Let's review the details of your setup before continuing.  Once ready, click configure project to start the setup process.</p>

            </Box>
            <Divider orientation='vertical'/>
            <Box sx={{width:'40%'}}>
                <h2>What to do next?</h2>
                <p>explore some documentation to help you get started</p>
            </Box>
        </Box>
      )
  }
}

export default LoadingPage;
