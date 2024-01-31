const express = require('express');

const routes =express.Router();

const userControllers = require('../controllers/userControllers');
const passport = require('passport');

routes.get('/',userControllers.login)
routes.get('/dashboard',passport.checkUser,userControllers.dashboard);
routes.get('/header',userControllers.header);
routes.get('/footer',userControllers.footer);
routes.get('/register',userControllers.register);
routes.post('/registerRecord',userControllers.registerRecord);
routes.post('/loginRecord',passport.authenticate('local',{failureRedirect:'/'}),userControllers.loginRecord);

routes.get('/forgotPage',userControllers.forgotPage);
routes.post('/forgotmail',userControllers.forgotmail);

routes.get('/otp',userControllers.otp);
routes.post('/Postotp',userControllers.Postotp);

routes.get('/newPassword',userControllers.newPassword);
routes.post('/EditnewPassword',userControllers.EditnewPassword);

module.exports = routes;      