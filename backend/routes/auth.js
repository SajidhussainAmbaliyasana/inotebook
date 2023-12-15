const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { query, validationResult, body } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
require("dotenv").config();


//Route2:This is a Route To CreateUser
router.post('/createuser',
[
  body("name","Enter A valid Name").isLength({min:3}),
  body("email", "Enter A valid Emial").isEmail(),
  body("password","Enter A Valid Password").isLength({min:5}),
]
,async(req,res)=>{
  // this is for the errors by the express validator
  let success = false;
  
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array(),success:success });
  }

 
  try{
    let user =  await User.findOne({"email":req.body.email});
    if(user == null){
      const salt = await bcrypt.genSalt(10);
      const secures_pwd = await bcrypt.hash(req.body.password, salt);
      const getdata={
        name:req.body.name,
        email:req.body.email,
        password:secures_pwd
      }
    
      const enter_data = new User(getdata);
      user = await enter_data.save();

      const data = {
        user:{
          id:user.id
        }
      }
      const auth_token = jwt.sign(data,process.env.JWT_SECRET_KEY);
      success = true;
      res.json({auth_token,success:success});
      success = false;

    }else{
     
      res.status(500).json({"message":"email already Present", success:success});
    }

  }catch(error){
    message="internal server error"
    res.status(500).json({"message":"Internal Server Error",success:success,message:message});
  }

});



router.post('/login',[
  body("email","Enter A Valid Email").isEmail(),
  body("password","Empty Password Would be Accepted").notEmpty(),
], async(req,res)=>{

  let success = false;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array(),success:success});
  }
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({"email":email});
    if(!user){
      return res.status(400).json({"message":"Please Try to Login With correct credientials",success:success});
    }
    const password_compare = await bcrypt.compare(password,user.password);
    if(!password_compare){
      return res.status(400).json({"message":"Please Try to Login With correct credientials",success:success});
    }

    const data = {
      user:{
        id: user.id
      }
    }

    const auth_token = jwt.sign(data,process.env.JWT_SECRET_KEY);
    success = true;
    res.json({auth_token,success:success});
    success = false;

  } catch (error) {
    res.status(500).json({"message":"Internal Server Error",success:success});
  }

})


//Route3:This route is for gettng user data
router.post('/getuser', fetchuser, async(req,res)=>{
  try {
    let success = false;
    let userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    success = true;
    res.json({user,success})
  } catch (error) {
    success = false
    res.status(500).json({"message":"Internal Server Error",success:success});
  }
})


module.exports = router;
