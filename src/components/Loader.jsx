import '../App.css';
import React from 'react';
import { Box, CircularProgress} from '@mui/material';


function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3,
            }}
        >
            <CircularProgress color="primary" />
        </Box>
    );
}
export default Loader;

