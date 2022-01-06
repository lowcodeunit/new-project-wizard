import '../App.css';
import React from "react";
import {AppBar, Box, Button, Divider, Toolbar, Tooltip} from '@mui/material';
import {ReactComponent as ReactLogo} from '../recipelogos/reactLogo.svg';
import {ReactComponent as AngularLogo} from '../recipelogos/angularLogo.svg';
import {ReactComponent as SvelteLogo} from '../recipelogos/svelteLogo.svg';





class WorkspaceSetup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      customOpen:false,
      recipeOpen:false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAngular = this.handleClickAngular.bind(this);
    this.handleClickReact = this.handleClickReact.bind(this);
    this.handleClickSvelte = this.handleClickSvelte.bind(this);
  }

  handleClick() {
    this.props.buttonClick("custom")
  }
  handleClickAngular() {
    this.props.buttonClick("angular")
  }
  handleClickReact() {
    this.props.buttonClick("react")
  }
  handleClickSvelte() {
    this.props.buttonClick("svelte")
  }

  render(){
      return(

          <Box sx={{ display:'flex', flexDirection: "column"}}>
          <Box>
            <Box sx={{backgroundColor:"grey"}}>
                <h2>Choose my Project Recipe</h2>
                <p>Select an existing Recipe to get started quickly, or create your own custom project.</p>
                <Box sx={{ height:400}}>
                  <Tooltip title="Angular">
                    <Button onClick={this.handleClickAngular}>
                      <AngularLogo className='logos'/>
                    </Button>
                  </Tooltip>
                  <Tooltip title="React">
                    <Button onClick={this.handleClickReact}>
                      <ReactLogo className='logos'/>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Svelte">
                    <Button onClick={this.handleClickSvelte}>
                      <SvelteLogo className='logos'/>
                    </Button>
                  </Tooltip>
                </Box>
            </Box>     
        </Box>
            <Divider variant="middle"/>
            <Box sx={{pt:2, px:15}}>
                <Box>
                  <h2>Custom Projects</h2>
                  <p>Already have your own project in a github repo, or want to start from scratch? Here we'll help you setup the deployment and you do all the coding.</p>
                  <Button size="large" variant="contained" sx={{mt:2}} onClick={this.handleClick}>Create Custom Project</Button>
                </Box>     
            </Box>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
              <Toolbar sx={{ display: 'flex',  justifyContent: 'flex-end'}}>
                  <Button disabled variant="contained"> Review My Project</Button>
              </Toolbar>
            </AppBar>     
          </Box>
      )
  }
}

export default WorkspaceSetup;
