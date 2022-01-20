import '../App.css';
import React from 'react';
import LCUComponent from './LCUComponent';
import {
  Box,
  Button,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
class RecipeProject extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      recipe: [],
      recipeList: [],
      deploy: false,
      orgs: [],
      selectedOrg: '',
    };
    this.handleOpenSource = this.handleOpenSource.bind(this);
    this.handleUseRecipe = this.handleUseRecipe.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleOrgSelect = this.handleOrgSelect.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({
      recipe: this.getCurrentRecipe(this.props.recipeList, this.props.recipeID),
    });
    this.getOrgs();
    window.ORIBITT?.api('track', 'recipe-selected_' + this.state.recipe.Name);
    window.ga(
      'send',
      'pageview',
      window.location.pathname + 'recipe selected: ' + this.state.recipe.Name
    );
  }

  getCurrentRecipe(array, ID) {
    return array.find((element) => {
      return element.ID === ID;
    });
  }

  async getOrgs() {
    fetch('/api/lowcodeunit/github/organizations')
      .then(async (response) => {
        let resp = await response.json();
        if (resp.Status.Code === 0) {
          this.setState({ orgs: resp.Model });
        }
      })
      .then((data) => console.log(data));
  }

  handleBackButton() {
    this.props.buttonClick('');
  }

  handleOrgSelect(event) {
    this.setState({ selectedOrg: event.target.value }, () => {});
  }
  handleOpenSource() {
    let data = {
      RecipeID: this.props.recipeID,
      ProjectName: this.state.recipe.Name,
    };
    fetch('/api/lowcodeunit/create/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log('Request complete! response:', res);
      this.props.projectIsLoaded();
    });
    this.props.onStepChange();
    window.ORIBIT?.api('track', this.state.recipe.Name + '_open_source_deploy');
  }

  handleSubmit() {
    let data = {
      Organization: this.state.selectedOrg,
      RecipeID: this.props.recipeID,
      ProjectName: this.state.recipe.Name,
    };
    fetch('/api/lowcodeunit/create/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log('Request complete! response:', res);
      this.props.projectIsLoaded();
    });
    this.props.onStepChange();
    window.ORIBIT?.api('track', this.state.recipe.Name + '_fork_deploy');
  }
  handleUseRecipe(event) {
    this.setState({ deploy: true });
    this.incrementStep();
  }

  incrementStep() {
    let newStep = this.state.step;
    this.setState({ step: ++newStep });
  }
  decrementStep() {
    let newStep = this.state.step;
    this.setState({ step: --newStep });
  }

  render() {
    let content;
    if (this.state.step === 0) {
      content = (
        <Box>
          <h3>{this.state.recipe.Name}</h3>
          <img src={this.state.recipe.Image} alt={this.state.recipe.Name}></img>
          <p>{this.state.recipe.Desctiption}</p>
          <p>{this.state.recipe.Ingredients}</p>
          <Button onClick={this.handleUseRecipe} variant="contained">
            Use this recipe
          </Button>
        </Box>
      );
    } else if (this.state.step === 1) {
      content = (
        <Box>
          <h3>
            How would you like to deploy the {this.state.recipe.Name} recipe?
          </h3>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              justifyContent: 'space-evenly',
              alignContent: 'center',
              pt: 2,
            }}
          >
            <Paper sx={{ p: 2, m: 2 }}>
              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={this.handleOpenSource}
              >
                Fathym's Open Source Deployment
              </Button>
              <p>
                If you use Fathym's deployment, your project will use NPM
                package versions of your recipe's ingredients. The result will
                be the same, only difference is you won't have automated builds
                under your control.
              </p>
            </Paper>
            <Paper sx={{ p: 2, m: 2 }}>
              <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={this.incrementStep}
              >
                Fork for my Organization
              </Button>
              <p>
                LowCodeUnit will take all you recipe ingredients and create
                copies of them in your personal github organization.
              </p>
            </Paper>
          </Box>
        </Box>
      );
    } else if (this.state.step === 2) {
      content = (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            m: 4,
          }}
        >
          <Box>
            <p>What is your git organization?</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Github Organization
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={this.handleOrgSelect}
                value={this.state.selectedOrg}
              >
                {this.state.orgs &&
                  this.state.orgs.map((org) => (
                    <MenuItem value={org.Name}>{org.Name}</MenuItem>
                  ))}
                ;
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            sx={{ m: 4 }}
            disabled={this.state.selectedOrg === ''}
            onClick={this.handleSubmit}
            size="large"
          >
            Submit
          </Button>
        </Box>
      );
    }
    return (
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={this.handleBackButton}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        {content}
      </Box>
    );
  }
}

export default RecipeProject;
