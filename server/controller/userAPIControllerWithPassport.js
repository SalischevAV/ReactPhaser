const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const GameUser = require('../model/GameUser')

const tokenList = {};
const router = express.Router();

module.exports.signup = async (req, res, next) => {
    res.status(200).json({ message: 'signup successfull' });
}

module.exports.login = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occured');
                return next(error);
            }
            req.login(user, {session: false}, async(err)=>{
                if(err){
                    return next(err);
                }
                const body = {
                    _id: user._id,
                    email: user.email
                };
                const token = jwt.sign({user: body}, config.get('secretKey'), {expiresIn: 300});
                console.log(token)
                const refreshToken = jwt.sign({user: body}, config.get('refreshKey'), {expiresIn: 86400});

                res.cookie('jwt', token);
                res.cookie('refreshJwt', refreshToken);

                tokenList[refreshToken]={
                    token,
                    refreshToken,
                    email: user.email,
                    _id: user._id
                }

                return res.status(200).json({ token, refreshToken, user });
            })
        } catch (err) {
            return next(err);
        }
    })(req, res, next)
}

module.exports.token = async (req, res)=>{
    const {email, refreshToken} = req.body;

    if((refreshToken in tokenList)&&(tokenList[refreshToken].email===email)){
        const body = {email, _id:tokenList[refreshToken]._id};
        const token = jwt.sign({user: body}, config.get('secretKey'), {expiresIn: 300});
        const decoded = jwt.verify(refreshToken, config.get('refreshKey'));
        const user = await GameUser.findById(decoded.user._id);

        res.cookie('token', token);
        tokenList[refreshToken].token = token;

        res.status(200).json({token, user});
    } else{
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.logout = (req,res)=>{
    if(req.cookies){
        const refreshToken = req.cookies['refreshJwt'];
        if(refreshToken in tokenList) delete tokenList[refreshToken];
        res.clearCookie('refreshJwt');
        res.clearCookie('jwt');
    }
    res.status(200).json({ message: 'logged out' });
}