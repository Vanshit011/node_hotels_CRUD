const jwt = require('jsonwebtoken');

// check JWT token
const jwtAuthMiddleware = (req, res, next) => {

    // first check request headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        // Attach user information to the request object
        req.userpayload = decoded
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

 

// create JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_TOKEN, { expiresIn: 30000 });
}

module.exports = { jwtAuthMiddleware, generateToken }