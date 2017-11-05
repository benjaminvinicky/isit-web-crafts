/**
 * Created by charlie on 6/8/2015.
 */

/* Example record:
{
    "_id": {
        "$oid": "557f238c77e80f000a9e4100"
    },
    "lastName": "bar",
    "firstName": "bar",
    "email": "bar@foo.com",
    "password": "abc",
    "username": "bar",
    "__v": 0
}
*/
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);