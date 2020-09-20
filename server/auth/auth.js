const passport = require('passport');
const localStrtegy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const GameUser = require('../model/GameUser');
const bcrypt = require('bcrypt');
const config = require('config');


passport.use('signup', new localStrtegy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const { name, password } = req.body;
        const hashPassword =await bcrypt.hash(password, 8);       
        const user = await GameUser.create({ email, password: hashPassword, name });
        return done(null, user);
    } catch (err) {
        done(err);
    }
}))

passport.use('login', new localStrtegy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await GameUser.findOne({ email:email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = bcrypt.compareSync(password, user.password);
        
        if (!validate) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user, { message: 'Login successfully' })
    } catch (err) {
        return done(err);
    }
}))

passport.use(new JWTStrategy({
    secretOrKey: config.get('secretKey'),
    jwtFromRequest: (req)=>{
        let token = null;
        if(req && req.cookies){
            token = req.cookies['jwt'];
        }
        return token;
    }
}, async (token, done)=>{
    try{
        return done(null, token.user);
    }catch(err){
        done(err);
    }
}))