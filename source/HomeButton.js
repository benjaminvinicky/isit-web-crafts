import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import App from './App';
import ShowUsers from './ShowUsers';
import ShowUser from './ShowUser';
import {connect} from 'react-redux';
import MakeImage from './MakeImage';
import MakeHtml from './MakeHtml';

const paperStyle = {
    height:'85%',
    width: '85%',
    margin: '7%',
    textAlign: 'center',
    display: 'inline-block',
};

var buttonStyle = {
    margin: "15px"
};

class HomeButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            makeHtml: "make html",
            makeImage: "make image"
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleShowLogin = this.handleShowLogin.bind(this);
        this.handleShowUsers = this.handleShowUsers.bind(this);
        this.handleMakeHtml = this.handleMakeHtml.bind(this);
        this.handleMakeImg = this.handleMakeImg.bind(this);

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

    handleToggle() {
        this.setState({open: !this.state.open})
    };

    handleShowLogin() {
        this.setState({open: false});
        this.props.dispatch({type: 'SWITCH_COMPONENT', component: 'app'})
    };

    handleShowUsers() {
        this.setState({open: false});
        this.props.dispatch({type: 'SWITCH_COMPONENT', component: 'show_users'})
    };

    handleMakeHtml() {
        this.setState({open: false});
        this.props.dispatch({type: 'SWITCH_COMPONENT', component: 'make_html'})
    };

    handleMakeImg() {
        this.setState({open: false});
        this.props.dispatch({type: 'SWITCH_COMPONENT', component: 'make_img'})
    };

    render() {
        let content = null;
        switch (this.props.component) {
            case 'app':
                content = <App/>;
                break;

            case 'show_users':
                content = <ShowUsers/>;
                break;

            case 'show_user':
                content = <ShowUser/>;
                break;

            case 'make_html':
                content = <MakeHtml />;
                break;

            case 'make_img':
                content = <MakeImage/>;
                break;
            default:
                content = <App/>

        }

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        title="AppBar"
                        onLeftIconButtonTouchTap={this.handleToggle}
                    />
                    <Paper style={paperStyle} zDepth={5}>
                        <Toolbar style={{"justifyContent": "center"}}>
                            <ToolbarTitle text="Material UI"/>
                        </Toolbar>
                        <h1>Web Craft Home Page</h1>
                        {content}
                    </Paper>
                    < Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                        <AppBar
                            title="AppBar"
                            onLeftIconButtonTouchTap={this.handleToggle}
                        />
                        <MenuItem onClick={this.handleShowLogin}>Show Login</MenuItem>
                        <MenuItem onClick={this.handleShowUsers}>Show Users</MenuItem>
                        <MenuItem onClick={this.handleMakeHtml}>Make HTML</MenuItem>
                        <MenuItem onClick={this.handleMakeImg}>Make Image</MenuItem>

                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        component: state.component,
        userName: state.userName,
        loggedIn: state.loggedIn,
        signInLabel: state.signInLabel
    }
};

HomeButton = connect(mapStateToProps)(HomeButton);

export default HomeButton;

