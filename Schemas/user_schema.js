const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    email:{type:String , required:true},
    pass:{type:String , required:true}
})

const appointments_schema = new mongoose.Schema(
    {
        name:{type:String , required:true},
        image:{type:String , required:true},
        specialization:{type:String , required:true},
        experience:{type:Number , required:true},
        location:{type:String , required:true},
        date:{type:String , required:true},
        slots :{type:Number , required:true},
        fee: {type:Number , required:true}
      },
)
const appoitment_model = mongoose.model('Appointment',appointments_schema)
const user_model = mongoose.model('User',user_schema)



module.exports = {
    user_model,
    appoitment_model
}