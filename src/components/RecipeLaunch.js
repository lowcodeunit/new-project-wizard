import '../App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from "react-router-dom";
import { Box, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeployDialog from './DeployDialog';

function RecipeLaunch(props) {
    const buttonRef = useRef(null);
    const recipeLookup = useParams();
    const [recipe] = useState(getCurrentRecipe(props.recipeList, recipeLookup.id));

    useEffect(() => {
        if (recipe !== null) { document.getElementById("deploy").click(); }

    }, [recipe]);

    function getCurrentRecipe(array, lookup) {
        return array.find((element) => {
            return element.Lookup === lookup;
        });
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

            <Paper sx={{ width: ['90%', '80%', '60%'], display: 'flex', flexDirection: 'column', my: 2, py: 2 }} elevation={6}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >
                    <Link to={`/`}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="menu"
                        >
                            <ArrowBackIcon color="primary" />
                        </IconButton>
                    </Link>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {recipe && (
                        <Box>
                            <h2>{recipe.Name}</h2>

                            <img
                                className="starterImage"
                                src={recipe.Image}
                                alt={recipe.Name}
                            ></img>

                            <p>{recipe.Description}</p>
                            <DeployDialog
                                ref={buttonRef}
                                ButtonLabel="Launch"
                                recipe={recipe}
                                recipeType="opensource"
                                deployPage={`/recipe/${recipe.Lookup}/deploy`}
                                data={{
                                    RecipeID: recipe.ID,
                                    ProjectName: recipe.Name,
                                }}
                                projectIsLoaded={props.projectIsLoaded}
                            />
                        </Box>
                    )}
                </Box>
            </Paper >
        </Box >
    );
}

export default RecipeLaunch;
