const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const { hashPassword } = require("../utils/passwordUtils");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
        match: /^[a-zA-Z0-9]{1,10}$/,
        minlength: 1,
        maxlength: 10
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

userSchema.plugin(uniqueValidator, { message: "{PATH} est déjà utilisé." });

userSchema.pre("save", async function (next) {
    try {
        // Si le mot de passe est modifié, le hacher
        if (this.isModified("password") && this.password) {
            this.password = await hashPassword(this.password);
            next();
        }
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;