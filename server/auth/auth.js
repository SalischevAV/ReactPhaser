const passport = require ('passport');
const localStrtegy = require ('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const GameUser = require('../model/GameUser');

