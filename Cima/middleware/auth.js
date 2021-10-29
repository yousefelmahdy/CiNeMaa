const jwt = require('jsonwebtoken');
const config = require('config');

function auth (req, res, next)
{
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('acess denied,invalid token');

    try {
        const decoded = jwt.verify(token , config.get('jwtPrivateKey'));
        req.user = decoded;
        next();

    } catch (er) {
        res.status(400).send('invalid token');
        
    }

}

module.exports = auth ; 