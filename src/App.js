import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LCUComponent from './components/LCUComponent';
import { Box, ThemeProvider } from '@mui/material';
import Header from './components/Header';
import Loader from './components/Loader';
import WorkspaceSetup from './components/WorkspaceSetup';
import CustomProject from './components/CustomProject';
import RecipeFork from './components/RecipeFork';
import RecipeStarter from './components/RecipeStarter'
import GithubConnect from './components/GithubConnect';
import LoadingPage from './components/LoadingPage';
import { createTheme } from '@mui/material/styles';

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
      recipeList: [],
      currentRecipe: '',
      recipesLoaded: false,
      isProjectCreated: false,
      gitHubAuthStatus: null,
      basename: '/dashboard/create-project',
      deploy: false,
      orgs: [],
    };
    this.handleStepChange = this.handleStepChange.bind(this);
    this.projectCreated = this.projectCreated.bind(this);
  }

  componentDidMount() {
    console.log(`Base Href: ${this.loadBaseHref()}`);
    // if(window.location.pathname.includes('/qa/create-project')){
    //   this.setState({basename: '/qa/create-project'})
    // } else if(window.location.hostname.includes('localhost')) {
    //   this.setState({basename:''})
    // }
    this.setState({ basename: this.loadBaseHref() });
    console.log('app component did mount');
    fetch('/api/lowcodeunit/github/connection/valid')
      .then(async (response) => {
        let resp = await response.json();
        if (resp.Status.Code === 0) {
          this.getOrgs();
          this.lcu.track('github_authorized', 'setup/github/authorized', null);
        } else {
          this.lcu.track(
            'github_unauthorized',
            'welcome/github/unauthorized',
            null
          );
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

  getOrgs() {
    fetch('/api/lowcodeunit/github/organizations')
      .then(async (response) => {
        let resp = await response.json();
        if (resp.Status.Code === 0) {
          this.setState({ orgs: resp.Model });
        }
      })
      .then((data) => console.log(data));
  }

  getRecipes() {
    fetch('/api/lowcodeunit/manage/recipes/list').then(async (response) => {
      let resp = await response.json();
      if (resp.Status.Code === 0) {
        this.setState({
          recipeList: resp.Model,
          recipesLoaded: true,
        });
      }
    });
  }

  projectCreated(type, data) {
    this.lcu.track('project_deployed', 'setup/deployed', {
      DeployType: type,
      DeployData: data,
    });

    this.setState({ isProjectCreated: true });
  }

  loadBaseHref() {
    var bases = document.getElementsByTagName('base');
    var baseHref = null;

    if (bases.length > 0) {
      baseHref = bases[0].href;
    }

    baseHref = baseHref.replace(window.location.origin, '');

    if (baseHref.endsWith('/')) {
      baseHref.substring(0, baseHref.length - 2);
    }

    return baseHref;
  }

  handleStepChange(step) {
    this.setState({ currentStep: step });
  }

  getCurrentRecipe(array, ID) {
    return array.find((element) => {
      return element.ID === ID;
    });
  }

  render() {
    let content;
    if (!this.state.gitHubAuthStatus || !this.state.recipesLoaded) {
      content = <Loader />;
    } else {
      content = (
        <Routes>
          <Route
            index
            element={
              <WorkspaceSetup
                authStatus={this.state.gitHubAuthStatus.Code}
                recipeList={this.state.recipeList}
                onStepChange={this.handleStepChange}
              ></WorkspaceSetup>
            }
          />
          <Route
            path={'custom'}
            element={
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  pt: 2,
                }}
              >
                <CustomProject
                  orgs={this.state.orgs}
                  onStepChange={this.handleStepChange}
                  projectIsLoaded={this.projectCreated}
                />
              </Box>
            }
          />
          <Route
            path="custom/connect"
            element={<GithubConnect base={this.state.basename} />}
          />
          <Route path="recipe">
            <Route
              path=":id"
              element={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    pt: 2,
                  }}
                >
                  <RecipeStarter
                    authStatus={this.state.gitHubAuthStatus.Code}
                    recipeID={this.state.workspace}
                    recipeList={this.state.recipeList}
                    onStepChange={this.handleStepChange}
                    projectIsLoaded={this.projectCreated}
                    useRecipeClick={this.handleRecipeForkClick}
                  />
                </Box>
              }
            />
            <Route
              path=":id/fork"
              element={
                <RecipeFork
                  projectIsLoaded={this.projectCreated}
                  orgs={this.state.orgs}
                  recipeList={this.state.recipeList}
                  onStepChange={this.handleStepChange}
                />
              }
            />
            <Route
              path=":id/connect"
              element={<GithubConnect base={this.state.basename} />}
            />
          </Route>
          <Route
            path="deploy"
            element={
              <LoadingPage
                loadingMessages={['initializing enterprise', 'configuring project', 'deploying recipe']}
                isProjectLoaded={this.state.isProjectCreated}
                onStepChange={this.handleStepChange}
              />
            }
          />
        </Routes>
      );
    }

    return (
      <BrowserRouter basename={this.state.basename}>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Helmet>
              <title>Fathym - Welcome</title>
            </Helmet>
            <Header />
            <Box

            >
              {content}
            </Box>
          </ThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default HomeComponent;
