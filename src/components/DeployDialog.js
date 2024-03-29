import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledButton = styled(Button)({
  fontFamily: [
    'Roboto']
})

export default function DeployDialog(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const handleClickOpen = () => {
    if (props.ButtonLabel === "Launch" && window.self !== window.top) {
      console.log("selected launch within iframe");
      console.log("window.location.href is " + window.location.href)
      window.open(window.location.origin + `/dashboard/create-project/recipe/${props.recipe.Lookup}/launch`, '_top').focus();
    } else {
      setOpen(true);
      console.log("THE RECIPE LOOKUP IS " + props.recipe.Lookup);
    }
  };

  function handleSubmit(value) {
    let obj = props.data;
    obj = { ...obj, captchaValue: value };
    fetch('/api/lowcodeunit/create/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    }).then((res) => {
      console.log('Request complete! response:', res.status);
      props.projectIsLoaded('custom', props.data, res.status);
    });
    handleClose();
    navigate(props.deployPage);

  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton
        id="deploy"
        variant="contained"
        sx={{ textTransform: 'none' }}
        onClick={handleClickOpen}
        disabled={props.IsDisabled}
      >
        {props.ButtonLabel}
      </StyledButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please verify you're human"}</DialogTitle>
        <DialogContent>
          <ReCAPTCHA
            sitekey="6Le6dd8hAAAAAMCKiEwWpmiwbGRii5_aMeWnN_tq"
            onChange={handleSubmit}
          />
        </DialogContent>

      </Dialog>
    </div>
  );
}
