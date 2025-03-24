const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    },
    pseudo: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9]+$/,
        minlength: 3,
        maxlength: 10
    }
    ,
    date: {
        type: String,
        required: true
    }
    ,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isActived : {
        type : Boolean,
        default : false,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;