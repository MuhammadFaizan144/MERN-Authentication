const { ObjectId } = require('mongodb')
const mongoose=require('mongoose')
const favourite=require('./favourite')
const homeSchema=mongoose.Schema({
  houseName:{type:String, required:true},
  price:{type:String, required:true},
  location:{type:String, required:true},
  rating:String,
  photoURL:String,
});
//to delete home if we delete it in host 
homeSchema.pre('findOneAndDelete', async function(next){
  console.log("Came to pre hook while deleting home")
  const homeId=this.getQuery()._id
  await favourite.deleteMany({houseId:homeId})
})
module.exports=mongoose.model('home',homeSchema)

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoURL, _id) {
//     this.houseName = houseName
//     this.price = price
//     this.location = location
//     this.rating = rating
//     this.photoURL = photoURL

//       this._id = _id
// save() 
// static fatchAll()
// static findById(homeId)
// static deleteById(homeId)

//     

 