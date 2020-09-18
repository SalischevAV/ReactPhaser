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
                    .json({message: 'Auth error'});
        }
        const decoded = jwt.verify(token, config.get('secureKey'));
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401)
                    .json({message: 'Auth error'});
    }
}   