import '../App.css';
import React from 'react';
import LCUComponent from './LCUComponent';
import Box from '@mui/material/Box';
import { Stepper, Step, StepLabel } from '@mui/material';

let steps = ['Select Recipe', 'Configure Project', 'Project Deployed'];

class ProgressTracker extends LCUComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box sx={{ pt: 2 }}>
        <Stepper activeStep={this.props.step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }
}

export default ProgressTracker;
