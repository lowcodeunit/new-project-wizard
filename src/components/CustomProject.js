import '../App.css';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import LCUComponent from './LCUComponent';
import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  TextField,
  IconButton,
  Menu,
  Paper,
  CircularProgress
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeployDialog from './DeployDialog';

const StyledButton = styled(Button)({
  fontFamily: [
    'Roboto']
})
class CustomProject extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      anchorEl: null,
      buildCommand: 'npm run build',
      buildOutput: './',
      buildInstall: 'npm i',
      buildMenuOpen: false,
      callData: null,
      step: 0,
      ProjectName: '',
      branches: [],
      repos: [],
      selectedOrg: '',
      selectedRepo: '',
      selectedBranch: '',
      readyToSubmit: false,
      captchaValue: ''
    };
    this.handBuildMenuToggle = this.handBuildMenuToggle.bind(this);
    this.handleBuildMenuClose = this.handleBuildMenuClose.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.decrementStep = this.decrementStep.bind(this);
    this.handleBranchSelect = this.handleBranchSelect.bind(this);
    this.handleOrgSelect = this.handleOrgSelect.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleBuildChange = this.handleBuildChange.bind(this);
    this.handleInstallChange = this.handleInstallChange.bind(this);
    this.handleOutputChange = this.handleOutputChange.bind(this);
    this.handleRepoSelect = this.handleRepoSelect.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.handleReCaptchaChange = this.handleReCaptchaChange.bind(this)
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  async componentDidMount() {
    this.lcu.track('custom_project_selected', 'setup/custom', null);
    this.lcu.track('project_selected', null, {
      DeployType: 'custom',
    });
    if (this.props.authStatus !== 0) {
      this.setState({ redirect: <Navigate to="connect" /> })
    }
  }
  async getBranches() {
    fetch(
      '/api/lowcodeunit/github/organizations/' +
      this.state.selectedOrg +
      '/repositories/' +
      this.state.selectedRepo +
      '/branches'
    )
      .then(async (response) => {
        let resp = await response.json();
        if (resp.Status.Code === 0) {
          this.setState({ branches: resp.Model });
        }
      })
      .then((data) => console.log(data));
  }

  async getOrgRepositories() {
    fetch(
      '/api/lowcodeunit/github/organizations/' +
      this.state.selectedOrg +
      '/repositories'
    )
      .then(async (response) => {
        let resp = await response.json();
        if (resp.Status.Code === 0) {
          this.setState({ repos: resp.Model });
        }
      })
      .then((data) => console.log(data));
  }

  incrementStep() {
    let newStep = this.state.step;
    this.setState({ step: ++newStep });
  }
  decrementStep() {
    let newStep = this.state.step;
    this.setState({ step: --newStep });
  }
  handleBackButton() {
    this.props.buttonClick('');
  }
  handleBranchSelect(event) {
    this.setState({
      selectedBranch: event.target.value,
    }, () => {
      this.readyToSubmit();
    });
  }

  handleOrgSelect(event) {
    this.setState({ selectedOrg: event.target.value }, () => {
      this.readyToSubmit();

      this.getOrgRepositories();
    });
  }

  handleReCaptchaChange(value) {
    console.log("Captcha value:", value);
    this.setState({
      captchaValue: value
    })

  }

  handleRepoSelect(event) {
    this.setState({ selectedRepo: event.target.value }, () => {
      this.readyToSubmit();
      this.getBranches();
    });
  }

  handleBuildChange(event) {
    this.setState({ buildCommand: event.target.value }, () => {
      this.readyToSubmit();
    });
  }

  handleInstallChange(event) {
    this.setState({ buildInstall: event.target.value }, () => {
      this.readyToSubmit();
    });
  }

  handleOutputChange(event) {
    console.log("== " + event.target.value)
    this.setState({ buildOutput: event.target.value, buildMenuOpen: false }, () => {
      this.readyToSubmit();
    });
  }

  handBuildMenuToggle(event) {
    console.log("toggled anchor " + this.state.anchorEl)

    this.setState({
      buildMenuOpen: !this.state.buildMenuOpen,
      anchorEl: event.currentTarget
    });

    console.log(`anchor el is ${this.state.anchorEl}`)
  };
  handleBuildMenuClose(event) {
    console.log(`event is ${event} `)
    this.setState({
      buildOutput: event,
      anchorEl: null,
      buildMenuOpen: !this.state.buildMenuOpen,
    })
    this.readyToSubmit();
  }

  handleLinkClick() {
    if (this.state.step === 0) {
      this.setState({ redirect: <Navigate to={`/`} /> });
    } else {
      this.decrementStep();
    }
  }

  handleProjectNameChange(event) {
    this.setState({ ProjectName: event.target.value }, () => {
      this.readyToSubmit();
    });
  }

  // handleSubmit() {
  //   let data = {
  //     Branch: this.state.selectedBranch,
  //     BuildCommand: this.state.buildCommand,
  //     InstallCommand: this.state.buildInstall,
  //     Organization: this.state.selectedOrg,
  //     OutputDirectory: this.state.buildOutput,
  //     ProjectName: this.state.ProjectName,
  //     Repository: this.state.selectedRepo,
  //   };
  //   fetch('/api/lowcodeunit/create/project', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   }).then((res) => {
  //     console.log('Request complete! response:', res);
  //     this.props.projectIsLoaded('custom', data);
  //   });
  //   this.props.onStepChange();
  //   this.lcu.track('project_submitted', null, {
  //     DeployType: 'custom',
  //     DeployData: data,
  //   });
  // }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.incrementStep();
    }
  }
  readyToSubmit() {
    if (
      this.state.buildCommand !== '' &&
      this.state.buildInstall !== '' &&
      this.state.buildOutput !== '' &&
      this.state.selectedBranch !== '' &&
      this.state.selectedOrg !== '' &&
      this.state.selectedRepo !== '' &&
      this.state.ProjectName !== ''
    ) {
      this.setState({
        readyToSubmit: true,
        callData: {
          Branch: this.state.selectedBranch,
          BuildCommand: this.state.buildCommand,
          InstallCommand: this.state.buildInstall,
          Organization: this.state.selectedOrg,
          OutputDirectory: this.state.buildOutput,
          ProjectName: this.state.ProjectName,
          Repository: this.state.selectedRepo,
        }
      });
    }
  }

  render() {
    let formPage;
    if (this.state.step === 0) {
      formPage = (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', display: 'flex', flexDirection: 'column', minHeight: '75vh' }}>
          <p>Welcome! Let's start with the project basics</p>
          <p>What is your project name?</p>
          <Box>
            <TextField
              autoFocus
              id="outlined-basic"
              label="Project name"
              variant="outlined"
              defaultValue={this.state.ProjectName}
              onChange={this.handleProjectNameChange}
              onKeyDown={this.keyPress}
            />
          </Box>
          <StyledButton
            variant="contained"
            sx={{ mt: 4, textTransform: 'none' }}
            onClick={this.incrementStep}
          >
            Next
          </StyledButton>
        </Box>
      );
    } else if (this.state.step === 1) {
      formPage = (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', display: 'flex', flexDirection: 'column', minHeight: '75vh' }}>
          <Box>
            <p>What is your git organization?</p>
            <TextField
              fullWidth
              value={this.state.selectedOrg}
              onChange={this.handleOrgSelect}
              select // tell TextField to render select
              label="GitHub Organization"
            >
              {this.props.orgs &&
                this.props.orgs.map((org) => (
                  <MenuItem value={org.Name}>{org.Name}</MenuItem>
                ))}
            </TextField>
          </Box>
          <Box>
            <p>What is your git repository?</p>
            <TextField
              fullWidth
              disabled={this.state.selectedOrg === ''}
              onChange={this.handleRepoSelect}
              value={this.state.selectedRepo}
              select // tell TextField to render select
              label="GitHub Repository"
            >
              {this.state.repos &&
                this.state.repos.map((repo) => (
                  <MenuItem value={repo.Name}>{repo.Name}</MenuItem>
                ))}
              ;
            </TextField>
          </Box>
          <Box>
            <p>What is your main branch?</p>
            <TextField
              fullWidth
              disabled={this.state.selectedRepo === ''}
              onChange={this.handleBranchSelect}
              value={this.state.selectedBranch}
              select // tell TextField to render select
              label="Main Branch"
            >

              {this.state.branches &&
                this.state.branches.map((branch) => (
                  <MenuItem value={branch.Name}>{branch.Name}</MenuItem>
                ))}
              ;
            </TextField>
          </Box>
          <StyledButton
            variant="contained"
            sx={{ mt: 4, textTransform: 'none' }}
            onClick={this.incrementStep}
            size="large"
          >
            Next
          </StyledButton>
        </Box>
      );
    } else if (this.state.step === 2) {
      formPage = (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', display: 'flex', flexDirection: 'column', minHeight: '75vh' }}>
          <Box>
            <p>What is your build command?</p>
            <TextField
              id="outlined-basic"
              label="Build Command"
              variant="outlined"
              onChange={this.handleBuildChange}
              defaultValue={this.state.buildCommand}
            />
          </Box>
          <Box>
            <p>what is your install command?</p>
            <TextField
              id="outlined-basic"
              label="Install Command"
              variant="outlined"
              onChange={this.handleInstallChange}
              defaultValue={this.state.buildInstall}
            />
          </Box>
          <Box>
            <p>What is the build output directory?</p>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Output Directory"
                  variant="outlined"
                  value={this.state.buildOutput}
                  onChange={this.handleOutputChange}
                  defaultValue={this.state.buildOutput}
                />

                <Button
                  size="small"
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={this.handBuildMenuToggle}
                  variant="contained"
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>

              <Menu
                id="basic-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.buildMenuOpen}
                onClose={this.handleOutputChange}
                onChange={this.handleOutputChange}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => this.handleBuildMenuClose("./")}>Basic HTML - ./</MenuItem>
                <MenuItem onClick={() => this.handleBuildMenuClose("./build")}>React - ./build</MenuItem>
                <MenuItem onClick={() => this.handleBuildMenuClose("./dist")}>Angular, Vue - ./dist</MenuItem>
                <MenuItem onClick={() => this.handleBuildMenuClose("./public")}>Svelte - ./public</MenuItem>
              </Menu>


            </Box>
          </Box>
          <Box sx={{ width: ['80%', '60%', '40%'], pt: 2, pb: 2 }}>
            <p>
              Select a predefined value or enter your custom output directory.
            </p>
          </Box>
          {/* <StyledButton
            variant="contained"
            sx={{ mt: 4, textTransform:'none' }}
            disabled={!this.state.readyToSubmit && this.state.captchaValue !== ''}
            onClick={this.handleSubmit}
            size="large"
          >
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/custom/deploy">
              Deploy Project
            </Link>
            
          </StyledButton> */}
          <DeployDialog
            ButtonLabel="Deploy"
            data={this.state.callData}
            deployPage="/custom/deploy"
            IsDisabled={!this.state.readyToSubmit}
            projectIsLoaded={this.props.projectIsLoaded}
          />
        </Box >
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
          <title>Fathym - Custom Project</title>
        </Helmet>
        <Paper sx={{ width: ['90%', '80%', '60%'], display: 'flex', flexDirection: 'column', my: 2, py: 2 }} elevation={6}>
          {this.state.redirect}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <Box onClick={this.handleLinkClick}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
              >
                <ArrowBackIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
          {formPage}
          <Box sx={{ flexDirection: 'row-reverse', mt: 'auto' }}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={this.incrementStep}
                disabled={this.state.step === 2}
              >
                <KeyboardArrowDownIcon />
              </Button>
              <Button
                onClick={this.decrementStep}
                disabled={this.state.step === 0}
              >
                <KeyboardArrowUpIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Paper>
      </Box>
    );
  }
}

export default CustomProject;
