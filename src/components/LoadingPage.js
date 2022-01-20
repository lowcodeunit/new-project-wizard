import '../App.css';
import React from "react";
import {CircularProgress, Box, Button, Link} from '@mui/material';





class LoadingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
    this.handleContinueClick = this.handleContinueClick.bind(this);
  
  }
  componentDidMount() {
    window.ORIBI?.api('track', 'final_page_reached')
    window.ga('send', 'pageview', window.location.pathname + 'final page reached');
  }

  handleContinueClick(){
    window.ORIBI?.api('track', 'continued to dashboard')
  }

  render(){
      let content;
      if(!this.props.isProjectLoaded){
        content = <CircularProgress color="primary" />
      }
      return(  
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'space-evenly'}}>
            <Box sx={{}}>
                <h2>We're configuring your new project</h2>
                <p> The next step is to hop into our dashboard and start building your new website! </p>
            </Box>
            {content}
            <Link href="/dashboard" underline="none">
              <Button
              variant="contained"
              sx={{ mt: 4 }}
              disabled={this.props.isProjectLoaded}
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
