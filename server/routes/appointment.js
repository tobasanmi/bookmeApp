const router = require('express').Router()
const Appointment = require('../model/appointment')


// CREATE APPOINTMENT

router.post('/', async (req,res) => {
  try{
      const newAppointment = await new Appointment(req.body).save();
      res.status(200).json(newAppointment);
  }catch(err){
    res.status(500).json(err)
  }
});


//DELETE AN APPOINTMENT
router.delete('/:id', async (req,res) => {
  try{
      const appointment = await Appointment.findById(req.params.id)
        if(!appointment){
            res.status(404).json({message:'no appointment found '})
        }else{  
          const deletedAppointment =   await Appointment.findOneAndDelete(req.params.id)
          res.status(200).json('appointment deleted successfully')
        }
  }catch(err){
      console.log(err)
  }
})


//GET All APPOINTMENT

router.get('/', async (req,res) => {
  try{
    const appointments = await Appointment.find()
    res.status(200).json(appointments);
  }
  catch(err){
    console.log(err)
  }
})

// update an appointment

router.put('/:id', async (req,res) => {
  try{
      const updateAppointment = await Appointment.findByIdAndUpdate(req.params.id, {$set: req.body})
      res.status(200).json(updateAppointment)
  }
  catch(err){
    console.log(err)
  }
})

module.exports = router;