import '../App.css';
import React from "react";
import {Box, Button, ButtonGroup, TextField, Menu, MenuItem } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';






class CustomProject extends React.Component{
  constructor(props){
    super(props);
    this.state={
        step:0,
        ProjectName: '',
        anchorEl: null,
        anchorOriginVertical: 'bottom',
        anchorOriginHorizontal: 'right',
        transformOriginVertical: 'top',
        transformOriginHorizontal: 'right',
        anchorReference: 'anchorEl',
    };
    this.incrementStep = this.incrementStep.bind(this);
    this.decrementStep = this.decrementStep.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
  }
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  incrementStep(){
    console.log("incrementStep " + this.state.step);
    let newStep = ++this.state.step;
    this.setState({step: newStep});
  }
  decrementStep(){
    console.log("decrement " + this.state.step);
    let newStep = --this.state.step;
    this.setState({step: newStep});
  }

  handleProjectNameChange(event) {
    this.setState({ProjectName: event.target.value});
  }

  render(){
      let formPage;
      if(this.state.step === 0) {
        formPage =                 
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <p>Welcome! Let's start with the project basics</p>
            <p>What is your project name?</p>
            <TextField
                id="outlined-basic" 
                label="Project name" 
                variant="outlined"
                required 
                onChange={this.handleProjectNameChange}/>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    padding: 10
                }}
          >
            Ok
          </Button>

      </Box>     
      } else if (this.state.step === 1) {
        formPage = 
          <Box>
            <Box>
                <p>What is your git organization?</p>
                <TextField id="outlined-basic" label="Project name v" variant="outlined" />
            </Box>
            <Box>
                <p>what is your git repository</p>
                <TextField id="outlined-basic" label="Project name" variant="outlined" />
            </Box>
            <Box>
                <p>What is your main branch</p>
                <TextField id="outlined-basic" label="Project name" variant="outlined" />
            </Box>
          </Box>
      } else if (this.state.step === 2) {
        formPage = 
        <Box>
            <Box>
                <p>What is your build command?</p>
                <TextField id="outlined-basic" label="Build Command" variant="outlined" />
            </Box>
            <Box>
                <p>what is your install command</p>
                <TextField id="outlined-basic" label="Install Command" variant="outlined" />
            </Box>
            <Box>
                <p>What is the build output directory</p>
                <TextField id="outlined-basic" label="Output Directory" variant="outlined" />
            </Box>
      </Box>
      }
      return(  
        <Box sx={{display: 'flex', justifyContent:'center', width:'50%', mt:25}}>
            {formPage}
            <Box sx={{ flexDirection: 'row-reverse', mt: "auto"}}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={this.incrementStep} disabled={this.state.step===2}>
                    <KeyboardArrowDownIcon/>
                </Button>
                <Button onClick={this.decrementStep}  disabled={this.state.step===0}>
                    <KeyboardArrowUpIcon/>
                </Button>
            </ButtonGroup>
            </Box>
        </Box>
      )
  }
}

export default CustomProject;
