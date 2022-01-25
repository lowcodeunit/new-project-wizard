import './App.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import LCUComponent from './components/LCUComponent';
import queryString from 'query-string';
import {
  AppBar,
  CircularProgress,
  Box,
  Toolbar,
  Typography,
  IconButton,
  ThemeProvider,
  Stack,
} from '@mui/material';
import ProgressTracker from './components/ProgressTracker';
import WorkspaceSetup from './components/WorkspaceSetup';
import CustomProject from './components/CustomProject';
import RecipeProject from './components/RecipeProject';
import WelcomePage from './components/WelcomePage';
import LoadingPage from './components/LoadingPage';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import logo from './recipelogos/logo.svg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a918e',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

class HomeComponent extends LCUComponent {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      workspace: '',
      recipeList: [],
      isProjectCreated: false,
      gitHubAuthStatus: null,
      deploy: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleRecipeForkClick = this.handleRecipeForkClick.bind(this);
    this.handleWorkspaceOpen = this.handleWorkspaceOpen.bind(this);
    this.projectCreated = this.projectCreated.bind(this);
  }

  componentDidMount() {
    fetch('/api/lowcodeunit/github/connection/valid')
      .then(async (response) => {
        let resp = await response.json();
        console.log(resp);
        console.log(resp.Status.Message);
        if (resp.Status.Code === 0) {
          this.lcu.track('github_authorized', 'setup/github/authorized', null);
        } else {
          this.lcu.track('github_unauthorized', 'welcome/github/unauthorized', null);
        }

        this.lcu.track('github_authorization', null, {
          Authorized: resp.Status.Code === 0,
          Status: resp.Status,
        });

        this.setState({ gitHubAuthStatus: resp.Status });
      })
      .then((data) => console.log(data));

    this.getRecipes();
  }

  getRecipes() {
    fetch('/api/lowcodeunit/manage/recipes/list')
      .then(async (response) => {
        let resp = await response.json();
        if (resp.Status.Code === 0) {
          let queries = queryString.parse(window.location.search);

          if (queries?.recipeId) {
            this.handleWorkspaceOpen(queries?.recipeId);
          }

          this.setState({
            recipeList: resp.Model,
            deploy: queries?.deploy === 'true',
          });
        }
      })
      .then(this.setState({ recipesLoaded: true }));
  }

  projectCreated(type, data) {
    this.lcu.track('project_deployed', 'setup/deployed', {
      DeployType: type,
      DeployData: data,
    });

    this.setState({ isProjectCreated: true });
  }

  handleClose() {
    this.lcu.track('closed', 'setup/closed', null);

    window.location.href = `/dashboard`;
  }

  handleRecipeForkClick(event) {
    this.setState({ deploy: !!event?.deploy });
  }

  handleStepChange() {
    let step = this.state.currentStep;
    this.setState({ currentStep: ++step });
  }
  handleWorkspaceOpen(event) {
    if (this.state.deploy) {
      this.setState({
        deploy: false,
      });
    } else {
      this.setState({
        workspace: event,
        currentStep: event ? 1 : 0,
        deploy: false,
      });
    }
    console.log('click is ' + event);
  }

  render() {
    let progressContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

    let content;

    if (this.state.recipeList?.length <= 0) {
      content = progressContent;
    } else if (this.state.currentStep === 0) {
      content = (
        <WorkspaceSetup
          buttonClick={this.handleWorkspaceOpen}
          recipeList={this.state.recipeList}
          onStepChange={this.handleStepChange}
        ></WorkspaceSetup>
      );
    } else if (this.state.currentStep === 1) {
      if (this.state.workspace === 'custom') {
        if (!this.state.gitHubAuthStatus) {
          content = progressContent;
        } else if (this.state.gitHubAuthStatus.Code !== 0) {
          content = (
            <WelcomePage
              onStepChange={this.handleStepChange}
              workspace={this.state.workspace}
              buttonClick={this.handleWorkspaceOpen}
            ></WelcomePage>
          );
        } else {
          content = (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                pt: 2,
              }}
            >
              <CustomProject
                buttonClick={this.handleWorkspaceOpen}
                onStepChange={this.handleStepChange}
                projectIsLoaded={this.projectCreated}
              />
            </Box>
          );
        }
      } else {
        if (!this.state.gitHubAuthStatus) {
          content = progressContent;
        } else if (
          this.state.gitHubAuthStatus.Code !== 0 &&
          this.state.deploy
        ) {
          content = (
            <WelcomePage
              onStepChange={this.handleStepChange}
              workspace={this.state.workspace}
              deploy={this.state.deploy}
              buttonClick={this.handleWorkspaceOpen}
            ></WelcomePage>
          );
        } else {
          content = (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                pt: 2,
              }}
            >
              <RecipeProject
                buttonClick={this.handleWorkspaceOpen}
                deploy={this.state.deploy}
                recipeID={this.state.workspace}
                recipeList={this.state.recipeList}
                onStepChange={this.handleStepChange}
                projectIsLoaded={this.projectCreated}
                useRecipeClick={this.handleRecipeForkClick}
              />
            </Box>
          );
        }
      }
    } else if (this.state.currentStep === 2) {
      content = <LoadingPage isProjectLoaded={this.state.isProjectCreated} />;
    }
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Helmet>
            <title>LowCodeUnit - Welcome</title>
          </Helmet>
          <AppBar position="static">
            <Toolbar>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  sx={{ flexGrow: 1, alignContent: 'start' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: { xs: 20, s: 20, m: 40, lg: 50 },
                      }}
                      alt="Your logo."
                      src={logo}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: 'Encode Sans Condensed, sans-serif',
                          fontWeight: '900',
                          fontSize: '20px',
                          pl: 2,
                        }}
                        noWrap={true}
                      >
                        LowCodeUnit Beta
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={0.5}
                >
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={this.handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Toolbar>
          </AppBar>
          <ProgressTracker
            workspace={this.state.workspace}
            step={this.state.currentStep}
          ></ProgressTracker>
          <Box
            sx={{
              marginBottom: '4em',
            }}
          >
            {content}
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default HomeComponent;
