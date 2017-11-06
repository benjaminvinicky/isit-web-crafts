import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import "whatwg-fetch";

class MakeImageButtons extends React.Component {
    constructor() {
        super();

        this.state = {
            createImage: "Create Page",
            deletePage: "Delete Page",
            reports: []
        };
        this.deleteMarkdown = this.deleteMarkdown.bind(this);
        this.createMarkdown = this.createMarkdown.bind(this);
    }

    deleteMarkdown() {
        const query = "/makers/deleteMarkdown";
        const that = this;
        fetch(query)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(JSON.stringify(result, null, 4));
                that.setState({
                    reports: result
                });
            })
            .catch(function(ex) {
                console.log("parsing failed", ex);
            });
    }

    createMarkdown() {
        const query = "/makers/makeImages";
        const that = this;
        fetch(query)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(JSON.stringify(result, null, 4));
                that.setState({
                    reports: result
                });
            })
            .catch(function(ex) {
                console.log("parsing failed", ex);
            });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>Web Craft Home Page</h1>

                    <RaisedButton
                        id="makeImgPage"
                        style={buttonStyle}
                        primary={true}
                        onClick={this.createMarkdown}
                    >
                        {this.state.createImage}
                    </RaisedButton>

                    <RaisedButton
                        id="deleteImagePage"
                        style={buttonStyle}
                        primary={true}
                        onClick={this.deleteMarkdown}
                    >
                        {this.state.deletePage}
                    </RaisedButton>
                    <pre>
                        <p>Results: {JSON.stringify(this.state.reports)}</p>
                    </pre>
                </div>
            </MuiThemeProvider>
        );
    }
}

var buttonStyle = {
    margin: "15px"
};

export default MakeImageButtons;
