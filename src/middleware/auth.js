const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.verifyToken = async (request, response, next) => {
    const token = request.headers.authorization
    try {
        jwt.verify(token, process.env.JWT_KEY)
        next()
    } catch (error) {
        response.status(503).json({message : "TOKEN INVALID"})
    }
}