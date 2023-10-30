const express = require('express')
const { connection } = require('./db')
const { user_router } = require('./Routes/Register')
const app = express()
app.use(express.json())
app.use('/user',user_router)
app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(4040,()=>{
    
       
    
    console.log('running on 4040');

})