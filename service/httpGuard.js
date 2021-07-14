// const jsonwebtoken = require('jsonwebtoken');

// const checkAuth = async (req ,res, next) => {
//     try{
//         let appToken = "YwMiRtYxQpVcMsVy1w3Z9=="
//         let token = req.headers.authorization
//         if(!token){
//             return res.status(401).send("You are not permitted to perform this action");
//         }else if(token.startsWith("Bearer ")){
//             const jwtToken = token.split(" ")[1];
//             const jwtOptions = { audience: process.env.jwt_audience, issuer: process.env.jwt_issuer, expiresIn: process.env.jwt_expiry };
//             const payload = jsonwebtoken.verify(jwtToken, process.env.jwt_secret, jwtOptions);
//             if (!payload) return res.status(401).send("You are not permitted to perform this action");
//             const user = await Auth.findOne({ phone: payload.phone });
//             if (!user) return res.status(401).send("You are not permitted to perform this action");
//             req.user = user;
//             return next();
//         } else if(token == appToken) {
//             return next()
//         } else {
//             return res.status(401).send("You are not permitted to perform this action");
//         }
//     }catch(e){
//         if (e.name && ["TokenExpiredError", "JsonWebTokenError", "NotBeforeError"].includes(e.name)) {
//             return res.status(401).send("You are not permitted to perform this action");
//         }
//         return res.status(500).send({"err": 1 , "msg" : "Internal Server Error"}); 
//     }
// }