import React from "react";
import {Provider} from 'react-redux';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {createStore} from 'redux';
import ReactDOM from "react-dom";
import fireReducer from './fire-reducer';
import HomeButton from "./HomeButton";

const store = createStore(fireReducer);
/*function reactMakeHtml(event, customMessage) {
    ReactDOM.render(<MakeHtml />, homeDiv);
}

function reactMakeImage(event, customMessage) {
    ReactDOM.render(<MakeImage />, homeDiv);
}*/
/*
function reactHome() {
    //$('#pageLoad').empty();
    document.getElementById("pageLoad").innerHTML = "";
    home();
}

function home() {
    ReactDOM.render(<ReactHome />, homeDiv);
}*/

window.onload = function() {
    try {
        const root = document.getElementById('home');
        ReactDOM.render(
            <Provider store={store}>
                <MuiThemeProvider>
                    <div>
                        <HomeButton/>
                    </div>
                </MuiThemeProvider>
            </Provider>, root);
    } catch (e) {
        console.error(e);
        document.getElementsById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
/*
    homeDiv = document.getElementById("home");
    $.subscribe("reactMakeHtml", reactMakeHtml);
    $.subscribe("reactMakeImage", reactMakeImage);
    $.subscribe("home", reactHome);

    reactHome();*/
};
