import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, FormControl, IconButton, InputLabel, Select, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from './Loader';

function RecipeFork(props) {
    const recipeLookup = useParams();
    const [selectedOrg, setSelectedOrg] = useState('');
    const [recipe] = useState(getCurrentRecipe(props.recipeList, recipeLookup.id));
    const { onStepChange } = props;

    const navigate = useNavigate();
    const handleOrgSelect = e => {
        setSelectedOrg(e.target.value);
    }

    useEffect(() => onStepChange(1), [onStepChange]);


    function getCurrentRecipe(array, lookup) {
        return array.find((element) => {
            return element.Lookup === lookup;
        });
    }

    function handleSubmit() {
        let data = {
            Organization: selectedOrg,
            RecipeID: recipe.ID,
            ProjectName: recipe.Name,
        };
        fetch('/api/lowcodeunit/create/project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log('Request complete! response:', res);
            props.projectIsLoaded();
        });
        navigate('/deploy');
    }

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems:'center',
                my: 4,
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                }}
            >
                <Link to={`/recipe/${recipeLookup.id}`}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
            </Box>
            <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <p>What is your git organization?</p>
                {props.orgs.length <= 0 && <Loader />}
                {props.orgs.length > 0 &&
                    <Box sx={{ minWidth: 200}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"> Github Organization</InputLabel>
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
                        </FormControl>
                    </Box>
                }
            </Box>
            <Button
                variant="contained"
                sx={{ m: 4 }}
                disabled={selectedOrg === ''}
                onClick={handleSubmit}
                size="large"
            >
                Deploy Project
            </Button>
        </Box>
    );
}

export default RecipeFork;
