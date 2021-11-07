const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId:{
    type:String,
    required: true
  },
  date:{
    type:Date,
    required: true
  },
  time:{
    type:String,
    required: true
  }
},
{timestamps:true}
);

module.exports = mongoose.model('Appointment', AppointmentSchema);