$(document).ready(function() {
    'use strict';

    const route1 = document.getElementById("route01Button");
    const route2 = document.getElementById("route02Button");
    const route3 = document.getElementById("route03Button");

    route1.addEventListener("click", function () {callRoute(0)},false);
    route2.addEventListener("click", function () {callRoute(1)},false);
    route3.addEventListener("click", function () {callRoute(2)},false);

    const output = document.getElementById('output');

    function callRoute(route) {
        var path = '/';
        if (route === 0) {
            path = '/route01';
        }
        else if (route === 1) {
            path = '/route02';
        }
        else if (route === 2) {
            path = '/route03';
        }

        fetch(path)
            .then(function (response) {
                return response.json();
            })
            .then(function (myresponse) {
                console.log(
                    "parsed json",
                    JSON.stringify(myresponse, null, 4)
                );
                output.innerHTML = (JSON.stringify(myresponse, null, 0));
            })
    }
});
