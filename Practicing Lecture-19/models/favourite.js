const mongoose=require('mongoose')
const favouriteSchema=mongoose.Schema({
  houseId:{
    type:mongoose.Schema.Types.ObjectId,//dosre table ka dosre collection ka _id hai
    ref:'home',
    required:true,
    unique:true
  }
})
module.exports=mongoose.model('Favourite',favouriteSchema)//Favourite name ka ayk module bana de jiye or