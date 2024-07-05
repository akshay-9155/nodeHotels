const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // First check request header has authorization or not
    if (!req.headers.authorization) return res.status(401).json({ "error": "Token not found" });

    // Extract JWT token from the request header

    const bearerTtoken = req.headers.authorization;
    const token = bearerTtoken.split(' ')[1];
    if(!token) return res.status(401).json({"error": "Unauthorized"});
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Pass the payload to server
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid Token");
    }

}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 1800})
}

module.exports = {jwtAuthMiddleware, generateToken};