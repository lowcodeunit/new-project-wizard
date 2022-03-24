import '../App.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import LCUComponent from './LCUComponent';
import { CircularProgress, Box, Button, Link, Paper} from '@mui/material';
import logo from '../recipelogos/thinky.png'

class LoadingPage extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {
      LoadingMessageIndex: 0,
      LoadingMessage: '',
      CurrentImage: logo
    };
    this.handleContinueClick = this.handleContinueClick.bind(this);
  }

  componentDidMount() {
    this.lcu.track('project_deploying', 'setup/deploying', null);
    this.props.onStepChange(2);
    console.log(`the recipe is ${this.props.recipe}`)

    if (this.props.loadingMessages?.length > 0) {
      this.setState({
        LoadingMessage:
          this.props.loadingMessages[this.state.LoadingMessageIndex],
      });

      setInterval(() => {
        let newIndex = this.state.LoadingMessageIndex + 1;

        if (newIndex > this.props.loadingMessages.length - 1) {
          newIndex = 0;
        }

        this.setState({
          LoadingMessageIndex: newIndex,
          LoadingMessage: this.props.loadingMessages[newIndex],
        });
      }, 6000);
    }
    if (this.props.recipe) {
      setInterval(() => {

        if (this.state.CurrentImage === logo) {
          this.setState({
            CurrentImage:
              this.props.recipe.PreviewImage
          });
        } else {
          this.setState({
            CurrentImage:
              logo
          });
        }
      }, 4000);
    }
  }


  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  handleContinueClick() {
    this.lcu.track('continued_to_dashboard', null, null);
  }

  render() {
    let content;
    if (!this.props.isProjectLoaded) {
      if (this.props.recipe) {
        content =
        <Box>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', pt:1}}>
          <Box sx={{ position: 'abosolute' }}>
            <img className='recipeLoader' src={this.state.CurrentImage} alt={`Fatyhm and ${this.props.recipe.Lookup} logos`}/>
          </Box>
          <CircularProgress
            color="primary"
            size={100}
            sx={{
              position: 'absolute',
              zIndex: 1
            }} />
        </Box>
        <h4>{this.state.LoadingMessage}</h4>
        </Box>
      } else {
        content = (
          <Box>
            <CircularProgress color="primary" />
            <h4>{this.state.LoadingMessage}</h4>
          </Box>
        );
      }
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
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Helmet>
          <title>Fathym - Loading Project</title>
        </Helmet>
        <Paper sx={{ width: ['90%', '80%', '60%'], display: 'flex', flexDirection: 'column', my: 2, py: 2 }} elevation={6}>
          <Box sx={{}}>
            <h2>{this.props.isProjectLoaded ? 'We\'ve configured' : 'We\'re configuring'} your new {this.props.recipe ? this.capitalize(this.props.recipe.Lookup) : null} project</h2>
            <p>
              {' '}
              The next step is to hop into our dashboard and start building your
              new website!{' '}
            </p>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {content}
          </Box>
        </Paper>
      </Box>
    );
  }
}

export default LoadingPage;
