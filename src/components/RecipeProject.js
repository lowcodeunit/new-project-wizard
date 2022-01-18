import '../App.css';
import React from "react";
import { Box, Button, Paper, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
class RecipeProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            recipe: [],
            recipeList:[],
            deploy: false
        };
        this.handleOpenSource = this.handleOpenSource.bind(this);
        this.handleUseRecipe = this.handleUseRecipe.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    async componentDidMount() {
        this.setState({recipe: this.getCurrentRecipe(this.props.recipeList, this.props.recipeID)})
    }

    getCurrentRecipe(array, ID) {
        return array.find((element) => {
            return element.ID === ID;
        })
    }   

    handleBackButton() {
        this.props.buttonClick("");
    }
    handleOpenSource() {
        let data = 
            {
                RecipeID: this.props.recipeID,
                ProjectName: this.state.recipe.Name
            }
        ;
        fetch("/api/lowcodeunit/create/project", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        });
        this.props.onStepChange()
    }
    handleUseRecipe(event) {
       this.setState({deploy:true});
       this.incrementStep();
    }

    incrementStep(){
        let newStep = this.state.step;
        this.setState({step: ++newStep});
      }
      decrementStep(){
        let newStep = this.state.step;
        this.setState({step: --newStep});
      }

    render() {
        let content;
        if(this.state.step === 0) {
            content = 
            <Box>
                <h3>{this.state.recipe.Name}</h3>
                <img src={this.state.recipe.Image} alt={this.state.recipe.Name}></img>
                <p>{this.state.recipe.Desctiption}</p>
                <p>{this.state.recipe.Ingredients}</p>
                <Button onClick={this.handleUseRecipe}>Use this recipe</Button>
            </Box>
        } else if(this.state.step === 1) {
            content =
            <Box>
                <h3>How would you like to deploy the {this.state.recipe.Name} recipe?</h3>
                <Box  sx={{ display: 'flex', flexDirection:{ xs:'column', sm:'column', md:'row'},  justifyContent: 'space-evenly', pt:2}}>
                <Paper sx={{p:2, m:2}}>
                    <Button variant="contained" sx={{mb:2}} onClick={this.handleOpenSource} >Fathym's Open Source Deployment</Button>
                    <p>If you use Fathym's deployment, your project will use NPM package versions of your recipe's ingredients. The result will be the same, only difference is you won't have automated builds under your control.</p>
                </Paper>
                <Paper sx={{p:2, m:2}}>
                    <Button variant="contained" sx={{mb:2}} >Fork for my Organization</Button>
                    <p>LowCodeUnit will take all you recipe ingredients and create copies of them in your personal github organization.</p>
                </Paper>
                </Box>
            </Box>
        }
        return (
            <Box sx={{width:"100%"}}>
                <Box sx={{display:'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width:'100%'}}>
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

        )
    }
}

export default RecipeProject;
