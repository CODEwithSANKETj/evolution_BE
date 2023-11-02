const express = require('express')
var cors = require('cors')
const { connection } = require('./db')
const { user_router } = require('./Routes/Register')
const { Board_router } = require('./Routes/Board')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/board',Board_router)
app.use('/user',user_router)
app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(4040,()=>{
    
       
    
    console.log('running on 4040');

})