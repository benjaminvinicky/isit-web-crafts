import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
// import {black, red} from 'material-ui/styles/colors';

class HomeButton extends React.Component {
    constructor() {
        super();

        this.state = {
            makeHtml: "make html",
            makeImage: "make image"
        };
    }

    makeHtml() {
        $.publish("clientMakeHtml", {
            message: "The user wants to makeHtml."
        });
    }

    makeImage() {
        $.publish("clientMakeImage", {
            message: "The user wants to makeImage."
        });
        console.log("Make Image called from Homebutton.js");
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>Web Craft Home Page</h1>

                    <RaisedButton
                        id="makeHtml"
                        style={buttonStyle}
                        primary={true}
                        onClick={this.makeHtml}
                    >
                        {this.state.makeHtml}
                    </RaisedButton>

                    <RaisedButton
                        id="makeImage"
                        style={buttonStyle}
                        primary={true}
                        onClick={this.makeImage}
                    >
                        {this.state.makeImage}
                    </RaisedButton>
                    <p>Select a button.</p>
                    <p>This is a react component.</p>
                </div>
            </MuiThemeProvider>
        );
    }
}

var buttonStyle = {
    margin: "15px"
};

export default HomeButton;
