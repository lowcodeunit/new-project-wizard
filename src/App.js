import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate  } from "react-router-dom";
import {Helmet} from "react-helmet";
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
import  Header from './components/Header'
import ProgressTracker from './components/ProgressTracker';
import WorkspaceSetup from './components/WorkspaceSetup';
import CustomProject from './components/CustomProject';
import RecipeProject from './components/RecipeProject';
import GithubConnect from './components/GithubConnect';
import LoadingPage from './components/LoadingPage';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import logo from './recipelogos/logo.svg'

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
      currentRecipe: '',
      isProjectCreated: false,
      gitHubAuthStatus: null,
      deploy: false,
    };
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
          this.lcu.track('github_authorized', 'setup/github/authorized');
        } else {
          this.lcu.track('github_unauthorized', 'welcome/github/unauthorized');
        }

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

  projectCreated() {
    this.lcu.track('project_deployed', 'setup/deployed');
    
    this.setState({ isProjectCreated: true });
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
        currentRecipe: this.getCurrentRecipe(this.state.recipeList, this.state.workspace)
      });
      
    }
    console.log('click is ' + event);
  }

  getCurrentRecipe(array, ID) {
    return array.find((element) => {
      return element.ID === ID;
    });
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
    
    return (
      <BrowserRouter>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Helmet>
              <title>LowCodeUnit - Welcome</title>
            </Helmet>
            <Header/>
            <ProgressTracker
              workspace={this.state.workspace}
              step={this.state.currentStep}
            ></ProgressTracker>
            <Box
              sx={{
                marginBottom: '4em',
              }}
            >
            <Routes>
                <Route index element={
                  <WorkspaceSetup
                  buttonClick={this.handleWorkspaceOpen}
                  recipeList={this.state.recipeList}
                  onStepChange={this.handleStepChange}
                  ></WorkspaceSetup>
                } />
                <Route path="github" element={
                  <GithubConnect
                    onStepChange={this.handleStepChange}
                    workspace={this.state.workspace}
                    deploy={this.state.deploy}
                    buttonClick={this.handleWorkspaceOpen}
                  ></GithubConnect>
                } />
                <Route path="custom" element={
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
                } />
                <Route path={`recipe/${this.state.workspace}`} element={
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
                } />
                <Route path="deploy" element={
                  <LoadingPage isProjectLoaded={this.state.isProjectCreated} />
                }/>
            </Routes>
            </Box>
          </ThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default HomeComponent;
