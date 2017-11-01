import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from './ReactHome';
import MakeHtml from './MakeHtml';

let homeDiv = null

function reactHome() {
    ReactDOM.render(<ReactHome />, homeDiv)
}
function reactMakeHtml(event, customMessage) {
    ReactDOM.render(<MakeHtml/>, homeDiv);
}

$(document).ready(function() {
    homeDiv = document.getElementById('home');
    $.subscribe('reactMakeHtml', reactMakeHtml);
    $.subscribe('home', reactHome);
    reactHome();

});