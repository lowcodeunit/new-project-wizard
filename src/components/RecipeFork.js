import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, IconButton, MenuItem, Paper, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from './Loader';
import DeployDialog from './DeployDialog';

function RecipeFork(props) {
    const recipeLookup = useParams();
    const [selectedOrg, setSelectedOrg] = useState('');
    const [recipe] = useState(getCurrentRecipe(props.recipeList, recipeLookup.id));

    const navigate = useNavigate();
    const handleOrgSelect = e => {
        setSelectedOrg(e.target.value);
        props.selectedRecipe(recipe.ID);
    }

    useEffect(() => {
        if (props.authStatus !== 0) {
            console.log(`authstatus is ${props.authStatus}`)
            navigate(`/recipe/${recipeLookup.id}/connect`)
        }
    }
    )

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
                <Box sx={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', display: 'flex', flexDirection: 'column', height: '75vh' }}>
                    <p>What is your git organization?</p>
                    {props.orgs.length <= 0 && <Loader />}
                    {props.orgs.length > 0 &&
                        <Box sx={{ minWidth: 200 }}>
                            {/* <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"> GitHub Organization</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedOrg}
                                    label="Age"
                                    onChange={handleOrgSelect}
                                >
                                    {props.orgs && props.orgs.map((org) => (
                                        <MenuItem value={org.Name}>{org.Name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> */}
                            <TextField
                                fullWidth
                                value={selectedOrg}
                                onChange={handleOrgSelect}
                                select // tell TextField to render select
                                label="GitHub Organization"
                            >
                                {props.orgs && props.orgs.map((org) => (
                                    <MenuItem value={org.Name}>{org.Name}</MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    }

                    {/* <StyledButton
                        variant="contained"
                        sx={{ m: 4, textTransform: 'none' }}
                        disabled={selectedOrg === ''}
                        onClick={handleSubmit}
                        size="large"
                    >
                        Deploy Project
                    </StyledButton> */}
                    <DeployDialog
                        ButtonLabel="Deploy Project"
                        recipeType="fork"
                        deployPage={`/recipe/${recipe.Lookup}/deploy`}
                        data={ {
                            Organization: selectedOrg,
                            RecipeID: recipe.ID,
                            ProjectName: recipe.Name,
                        }}
                        IsDisabled={selectedOrg === ''}
                        projectIsLoaded = {props.projectIsLoaded}
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default RecipeFork;
