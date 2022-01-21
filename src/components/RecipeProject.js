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
      deploy: props.deploy,
      orgs: [],
      selectedOrg: '',
    };
    this.handleOpenSource = this.handleOpenSource.bind(this);
    this.handleForkRecipe = this.handleForkRecipe.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleOrgSelect = this.handleOrgSelect.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState(
      {
        recipe: this.getCurrentRecipe(
          this.props.recipeList,
          this.props.recipeID
        ),
      },
      () => {
        this.getOrgs();
        this.lcu.track(
          `recipe_selected-${this.state.recipe.Name}`,
          `setup/recipe/${this.state.recipe.Name}`
        );
      }
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
    if (!this.state.deploy) {
      this.props.buttonClick('');
    } else {
      let deployState = { deploy: false };
      this.setState(deployState);
      this.props.useRecipeClick(deployState);
    }
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
    this.lcu.track(`recipe_deploy_open_source-${this.state.recipe.Name}`, null);
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
    this.lcu.track(`recipe_deploy_fork-${this.state.recipe.Name}`, null);
  }
  handleForkRecipe(event) {
    let deployState = { deploy: true };
    this.setState(deployState);
    this.props.useRecipeClick(deployState);
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
    if (!this.state.deploy) {
      content = (
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              justifyContent: 'space-evenly',
              alignContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '425px',
              }}
            >
              <h2>{this.state.recipe.Name}</h2>

              <img
                src={this.state.recipe.Image}
                alt={this.state.recipe.Name}
              ></img>

              <p>{this.state.recipe.Description}</p>

              <h3>Ingredients</h3>

              <p>{this.state.recipe.Ingredients}</p>
            </Box>
          </Box>

          <Box sx={{ marginTop: '4em' }}>
            <h4>Choose your deployment path</h4>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                justifyContent: 'space-evenly',
                alignContent: 'center',
                pt: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '400px',
                  width: '100%',
                }}
              >
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={this.handleOpenSource}
                >
                  Deploy from open source
                </Button>

                <Paper sx={{ p: 2, m: 2 }}>
                  <p>
                    If you use Fathym's deployment, your project will use NPM
                    package versions of your recipe's ingredients. The result
                    will be the same, only difference is you won't have
                    repositories or automated builds under your control.
                  </p>
                </Paper>
              </Box>

              <Box
                sx={{
                  maxWidth: '400px',
                  width: '100%',
                }}
              >
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={this.handleForkRecipe}
                >
                  Fork this Recipe
                </Button>

                <Paper sx={{ p: 2, m: 2 }}>
                  <p>
                    LowCodeUnit will take all you recipe ingredients and create
                    copies of them in your personal github organization. This
                    will setup everything you need for modern DevOps; source
                    repositories, build pipelines, and deployments.
                  </p>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else if (this.state.deploy) {
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
            Deploy Project
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
