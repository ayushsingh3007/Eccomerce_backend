///in this file hum jwt ko verify karenge
const User=require('../model/userModel.js')
const jwt =require("jsonwebtoken")
const asyncHandler=require('express-async-handler')
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded?.id);
          req.user = user;
          next();
        }
      } catch (err) {
        console.log('Authorization has failed. Please log in again.');
      }
    } else {
      console.log('There is no token.');
    }
  });
  
///second middleware 
const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
  
    if (adminUser.role !== 'admin') {
      throw new Error('You are not an admin.');
    } else {
      next();
    }
  });
  
  module.exports = { authMiddleware, isAdmin };
  

module.exports={authMiddleware,isAdmin};