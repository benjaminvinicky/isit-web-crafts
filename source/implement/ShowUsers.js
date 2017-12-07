import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as firebase from 'firebase';
import {connect} from 'react-redux';

const buttonStyle = {
    margin: '10px 10px 10px 0'
};

class ShowUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
        this.getUserNames = this.getUserNames.bind(this);
        this.handleShowUser = this.handleShowUser.bind(this);
        this.getUserNames();
    }

    getUserNames() {
        const that = this;
        firebase.database().ref('/users').once('value').then(function(snapshot) {
            const userNames = snapshot.val();
            var userCache = [];
            console.log(userNames);
            for (const user in userNames) {
                userCache.push(user);
            }
            that.setState({users: userCache})
        });
    }

    handleShowUser(user) {
        this.props.dispatch({type: 'SWITCH_COMPONENT', component: 'show_user', userName: user})
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>Users</h1>
                    <p>Click a button to see addititonal information on a user.</p>
                    {this.state.users.map((user) => (
                        <RaisedButton
                            key={user}
                            label={user}
                            style={buttonStyle}
                            primary={true}
                            onClick= {() => this.handleShowUser(user) }
                        />
                    ))}
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

ShowUsers = connect(mapStateToProps)(ShowUsers);

export default ShowUsers;