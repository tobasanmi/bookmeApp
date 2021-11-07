const router  = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')



//GET A USER

router.get('/:id', async (req,res) => {
  const userId = req.params.id;
  try{
      const user = await User.findById(userId)
      const {password,updatedAt, ...other} =  user._doc
      !user && res.status(400).json({message : "user not found"})
      res.status(200).json(user)
  }catch(err){
    res.json(err)
  }
})

//GET ALL USERS

router.get('/', async (req,res) => {
  try{
    const result = await User.find()
    res.status(200).json(result)
  }
  catch(err){
    res.json(err)
  }
})
//DELETE A USER
router.delete('/:id', async (req,res) =>{
  try{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"account has been deleted"})
        }catch(err){
          return res.status(500).json(err)
        }
    
    }else{
      return res.status(403).json({message:"you can only delete your account"})
    }
  }catch(err){
    return res.status(500).json(err)
  }
})

module.exports = router;