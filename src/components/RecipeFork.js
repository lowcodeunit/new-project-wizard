import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, FormControl, IconButton, InputLabel, Select, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from './Loader';

function RecipeFork(props) {
    const recipeLookup = useParams();
    const [orgs] = useState(getOrgs());
    const [selectedOrg, setSelectedOrg] = useState('');
    const [content, setContent] = useState(<Loader />);
    const [recipe] = useState(getCurrentRecipe(props.recipeList, recipeLookup.id));
    const { onStepChange } = props;
    
    const navigate = useNavigate();
    const handleOrgSelect = e => {
        setSelectedOrg(e.target.value);
    }

    let loadedForm = <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
            Github Organization
        </InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleOrgSelect}
            value={selectedOrg}
        >
            {orgs &&
                orgs.map((org) => (
                    <MenuItem value={org.Name}>{org.Name}</MenuItem>
                ))}
            ;
        </Select>
    </FormControl>;

    useEffect(() => onStepChange(1), [onStepChange]);


    function getCurrentRecipe(array, lookup) {
        return array.find((element) => {
            return element.Lookup === lookup;
        });
    }

    function handleSubmit() {
        let data = {
            Organization: selectedOrg,
            RecipeID: recipe.recipeID,
            ProjectName: recipe.Name,
        };
        fetch('/api/lowcodeunit/create/project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log('Request complete! response:', res);
            this.props.projectIsLoaded();
        });
        navigate('/deploy');
    }

    function getOrgs() {
        fetch('/api/lowcodeunit/github/organizations')
            .then(async (response) => {
                let resp = await response.json();
                if (resp.Status.Code === 0) {
                    setContent(loadedForm)
                    return resp.Model;
                }
            })
            .then((data) => console.log(data));
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                m: 4,
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
            <Box>
                <p>What is your git organization?</p>
                {content}
            </Box>
            <Button
                variant="contained"
                sx={{ m: 4 }}
                disabled={selectedOrg === ''}
                onClick={handleSubmit}
                size="large"
            >
                Submit
            </Button>
        </Box>
    );
}

export default RecipeFork;
