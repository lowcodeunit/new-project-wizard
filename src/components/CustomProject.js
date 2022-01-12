import '../App.css';
import React from "react";
import {Box, Button, ButtonGroup, FormControl, Select, InputLabel, MenuItem, TextField} from '@mui/material';
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
        orgs:[],
        selectedOrg:'',
        selectedRepo:'',
        selectedBranch:''
    };
    this.incrementStep = this.incrementStep.bind(this);
    this.decrementStep = this.decrementStep.bind(this);
    this.handleOrgSelect = this.handleOrgSelect.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
  }
  
  async componentDidMount() {
    const orgsRes = await this.getOrgs();
    this.setState({orgs: orgsRes});
  }

  async getOrgs(){
    const res = await fetch('https://fathym-cloud-prd-personas-applications-architect.azurewebsites.net/github/'+this.props.enterpriseID+'/'+this.props.username+'/organizations');
    const data = await res.json;
    return res.data.results;
  }
  async getRepos() {
    
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
    let newStep = this.state.step;
    this.setState({step: ++newStep});
  }
  decrementStep(){
    console.log("decrement " + this.state.step);
    let newStep = this.state.step;
    this.setState({step: ++newStep});
  }

  handleOrgSelect(event) {
    this.setState({selectedOrg:event});
  }

  handleProjectNameChange(event) {
    this.setState({ProjectName: event.target.value});
  }

  render(){
      let formPage;
      if(this.state.step === 0) {
        formPage =
        <Box>                 
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <p>Welcome! Let's start with the project basics</p>
            <p>What is your project name?</p>
            <Box sx={{display:"flex", flexDirection:"row"}}>
            <TextField
                autoFocus
                id="outlined-basic" 
                label="Project name" 
                variant="outlined"
                required 
                onChange={this.handleProjectNameChange}/>
       
              <Button>
                Ok
              </Button> 
              </Box> 
              </Box>
              </Box>   
      } else if (this.state.step === 1) {
        formPage = 
          <Box>
            <Box>
                <p>What is your git organization?</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Github Organization</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  >{this.state.orgs &&
                    this.state.orgs.map((org) => (
                      <MenuItem onClick={this.handleOrgSelect}>{org.Name}</MenuItem>
                    ))};
                </Select>
              </FormControl>
            </Box>
            <Box>
                <p>What is your git repository?</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Github Repository</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
            </Box>
            <Box>
                <p>What is your main branch</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Main Branch</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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
