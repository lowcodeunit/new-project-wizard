import '../App.css';
import React from "react";
import { Box, Button, Paper } from '@mui/material';
import { ReactComponent as ReactLogo } from '../recipelogos/reactLogo.svg';
import { ReactComponent as AngularLogo } from '../recipelogos/angularLogo.svg';
import { ReactComponent as SvelteLogo } from '../recipelogos/svelteLogo.svg';
import { TimerSharp } from '@mui/icons-material';






class RecipeProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: '',
            deploy: false
        };
        this.handleUseRepcipe = this.handleUseRepcipe.bind(this);
    }

    handleUseRepcipe(event) {
       this.setState({deploy:true});
    }

    render() {
        let recipeForms;
        if(this.props.recipe === 'angular' && this.state.deploy === true){
            recipeForms= 
            <Box>
                <h2>How would you like to deply this recipe?</h2>
                <Box  sx={{ display: 'flex',  justifyContent: 'space-evenly', pt:2}}>   
            <Paper sx={{p:3}}>
                <Button variant="contained" sx={{mb:2}} onClick={this.authGit}>Fathym's Open Source Deployment</Button>
                <Box sx={{textAlign:"left"}}>
                    <p>LowCodeUnit will take all you recipe ingredients and create copies of them in your personal github organization.</p>
                </Box>
            </Paper>
            <Paper sx={{p:2}}>
                <Button variant="contained" sx={{mb:2}}>
                    Fork your organization
                </Button>
                <Box sx={{textAlign:"left"}}>
                    <p>LowCodeUnit will take all you recipe ingredients and create copies of them in your personal github organization.</p>
                </Box>
            </Paper>
        </Box>
            </Box>
        }



        else if (this.props.recipe === 'angular') {
            recipeForms =
                <Box sx={{ display: "flex", flexDirection: "column", m: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <AngularLogo className='logos' />
                    </Box>
                    <Box>
                        <h2>Angular</h2>
                        <Box sx={{ textAlign: "left", ml: 6 }}>
                            <p>
                                Angular (commonly referred to as "Angular 2+" or "Angular CLI")[4][5] is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.
                                 Angular is a complete rewrite from the same team that built AngularJS. Angular is used as the frontend of the MEAN stack, consisting of MongoDB database, Express.js web application server framework, 
                                 Angular itself (or AngularJS), and Node.js server runtime environment.
                            </p>
                        </Box>
                    </Box>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={this.handleUseRepcipe}>Use this Recipe</Button>
                </Box>
        }
        if (this.props.recipe === 'react') {
            recipeForms =
                <Box sx={{ display: "flex", flexDirection: "column", m: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <ReactLogo className='logos' />
                    </Box>
                    <Box>
                        <h2>React</h2>
                        <Box sx={{ textAlign: "left", ml: 6 }}>
                            <p>React is a library for helping developers build user interfaces (UIs) as a tree of small pieces called components. A component is a mixture of HTML and JavaScript that captures all of the logic required to display a small section of a larger UI.
                                Each of these components can be built up into successively complex parts of an app. The rest is just details.</p>
                        </Box>
                    </Box>
                    <Button variant="contained" sx={{ mt: 2 }}>Use this Recipe</Button>
                </Box>
        }
        if (this.props.recipe === 'svelte') {
            recipeForms =
                <Box sx={{ display: "flex", flexDirection: "column", m: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <SvelteLogo className='logos' />
                    </Box>
                    <Box>
                        <h2>Svelte</h2>
                        <Box sx={{ textAlign: "left", ml: 6 }}>
                            <p>a front-end, open-source JavaScript framework for making interactive webpages.
                                The general concept behind Svelte is similar to pre-existing frameworks like React and Vue in that it enables developers to make web apps.
                                However, Svelte brings several features to the table that provides developers with a unique experience.</p>
                        </Box>
                    </Box>
                    <Button variant="contained" sx={{ mt: 2 }}>Use this Recipe</Button>
                </Box>
        }
        return (
            <Box sx={{width:"50%"}}>
                {recipeForms}
            </Box>
        )
    }
}

export default RecipeProject;
