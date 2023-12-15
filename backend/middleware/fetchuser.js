const jwt = require('jsonwebtoken');

const fetchusers = (req, res, next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({"message":"Please Authenticate Using A Valid Token"})
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).json({"message":"Please Authenticate Using A Valid Token"})
    }
    
}

module.exports = fetchusers;