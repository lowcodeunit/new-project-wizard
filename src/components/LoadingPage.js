import '../App.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import LCUComponent from './LCUComponent';
import { CircularProgress, Box, Button, Link } from '@mui/material';

class LoadingPage extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {
      LoadingMessageIndex: 0,
      LoadingMessage: '',
    };
    this.handleContinueClick = this.handleContinueClick.bind(this);
  }

  componentDidMount() {
    this.lcu.track('project_deploying', 'setup/deploying', null);
    this.props.onStepChange(2);

    if (this.props.loadingMessages?.length > 0) {
      this.setState({
        LoadingMessage: this.props.loadingMessages[this.state.LoadingMessageIndex],
      });

      // useEffect(() => {
      setInterval(() => {
        let newIndex = this.state.LoadingMessageIndex + 1;

        if (newIndex > this.props.loadingMessages.length - 1) {
          newIndex = 0;
        }

        this.setState({
          LoadingMessageIndex: newIndex,
          LoadingMessage: this.props.loadingMessages[newIndex],
        });
      }, 4000);
      // }, []);
    }
  }

  handleContinueClick() {
    this.lcu.track('continued_to_dashboard', null, null);
  }

  render() {
    let content;
    if (!this.props.isProjectLoaded) {
      content = (
        <Box>
          <CircularProgress color="primary" />

          <h4>{this.state.LoadingMessage}</h4>
        </Box>
      );
    } else {
      content = (
        <Box>
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
      );
    }
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <Helmet>
          <title>Fathym - Loading Project</title>
        </Helmet>
        <Box sx={{}}>
          <h2>We're configuring your new project</h2>
          <p>
            {' '}
            The next step is to hop into our dashboard and start building your
            new website!{' '}
          </p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {content}
        </Box>
      </Box>
    );
  }
}

export default LoadingPage;
