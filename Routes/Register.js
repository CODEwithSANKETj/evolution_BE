const express = require('express')
const { user_model, appoitment_model } = require('../Schemas/user_schema')
const bcrypt = require('bcrypt');
const user_router = express.Router()
const jwt = require('jsonwebtoken')
user_router.post('/signup',(req,res)=>{
    try{
        const {email,pass,retyped} = req.body
        bcrypt.hash(pass, 5, function(err, hash) {
            if(err){
                res.status(400).send({err:err})
            }
            const obj = {
                email:email,
                pass:hash
            }
            const new_user = new user_model(obj)

            new_user.save()
            res.status(201).send('user register Succesfully')

        });
       
    }
    catch(err){
        res.status(404).send({err:err})
    }
})
user_router.post('/login', async(req,res)=>{
    const {email,pass} = req.body
    try{
       
        const isuser =  await user_model.findOne({email})
        
        if(isuser){
            bcrypt.compare(pass,isuser.pass,(err,result)=>{
              
                if(err){
                   return res.status(400).send({err:err})
                }
                
                else if(result){

                    jwt.sign({user:result._id},'masai',(err,token)=>{
                        if(err){
                            res.status(400).send({err:err})
                        }
                       return  res.status(201).send({msg:'Login Successfull',token:token})
                    })

                   
                }
                else{
                   return res.status(400).send({err:"Login Failed"})
                }
            })
            
        }
        else{
          return  res.status(404).send({msg:"Please provide valid Details"})
        }
    }
    catch(err){
      return  res.status(404).send({msg:err})
    }
})

user_router.post('/appointments',(req,res)=>{
    const {name,image,specialization,experience,location,date,slots,fee} = req.body
    try{
        
        const new_appoitment = new appoitment_model({
            name,image,specialization,experience,location,date,slots,fee
        })
        new_appoitment.save()
        res.status(201).send({msg:'Appoitment Added'})
    }
    catch(err){
        return  res.status(404).send({msg:err})     
    }
})

user_router.get('/fetch', async (req, res) => {
    try {
      const filter = {};
  
      if (req.query.specialization) {
        filter.specialization = req.query.specialization;
      } else if (req.query.date) {
        const date = new Date(req.query.date);
        if (!isNaN(date.getTime())) {
          filter.date = { $gte: date };
        }
      } else if (req.query.price) {
        filter.fee = req.query.price;
      }
  
      if (Object.keys(filter).length === 0) {
        // If no filter is provided, return all data
        const allData = await appoitment_model.find();
        return res.status(200).json({ msg: allData });
      }
  
      const result = await appoitment_model.find(filter);
  
      if (result.length > 0) {
        return res.status(200).json({ msg: result });
      } else {
        return res.status(404).json({ msg: "No matching data found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  });

module
.exports={
    user_router
}