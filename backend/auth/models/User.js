const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const { hashPassword } = require("../utils/passwordUtils");

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
    date:{
        type: String,
        required: true
    }
    ,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

userSchema.plugin(uniqueValidator, { message: "L'email est déjà utilisé. Veuillez en choisir un autre." });

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password") || !this.password) {
            return next();
        }
        const hashedPassword = await hashPassword(this.password);
        this.password = hashedPassword;

        next();
    } catch (err) {
        next(err);
    }
});
const User = mongoose.model("User", userSchema);

module.exports = User;