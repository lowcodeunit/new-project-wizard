import '../App.css';
import React from "react";
import {AppBar, Box, Button, Divider, Toolbar, Tooltip, Grid} from '@mui/material';

class WorkspaceSetup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      customOpen:false,
      recipeOpen:false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {

  }

  handleClick(id) {
    this.props.buttonClick(id)
    console.log(id);
  }

  render(){
      let recipeSection;
        recipeSection =
        <Box sx={{display:'flex', justifyContent:'center',   alignItems:"center", mx:4}}>
        <Grid container justify="center" rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 2 }} wrap> 
        {this.props.recipeList.map((item) => (
            <Grid order={item.Tier}item xs={6} sm={6} md={4} sx={{height:'15vh'}}>
              <Tooltip title={item.Name}>
                <Button sx={{maxHeight:'15vh'}} onClick={()=> this.handleClick(item.ID)}>
                    <img className="Recipe"
                    src={item.PreviewImage}
                    srcSet={item.PreviewImage}
                    alt={item.Name }
                    />
                    </Button>
              </Tooltip>
            </Grid>
        ))}
        </Grid>
        </Box>

      return(

          <Box sx={{ display:'flex', flexDirection: "column"}}>
          <Box>
          <Box sx={{py:8, px:2}}>
                <Box>
                  <h2>Custom Projects</h2>
                  <p>Already have your own project in a github repo, or want to start from scratch? Here we'll help you setup the deployment and you do all the coding.</p>
                  <Button size="large" variant="contained" sx={{mt:2}} onClick={()=>this.handleClick('custom')}>Create Custom Project</Button>
                </Box>     
            </Box>     
        </Box>
            <Divider variant="middle"/>
            <Box sx={{pt:2}}>
                <h2>Choose Project Recipe</h2>
                <p>Select an existing Recipe to get started quickly, or create your own custom project.</p>
                {recipeSection}
            </Box>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
              <Toolbar sx={{ display: 'flex',  justifyContent: 'flex-end'}}>
                  <Button disabled variant="contained"> Review My Project</Button>
              </Toolbar>
            </AppBar>     
          </Box>
      )
  }
}

export default WorkspaceSetup;
