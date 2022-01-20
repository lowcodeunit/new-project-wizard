import './App.css';
import React from "react";
import { AppBar, Box,  Toolbar, Typography, IconButton, ThemeProvider} from '@mui/material'
import ProgressTracker from './components/ProgressTracker';
import WorkspaceSetup from './components/WorkspaceSetup';
import CustomProject from './components/CustomProject';
import RecipeProject from './components/RecipeProject';
import WelcomePage from './components/WelcomePage';
import LoadingPage from './components/LoadingPage';
import CloseIcon from '@mui/icons-material/Close';
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

class HomeComponent extends React.Component{
  constructor(){
    super();
    this.state={
      currentStep:0,
      workspace:'',
      recipeList:[],
      isProjectCreated: false
    };
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleWorkspaceOpen = this.handleWorkspaceOpen.bind(this);
    this.projectCreated = this.projectCreated.bind(this);
  }

  get ga() {
    if (!window.ga?.send) {
      return null;
    } else {
      return {
        send: window.ga?.send
      };
    }
  }

  componentDidMount() {
    fetch('/api/lowcodeunit/github/connection/valid').then( async response => {
      let resp = await response.json();
      console.log(resp);
      console.log(resp.Status.Message)
      if(resp.Status.Code === 0){
        window.ORIBIT?.api('track','setup_page_user_pre_authed');
        window.ga('send', 'pageview', window.location.pathname + 'setup page: user already authed')
        this.setState({currentStep:1});
      } else {
        window.ORIBIT?.api('track','welcome_page_visit')
        window.ga('send', 'pageview', window.location.pathname + 'welcome page visit')
      }
    }).then(data => console.log(data));

    this.getRecipes()
  }
  getRecipes(){
    fetch('/api/lowcodeunit/manage/recipes/list').then( async response => {
      let resp = await response.json();
      if(resp.Status.Code === 0){
        this.setState({recipeList: resp.Model})
      }
    }).then(this.setState({recipesLoaded: true}));
  }

  projectCreated() {
    this.setState({isProjectCreated:true})
  }

  handleStepChange(){
    let step = this.state.currentStep
    this.setState({currentStep:++step})
  }
  handleWorkspaceOpen(event){
    this.setState({workspace: event})
    console.log("click is " + event )
  }

  render() {
    let content;
    if(this.state.currentStep === 0) {
      content= <WelcomePage onStepChange={this.handleStepChange}></WelcomePage>
    } 
    else if (this.state.currentStep === 1) {
      if(this.state.workspace === 'custom'){
        content = <Box sx={{display:"flex", flexDirection: "row",  justifyContent: 'space-evenly', pt:2}}>
          <CustomProject buttonClick={this.handleWorkspaceOpen}  onStepChange={this.handleStepChange} projectIsLoaded={this.projectCreated}/>
        </Box>
      } else if (this.state.workspace === '') {
        content = <WorkspaceSetup buttonClick={this.handleWorkspaceOpen} recipeList = {this.state.recipeList} onStepChange={this.handleStepChange} ></WorkspaceSetup>
      } else {
      content = 
      <Box sx={{display:"flex", flexDirection: "row", justifyContent: 'space-evenly', pt:2}}>
        <RecipeProject buttonClick={this.handleWorkspaceOpen} recipeID={this.state.workspace} recipeList = {this.state.recipeList} onStepChange={this.handleStepChange} projectIsLoaded={this.projectCreated}/>
      </Box>
      }
    }
    else if (this.state.currentStep === 2) {
      content =
      <LoadingPage isProjectLoaded={this.state.isProjectCreated}/>
    }
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <Box>

              </Box>
              <Typography edge="start" variant="h6" sx={{ flexGrow: 1 }}>

              </Typography>
              <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              >
              <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <ProgressTracker workspace={this.state.workspace} step={this.state.currentStep}></ProgressTracker>
          {content}
        </ThemeProvider>
      </div>
    );
  }
}


export default HomeComponent;
