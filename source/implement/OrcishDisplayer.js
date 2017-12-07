import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import App from './App';
import ShowUsers from './ShowUsers';
import ShowUser from './ShowUser';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {connect} from 'react-redux';



const paperStyle = {
    height:'85%',
    width: '85%',
    margin: '7%',
    textAlign: 'center',
    display: 'inline-block',
};

class OrcishDisplayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleShowLogin = this.handleShowLogin.bind(this);
        this.handleShowUsers = this.handleShowUsers.bind(this);
    }

    handleToggle() {
        if (this.state.open === true) {
            this.setState({open: false});
        }
        else this.setState({open: true});
    };

    handleShowLogin() {
        console.log("hello");
        this.props.dispatch({type: 'SWITCH_COMPONENT', component: 'app'})
    };

    handleShowUsers() {
        this.props.dispatch({type: 'SWITCH_COMPONENT', component: 'show_users'})
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
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        component: state.component,
        userName: state.userName
    }
};

OrcishDisplayer = connect(mapStateToProps)(OrcishDisplayer);

export default OrcishDisplayer;