const GameUser = require('../model/GameUser');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const candidate = await GameUser.findOne({ email });


        if (candidate) {
            return res.status(400)
                .json({ message: `User with email ${email} already exist` });
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new GameUser({ email, password: hashPassword, name });
        await user.save();
    } catch (err) {
        console.log('Registration error: ', err);
        res.send({ message: 'Registration error' });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await GameUser.findOne({ email });

        if (!user) {
            return res.status(404)
                .json({ message: 'User not found' });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400)
                .json({ message: 'Password incorrect' });
        }
        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })

    } catch (err) {
        console.log('Login error: ', err);
        res.send({ message: 'Login error' });
    }
}

module.exports.auth = async (req, res)=>{
    try{
        const user = await GameUser.findById(req.user.id);
        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })

    }catch(err){
        console.log('Auth error: ', err);
        res.send({message: 'Token error'});
    }
}