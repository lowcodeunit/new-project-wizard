import '../App.css';
import React from "react";
import {Box, Button, Link} from '@mui/material';





class LoadingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
    this.handleContinueClick = this.handleContinueClick.bind(this);
  
  }
  componentDidMount() {
    window.ORIBI.api('track', 'final page reached')
    window.ga('send', 'pageview', window.location.pathname + 'final page reached');
  }

  handleContinueClick(){
    window.ORIBI.api('track', 'continued to dashboard')
  }

  render(){
      return(  
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'space-evenly'}}>
            <Box sx={{}}>
                <h2>We're configuring your new project</h2>
                <p> The next step is to hop into our dashboard and start building your new website! </p>
            </Box>
            <Link href="/dashboard" underline="none">
              <Button
              variant="contained"
              sx={{ mt: 4 }}
              onClick={this.handleContinueClick}
              size="large"
              >
                Continue to Dashboard
              </Button>
            </Link>
        </Box>
      )
  }
}

export default LoadingPage;
