const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');

const dashboard = (req,res) => {
    return res.render('dashboard')
}

const header = (req,res) => {
    return res.render('header')
}

const footer = (req,res) => {
    return res.render('footer')
}

const login = (req,res) => {
    return res.render('login')
}

const register = async(req,res) => {
    return res.render('register');
}

const registerRecord = async(req,res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        let registerUser = await userModel.create({
            name , email , password
        })

        if(registerUser){
            console.log("user register");
            return res.redirect('/');
        }else{
            console.log("user not registered");
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

const loginRecord = (req,res) => {
    return res.redirect('/dashboard');
}

const forgotPage = (req,res) => {
    return res.render('forgotPage');
}

const newPassword = (req,res) => {
    return res.render('newPassword');
}

const forgotmail = async(req,res) => {
    try {
        let email = req.body.email;
        let otp = Math.floor(Math.random()*10000);

        var transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : '7952rutamavani@gmail.com',
                pass : 'mpkh yjpf qjeq nuoy'
            }
        })

        var mailOptions = {
            from : '7952rutamavani@gmail.com',
            to : email,
            subject : 'Otp :- ',
            html : `<h1>otp:- ${otp}</h1>`
        }

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log(`email sent : `+info.response);
                res.cookie('otp',{
                    email , otp
                })
                return res.redirect('/otp');
            }
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const otp = (req,res) => {
    return res.render('otp');
}

const Postotp = (req,res) => {
    let userOtp = req.body.otp;
    if(userOtp == req.cookies['otp'].otp){
        return res.redirect('/newPassword')
    }else{
        console.log("Otp is incorrect");
        return res.redirect('back');
    }
}

const EditnewPassword = async(req,res) => {
    try {
        let email = req.cookies['otp'].email;
        if(req.body.password == req.body.cpassword){
            let updatePassword = await userModel.findOneAndUpdate({email:email},{
                password : req.body.password
            })
            console.log("Password Updated");    
            res.clearCookie('otp');
            return res.redirect('/');
        }else{
            console.log("password and cpassword is mismatch");
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    dashboard , header , footer , login , register , registerRecord , loginRecord  , forgotPage , otp , newPassword , forgotmail , Postotp , EditnewPassword
}