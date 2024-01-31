const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const userModel = require('../models/userModel');

passport.use(new passportLocal({
    usernameField : 'email'
},async(email,password,done)=>{
    try {
        const user = await userModel.findOne({email:email});
        if(!user || user.password != password){
            console.log("Email and password is not matched");
            return done(null,false);
        }
        return done(null,user);
    } catch (error) {
        console.log(error);
        return false;
    }
}))

passport.serializeUser((user,done)=>{
   return done(null,user);
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await userModel.findById(id);
        return done(null,user);
    } catch (error) {
        return done(null,user);
    }
})

passport.checkUser = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.users = req.user
    }
    return next();
}

module.exports = passport;