import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as firebase from 'firebase';
import {connect} from 'react-redux';

class ShowUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.userName
        };
        this.getUserData = this.getUserData.bind(this);

        this.getUserData();
    }

    getUserData() {
        const that = this;
        const userString = "/users/" + this.props.userName;
        firebase.database().ref(userString).once('value').then(function(snapshot) {
        const userData = snapshot.val();
        console.log(userData);
        console.log(userString)
        that.setState({baseDir: userData['base-dir'], bootswatch: userData.bootswatch })

        })
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>User: {this.props.userName}</h1>
                    <p>baseDir: {this.state.baseDir}</p>
                    <p>bootswatch: {this.state.bootswatch}</p>
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

ShowUser = connect(mapStateToProps)(ShowUser);

export default ShowUser;