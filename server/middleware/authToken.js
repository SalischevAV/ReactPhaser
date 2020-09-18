const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next)=>{
    if(req.methid === 'OPTION'){
        return(next);
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401)
                    .json({message: 'Token error'});
        }
        const decoded = jwt.verify(token, config.get('secretKey'));
        req.user = decoded;
        next();

    }catch(err){
        console.log('Auth error', err)
        return res.status(401)
                    .json({message: 'Auth error'});
    }
}   