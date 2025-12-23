const mongoose=require('mongoose');
// const favourite = require('./favourite');
const userSchema=mongoose.Schema({
  firstName:{type:String, required:true},
  lastName:{type:String},
  email:{type:String, required:true,unique:true},
  password:{type:String, required:[true,'Password is required']},
  userType:{type:String,enum:['guest','host'], default:'guest'},
  favourite:[{type:mongoose.Schema.Types.ObjectId, ref:'Home'}]
});
module.exports=mongoose.model('user',userSchema)