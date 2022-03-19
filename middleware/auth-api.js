const jwt = require('jsonwebtoken')
const tokenSecret = "safsad4d5s8a4f8sd4f8gds4g8dfs48g"

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    // if (!token) res.status(403).json({error: "please provide a token"})
    if (!token) res.status(401).send('Unauthorized');
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            // if (err) res.status(500).json({error: 'failed to authenticate token'})
            if (err){ 
              res.status(401).send('Unauthorized');
            }else{
              req.hospital = value.data
              next()
            }
        })
    }
}