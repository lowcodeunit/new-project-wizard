import './App.css';
import React from "react";
import { AppBar, Box,  Toolbar, Typography, IconButton, Divider} from '@mui/material'
import ProgressTracker from './components/ProgressTracker';
import WorkspaceSetup from './components/WorkspaceSetup';
import CustomProject from './components/CustomProject';
import RecipeProject from './components/RecipeProject';
import WelcomePage from './components/WelcomePage';
import CloseIcon from '@mui/icons-material/Close';


class HomeComponent extends React.Component{
  constructor(){
    super();
    this.state={
      currentStep:0,
      workspace:''
    };
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleWorkspaceOpen = this.handleWorkspaceOpen.bind(this);
  }

  handleStepChange(){
    this.setState({currentStep:++this.state.currentStep})
  }
  handleWorkspaceOpen(event){
    this.setState({workspace: event})
  }

  render() {
    let content;
    if(this.state.currentStep === 0) {
      content= <WelcomePage onStepChange={this.handleStepChange}></WelcomePage>
    } else if (this.state.currentStep === 1) {
      if(this.state.workspace === 'custom'){
        console.log("WS ===== "  + this.state.workspace + " ======");
        content = <Box sx={{display:"flex", flexDirection: "row"}}>
          <WorkspaceSetup buttonClick={this.handleWorkspaceOpen}></WorkspaceSetup>
          <Divider orientation='vertical'/>
          <CustomProject/>
        </Box>
      } else if (this.state.workspace === '') {
        content = <WorkspaceSetup buttonClick={this.handleWorkspaceOpen}></WorkspaceSetup>
      } else {
      
      content = 
      <Box sx={{display:"flex", flexDirection: "row"}}>
        <WorkspaceSetup buttonClick={this.handleWorkspaceOpen}></WorkspaceSetup>
        <Divider orientation='vertical'/>
        <RecipeProject recipe={this.state.workspace}/>
      </Box>
      }
    }
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
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
        <ProgressTracker step={this.state.currentStep}></ProgressTracker>
        {content}
      </div>
    );
  }
}


export default HomeComponent;
