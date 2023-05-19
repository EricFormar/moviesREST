const db = require('../database/models');

module.exports = {
    register : (req,res) =>{
        return res.render('usersRegister')
    },
    processRegister : (req,res) =>{
        
    },
    login : (req,res) =>{
        return res.render('usersLogin')
    },
    processLogin : (req,res) => {

    },
    logout : (req,res) => {

    },
    profile : (req,res) => {

    },
    update : (req,res) => {

    },
    destroy : (req,res) => {

    },
   
}