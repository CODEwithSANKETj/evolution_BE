const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://jaiswalsanket9404:sanket@cluster0.exmfxck.mongodb.net/Revision_Evolution?retryWrites=true&w=majority')
if(connection){
    console.log('connected to db');
}
else{
    console.log('not connected');
}
module.exports = {
    connection
}