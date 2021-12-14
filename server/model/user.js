const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required: true
  },
  firstname:{
    type: String,
    required : true,
    min: 3,
    max:20,
  },
  lastname:{
    type: String,
    required : true,
    min: 3,
    max:20,
  },
email:{
  type:String,
  required:true,
  max:50,
  unique:true
},
password:{
  type:String,
  required:true,
  min:6
},
adminCode:{
  type: String,
},
isAdmin:{
  type:Boolean,
  default:false
},
},
{timestamps:true}
);

module.exports = mongoose.model('User', UserSchema);