import '../App.css';
import React from 'react';
import LCUComponent from './LCUComponent';
import { CircularProgress, Box, Button, Link } from '@mui/material';

class LoadingPage extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleContinueClick = this.handleContinueClick.bind(this);
  }

  componentDidMount() {
    this.lcu.track('final_page_reached', 'setup/final');
  }

  handleContinueClick() {
    this.lcu.track('continued_to_dashboard', null);
  }

  render() {
    let content;
    if (!this.props.isProjectLoaded) {
      content = <CircularProgress color="primary" />;
    }
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <Box sx={{}}>
          <h2>We're configuring your new project</h2>
          <p>
            {' '}
            The next step is to hop into our dashboard and start building your
            new website!{' '}
          </p>
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
    );
  }
}

export default LoadingPage;
