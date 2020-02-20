import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Resources from "../components/Resources";
import Questions from "../components/Questions";
import Polls from "../components/Polls";


class User extends React.Component {
    constructor() {
        super();
        this.state = {
            questiontxt: "",
            collapsed: false,
            // should be the same as the port you're using for server
            //ENDPOINT: "localhost:5000",
        }
    }

    collapse = () => {
        this.setState ({
            collapsed: !(this.state.collapsed),
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        alert(this.state.questiontxt);
    }

    render() {
        return (
            <div className="Layout">      
                <Grid container>
                    <div>                     
                        <AppBar position="fixed">
                            <Toolbar>
                                <Typography variant="h8">
                                    Welcome to the Workshop!
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper style={{height: "5vh" , width: "1vw"}}></Paper>                                                                
                        <Grid item xs={8}>
                            <Paper style={{height: "35vh" , width: this.state.collapsed ? "95vw" : "78vw"}}>
                                <Polls/>
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={8} >
                        <Paper style={{height: "51vh" , width: this.state.collapsed ? "95vw" : "78vw"}}>
                            <Questions/>
                        </Paper>
                        </Grid>
                        <Grid container>
                            <form style={{width: this.state.collapsed ? "90vw" : "73vw"}} noValidate autoComplete = "off" onSubmit = {this.submitForm} onChange = {this.handleChange}>
                                <TextField fullWidth placeholder="Ask a Question" id = "questiontxt" label = "Question" variant = "outlined" />
                            </form>
                            <Button onClick={this.submitForm} variant = "containted" color = "primary">
                                Submit
                            </Button>
                        </Grid>
                    </div>
                    
                    <div>
                        <Paper style={{height: "5vh" , width: "1vw"}}></Paper>  
                        <Grid container>                                                              
                            <Button style={{height: "95vh", width: "1vh"}} onClick={this.collapse} fullwidth variant="outlined"> {this.state.collapsed ? "<" : ">"} </Button>
                            <Grid item xs={4}>
                                <Paper style={{height: this.state.collapsed ? "0vh" : "93vh", width: this.state.collapsed ? "0vh" : "34vh"}}>
                                    {this.state.collapsed ? false : <Resources />}
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>          
                    
                </Grid>                
            </div>
        )
    }
}

export default User;