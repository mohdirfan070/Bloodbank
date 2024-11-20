const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminMiddleware = async (req, res, next) => {
    try{
        const cookie = req.cookies.token;
        // console.log(cookie)  
        const token  = cookie.split(";")[0].split(' ')[1];
        // console.log(token)
        const isAuth = jwt.verify(token , process.env.JWT_SECRET);
        // console.log(isAuth)

        await Admin.findOne({email:isAuth.email},{id:isAuth.id}).then((result)=>{
            if(!result) throw result;
            req.dataFromAuth = { userData : isAuth };
          })
          if(!isAuth.isAdmin) throw new Error("Authentication Failed");
           next();
        } catch (result) {
    // console.error(result);
    res.status(500).send('Server Error');
  }
};

module.exports = adminMiddleware;
