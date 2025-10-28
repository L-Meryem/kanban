const mongoose  = require("mongoose");
const CardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:false
    }, 
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true,
    },
    status:{
        type:String,
        required:true
    },
     dateOfCreation:{
        type:Date,
        required:true
    }
});
module.exports = mongoose.model('card', CardSchema);