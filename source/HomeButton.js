import react from 'react';
import {MuiThemeProvider, RaisedButton} from 'material-ui';

class HomeButton extends React.Component {

    constructor() {
        super();

        this.state = {
            makeHtml: 'make html',
            makeImg: 'make image'
        }
    }

    makeHtml() {
        $.publish('clientMakeHtml', {
            message: "The user wants to makeHtml."
        });
    }

    makeImage() {
        $.publish('clientMakeImg', {
            message: "The user wants to makeImg."
        });
    }

    render() {
        return
        <MuiThemeProvider>
            <div>
                <h1>Home Page</h1>

                <RaisedButton
                    id="makeHtml"
                    style={buttonStyle}
                    primary={true}
                    onClick={this.makeHtml}>{this.state.makeHtml}
                </RaisedButton>

                <RaisedButton
                    id="makeImg"
                    style={buttonStyle}
                    primary={true}
                    onClick={this.makeImage}>{this.state.makeImg}
                </RaisedButton>
            </div>
        </MuiThemeProvider>;
    };
}

export default HomeButton;