const router  = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const secret = process.env.SECRET
const adminCode = process.env.ADMINCODE 
//REGISTER
router.post("/register",async (req,res) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds);
  // encrypt the password
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
 const newUser = new User({
   username: req.body.username,
   firstname: req.body.firstname,
   lastname: req.body.lastname,
   email: req.body.email,
   password: hashedPassword,
 })
 if(req.body.adminCode === adminCode){
   newUser.isAdmin = true;
 }
 try{
   //save new user
    const user =  await newUser.save();
    const token = jwt.sign({username:newUser.username, id: newUser._id},secret, {expiresIn: '30s'})
      res.status(200).json({"result":user, token})
 }catch(err){
   console.log(err)
 }
});


//LOGIN

router.post('/login', async(req,res)=> {
  try {
    const user = await User.findOne({email:req.body.email})
    !user && res.status(400).json({message:"user not found"})
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json({message:"Wrong password"})
    const token = jwt.sign({username:user.username, id: user._id},secret, {expiresIn: '30s'})
    res.status(200).json({result:user,token})
  } catch (err) {
    console.log(err)
  }
})


module.exports = router;