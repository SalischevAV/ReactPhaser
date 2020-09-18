const GameUser = require('../model/GameUser');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.submitScore = async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
        if(!user){
            return res.status(401).json({message:'Unauthorized access'});
        }
        const { score } = req.body;
        await GameUser.updateOne({ _id: user.id }, { highScore: score });
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        console.log('Update score error', err);
        res.status(500).json({ message: 'Update score error' })
    }
}

module.exports.scores = async (req, res) =>{
    try{
        const user = req.user;
        if(!user){
            return res.status(401).json({message:'Unauthorized access'});
        }
        const users = await GameUser.find({}).sort({highScore: -1}).limit(10);
        res.status(200).json(users);

    }catch(err){
        console.log('Score error', err);
        res.status(500).json({ message: 'Score error' })
    }
}