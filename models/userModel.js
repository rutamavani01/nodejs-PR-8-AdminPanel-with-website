const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const userModel = mongoose.model('userModel',UserSchema);

module.exports = userModel;