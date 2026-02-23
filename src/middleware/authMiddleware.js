const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }
    try {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: err });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).json({ error: "Invalid Token" });
    }
}

module.exports = verifyToken;