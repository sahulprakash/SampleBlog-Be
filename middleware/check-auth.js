const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    console.log("enters ensure auth")
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "abc");
        req.userData = decoded;
        next();
        // return
    }catch(error){
        return res.status(401).json({
            message: "Auth Failed"
        });
    }
};