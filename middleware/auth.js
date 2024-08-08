const jwt=require('jsonwebtoken');

const crypto = require('crypto');

const seceret_key="princeSinha"
function generateHash256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

function generateToken(user){
    const payload={
        email:user.email,
        name:user.name,
        role:user.role,
        image:user.profileImageURL,
        _id:user._id
    }
    token=jwt.sign(payload,seceret_key);
    return token;
}

function getData(token){
    const userData = jwt.decode(token,seceret_key);
    return userData;
}

function authenticationCookie(cookieName) {
    return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
        return next();
    }

    try {
        const userPayload = getData(token);
        req.user = userPayload;
    } catch (error) {}

    return next();
    };
}

module.exports={
    generateHash256,
    generateToken,
    authenticationCookie
}