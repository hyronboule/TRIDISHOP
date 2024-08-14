const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

const login =  ((req,res)=>{
    return res.json({message: "Connexion réussie"})
})

const register =  ((req,res)=>{
   return res.json({message: "Incrisption réussie"})
})

module.exports = {login,register}