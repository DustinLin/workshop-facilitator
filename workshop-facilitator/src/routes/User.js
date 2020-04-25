import React from "react";
import SplitPane from 'react-split-pane';
import Resources from "../components/Resources";
import Questions from "../components/Questions";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Polls from "../components/Polls";
import io_client from "socket.io-client"
import "../styles/User.css";



let socket;

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            question: "",
            // should be the same as the port you're using for server
            ENDPOINT: "localhost:5000",
            room: null
        }
    }

    componentDidMount(){
        // make connection between this client and the server (which is active on port 5000)
        socket = io_client(this.state.ENDPOINT);


        //get fetches the room by ID if the ID was sent,saves in state
        if(this.props.location.state != null){
            console.log("Here is the ID: " + this.props.location.state.roomID);
            //this.setState( {roomID: this.props.location.state.roomID} );
            //console.log("Here is the ID that was passed: " +  this.state.roomID);
            let getString = "http://localhost:5000/rooms/" + this.props.location.state.roomID;
            console.log("getString: " + getString);

            fetch(getString, {
                method: 'get',
            })
            .then((resp) => resp.json())
            // if success and data was sent back, log the data
            .then((data) => this.setState({ room: data}) )
            // if failure, log the error
            .catch((err) => console.log("Error", err));


        }

    }

    postQuestion = (e) => {
        e.preventDefault();
        const newQst = this.state.question;
        console.log(newQst);
        // emit question for all users to see
        if (newQst) socket.emit("question", {question: newQst});

        let questionData = {"question" : this.state.question}
        let getRoom = 'http://localhost:5000/rooms/' + this.state.room._id + '/questions/add';
        console.log('getRoom: ' + getRoom);

        fetch(getRoom, {
            // send as a POST request with new room information in body,
            //POST fetch("the API route that adds a new question, {method: "POST", body:
            //{question data to pass in}})
            method: 'post',
            headers: {"Content-Type" : "application/json"}, //have to specify content type as json, or else server thinks its something else;
            body: JSON.stringify(questionData)
        })
        //using .text() instead of .json to avoid errors
        .then((resp) => resp.json())
        // if success and data was sent back, log the data
        .then((data) => handleSuccess(data))
        // if failure, log the error
        .catch((err) => console.log("Error", err));

        // clear chatbox
        this.setState({question: ""})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {

        return (
            <div>
                {(this.state.room != null) ?
                    <div>
                        <h3> User code is: {this.state.room.joinCode} </h3>
                    </div>
                    :
                    <h3> No room FOR TESTING ONLY </h3>

                }


                <SplitPane
                    split="vertical"
                    minSize="90%"
                    maxSize={-200}
                    defaultSize="85%"
                    className="primary"
                >
                    <SplitPane
                        split="horizontal"
                        minSize={200}
                        maxSize={-200}
                        defaultSize="40%"
                    >
                        <div>
                            <Polls isHost={false}/>
                        </div>
                        <div>
                            <Questions />
                                <form noValidate autoComplete = "off" onSubmit = {this.postQuestion} onChange = {this.handleChange}>
                                    <Grid container>
                                    <TextField id="question" fullWidth="true" label="Enter a Question" variant="outlined">Enter Question</TextField>
                                    <Button type="submit" onClick={this.postQuestion}>></Button>
                                    </Grid>
                                </form>
                        </div>
                    </SplitPane>
                    <div>

                        {(this.state.room != null) ?
                            <div>
                                <h3> User code is: {this.state.room.joinCode} </h3>
                            </div>
                            :
                            <h3> No room FOR TESTING ONLY </h3>

                        }
                        <Resources />
                    </div>
                </SplitPane>
            </div>
        )
    }
}

function handleSuccess(data){
    console.log("Success. here is the resp.() dump: ", data);
}


export default User;
