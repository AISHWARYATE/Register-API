const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://aiswaryate704:aiswaryate704@cluster0.higp5vj.mongodb.net/registerapi_db?retryWrites=true&w=majority')
const Schema = mongoose.Schema

const registerSchema = new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    address:{type:String,required:true},
    phoneno:{type:String,required:true},
    email:{type:String,required:true},
}) 

const registerModel=mongoose.model('register_tb',registerSchema)
module.exports=registerModel